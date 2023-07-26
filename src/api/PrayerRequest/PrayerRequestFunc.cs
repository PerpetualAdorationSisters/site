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

namespace API.PrayerRequest;

public class PrayerRequestFunc
{
    private const int MAX_REQUESTS_PER_5_MINUTES = 5;

    private Dictionary<string, int> _recentIpRequests = new Dictionary<string, int>();

    private readonly IPrayerRequestWriter _prayerRequestWriter;
    private readonly IPrayerRequestReader _prayerRequestReader;
    private readonly IMemoryCache _memoryCache;
    private readonly ILogger _logger;

    public PrayerRequestFunc(
        IPrayerRequestWriter prayerRequestWriter,
        IPrayerRequestReader prayerRequestReader,
        IMemoryCache memCache, 
        ILoggerFactory loggerFac)
    {
        _prayerRequestWriter = prayerRequestWriter;
        _prayerRequestReader = prayerRequestReader;

        _memoryCache = memCache;
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

            await response.WriteAsJsonAsync(new {
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

    [Function("GetCurrentPrayerRequests")]
    public async Task<HttpResponseData> GetCurrentPrayerRequests([HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req)
    {
        return null;
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
}
