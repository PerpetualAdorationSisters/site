using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;
using System;
using EmailApi.ApiModels;
using System.Text.Json;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace EmailApi
{
    public class PrayerRequest
    {
        private const int MAX_REQUESTS_PER_5_MINUTES = 5;

        private Dictionary<string, int> _recentIpRequests = new Dictionary<string, int>();
        private readonly IMemoryCache _memoryCache = new MemoryCache(new MemoryCacheOptions());

        private readonly Emailer _emailer = new Emailer();

        [FunctionName("PrayerRequest")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "post", "options")] HttpRequest req, ILogger log)
        {
            if (req.Method.ToLower() == "options") return new OkResult();

            try
            {
                var ipValidateSucceeded = ValidateAndCacheIPThrottling(
                                req.HttpContext.Connection.RemoteIpAddress.ToString());

                if (!ipValidateSucceeded)
                {
                    return new BadRequestObjectResult("Too many requests in the past minute. Please wait and try again shortly.");
                }

                if (req.Body.Length > 100000)
                {
                    return new BadRequestObjectResult("Unable to parse request body.");
                }

                string requestBody = string.Empty;
                using (StreamReader streamReader = new StreamReader(req.Body))
                {
                    requestBody = await streamReader.ReadToEndAsync();
                }

                if (string.IsNullOrWhiteSpace(requestBody))
                {
                    return new BadRequestObjectResult("Unable to parse request body.");
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
                    log.LogError(ex, "Error parsing request body to prayer request model.");
                    return new BadRequestObjectResult("Unable to parse request body.");
                }

                if (requestModel == null)
                {
                    return new BadRequestObjectResult("Unable to parse request body.");
                }

                var validationContext = new ValidationContext(requestModel);
                var validationResults = new List<ValidationResult>();

                if (!Validator.TryValidateObject(requestModel, validationContext, validationResults, true))
                {
                    return new BadRequestObjectResult(string.Join(", ", validationResults.Select(e => e.ErrorMessage)));
                }

                var emailBody = EmailBuilder.BuildPrayerRequestEmailBody(requestModel);

                await _emailer.SendEmail(
                    Environment.GetEnvironmentVariable("PrayerRequests:EmailTo"),
                    Environment.GetEnvironmentVariable("PrayerRequests:EmailTo"),
                    $"New Prayer Request Received From {requestModel.Name}",
                    emailBody);

                return new OkObjectResult(new
                {
                    success = true
                });
            }
            catch (Exception ex)
            {
                log.LogError(ex, "Uncaught error processing prayer request.");
                return new ObjectResult("An unknown error occurred.") { StatusCode = 500 };
            }
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
}
