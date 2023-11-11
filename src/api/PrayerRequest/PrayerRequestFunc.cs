using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Functions.Worker;
using System.Net;
using Microsoft.Extensions.Caching.Memory;
using System.Web;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Cryptography;

namespace API.PrayerRequest;

public class PrayerRequestFunc
{
    private const int MAX_REQUESTS_PER_5_MINUTES = 5;

    private Dictionary<string, int> _recentIpRequests = new Dictionary<string, int>();

    private readonly IPrayerRequestWriter _prayerRequestWriter;
    private readonly IPrayerRequestReader _prayerRequestReader;
    private readonly IMemoryCache _memoryCache;
    private readonly IConfiguration _config;
    private readonly ILogger _logger;

    private const string PASSWORD_SALT = "575045e684bf09dc4bb63a8d6552998f5c43556bec7ed9ec0950ee0d90c2ab5e";

    public PrayerRequestFunc(
        IPrayerRequestWriter prayerRequestWriter,
        IPrayerRequestReader prayerRequestReader,
        IMemoryCache memCache,
        IConfiguration config,
        ILoggerFactory loggerFac)
    {
        _prayerRequestWriter = prayerRequestWriter;
        _prayerRequestReader = prayerRequestReader;

        _memoryCache = memCache;
        _config = config;
        _logger = loggerFac.CreateLogger<PrayerRequestFunc>();
    }

    [Function("CreatePrayerRequest")]
    public async Task<HttpResponseData> CreatePrayerRequest([HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req)
    {
        var response = req.CreateResponse(HttpStatusCode.OK);

        if (req.Method.ToLower() == "options") return response;

        try
        {
            if (req.Headers.Any(e => e.Key == "X-Forwarded-For"))
            {
                var requestIP = req.Headers.FirstOrDefault(e => e.Key == "X-Forwarded-For");
                var ipValidateSucceeded = ValidateAndCacheIPThrottling(requestIP.Value.FirstOrDefault() ?? "");

                if (!ipValidateSucceeded)
                {
                    response.StatusCode = HttpStatusCode.TooManyRequests;
                    return response;
                }
            }

            if (req.Body.Length > 100000)
            {
                response.StatusCode = HttpStatusCode.RequestEntityTooLarge;
                return response;
            }

            string requestBody = string.Empty;
            using (StreamReader streamReader = new StreamReader(req.Body))
            {
                requestBody = await streamReader.ReadToEndAsync();
            }

            if (string.IsNullOrWhiteSpace(requestBody))
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }

            PrayerRequestModel requestModel = null;
            try
            {
                requestModel = JsonSerializer.Deserialize<PrayerRequestModel>(requestBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error parsing request body to prayer request model.");
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }

            if (requestModel == null)
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                return response;
            }

            var validationContext = new ValidationContext(requestModel);
            var validationResults = new List<ValidationResult>();

            if (!Validator.TryValidateObject(requestModel, validationContext, validationResults, true))
            {
                response.StatusCode = HttpStatusCode.BadRequest;
                await response.WriteStringAsync(string.Join(", ", validationResults.Select(e => e.ErrorMessage)));
                return response;
            }

            var emailBody = _prayerRequestWriter.SavePrayerRequest(requestModel);

            await response.WriteAsJsonAsync(new
            {
                success = true
            });
            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Uncaught error processing prayer request.");
            await response.WriteStringAsync("An unknown error occurred.");
            response.StatusCode = HttpStatusCode.InternalServerError;
            return response;
        }
    }

    [Function("GetPrayerRequests")]
    public async Task<HttpResponseData> GetPrayerRequests([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req)
    {
        var response = req.CreateResponse();

        if (!await VerifyPassword(req))
        {
            response.StatusCode = HttpStatusCode.Unauthorized;
            return response;
        }

        var query = HttpUtility.ParseQueryString(req.Url.Query);
        var year = int.Parse(query["year"]);
        var month = int.Parse(query["month"]);

        var requestsForYearMonth = _prayerRequestReader.GetPrayerRequests(year, month).OrderBy(e => e.IsCompleted).ThenByDescending(e => e.CreatedDate);

        await response.WriteAsJsonAsync(requestsForYearMonth);

        return response;
    }

    [Function("CompletePrayerRequest")]
    public async Task<HttpResponseData> CompletePrayerRequest([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "prayer-request/{reqId}/complete")] HttpRequestData req, string reqId)
    {
        var response = req.CreateResponse(HttpStatusCode.OK);

        if (req.Method.ToLower() == "options") return response;

        try
        {
            if (!await VerifyPassword(req))
            {
                response.StatusCode = HttpStatusCode.Unauthorized;
                return response;
            }

            await _prayerRequestWriter.CompletePrayerRequest(reqId);

            await response.WriteAsJsonAsync(new
            {
                success = true
            });
            return response;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Uncaught error processing prayer request complete.");
            await response.WriteStringAsync("An unknown error occurred.");
            response.StatusCode = HttpStatusCode.InternalServerError;
            return response;
        }
    }


    [Function("CheckAuth")]
    public async Task<HttpResponseData> CheckAuth([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req)
    {
        var response = req.CreateResponse();

        if (!await VerifyPassword(req))
        {
            response.StatusCode = HttpStatusCode.Unauthorized;
        }

        return response;
    }

    private async Task<bool> VerifyPassword(HttpRequestData req)
    {
        const string PASSWORD_HEADER_NAME = "PASSWORD";
        if (!req.Headers.Any(e => e.Key.Equals(PASSWORD_HEADER_NAME, StringComparison.InvariantCultureIgnoreCase)))
        {
            await Task.Delay(2000);
            return false;
        }

        var providedPassword = req.Headers.FirstOrDefault(
            e => e.Key.Equals(PASSWORD_HEADER_NAME, StringComparison.InvariantCultureIgnoreCase)).Value.FirstOrDefault();
        var passwordHash = ComputePasswordHash(providedPassword);
        if (passwordHash != _config["PasswordHash"])
        {
            await Task.Delay(2000);
            return false;
        }

        return true;
    }

    // Validate that they are not spamming us with requests. Default limit is 5 requests per 5 minutes
    private bool ValidateAndCacheIPThrottling(string reqIP)
    {
        if (_memoryCache.Get(reqIP) == null)
        {
            var memCacheEntryOptions = new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(5));
            _memoryCache.Set(reqIP, reqIP, memCacheEntryOptions);
            _recentIpRequests[reqIP] = 1;
            return true;
        }

        if (!_recentIpRequests.ContainsKey(reqIP))
        {
            _recentIpRequests[reqIP] = 1;
        }
        _recentIpRequests[reqIP] += 1;

        if (_recentIpRequests[reqIP] <= MAX_REQUESTS_PER_5_MINUTES)
        {
            return true;
        }
        return false;
    }

    private string ComputePasswordHash(string password)
    {
        var inputBytes = Encoding.UTF8.GetBytes(password + PASSWORD_SALT);
        var inputHash = SHA256.HashData(inputBytes);

        return Convert.ToHexString(inputHash);
    }
}
