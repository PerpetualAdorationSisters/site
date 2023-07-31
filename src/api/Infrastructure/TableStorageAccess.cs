using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.PrayerRequest;
using Azure.Data.Tables;
using Microsoft.Extensions.Configuration;

namespace API.Infrastructure;

public class TableStorageAccess : IPrayerRequestWriter, IPrayerRequestReader
{
    private readonly TableClient _tableClient;

    public TableStorageAccess(IConfiguration config)
    {
        _tableClient = new TableClient(
            new Uri("https://adorationsisters.table.core.windows.net/prayerrequests"),
            "prayerrequests",
            new TableSharedKeyCredential("adorationsisters", config["StorageKey"]));
    }

    public List<PrayerRequestModel> GetPrayerRequests(int year, int month)
    {
        var queryResults = _tableClient.Query<PrayerRequestTableEntity>(e => e.PartitionKey == CreatePartitionKey(year, month), 1000);

        return queryResults.AsPages().SelectMany(e => e.Values.Select(x => MapToApiModel(x))).ToList();
    }

    public async Task SavePrayerRequest(PrayerRequestModel prayerRequest)
    {
        await _tableClient.AddEntityAsync(MapToTableEntity(prayerRequest));
    }
 
    private PrayerRequestTableEntity MapToTableEntity(PrayerRequestModel apiModel)
    {
        return new PrayerRequestTableEntity
        {
            Name = apiModel.Name,
            Email = apiModel.Email,
            Subject = apiModel.Subject,
            Request = apiModel.Request,
            RecipientName = apiModel.RecipientName,
            RecipientAddress = apiModel.RecipientAddress,

            RowKey = Guid.NewGuid().ToString(),
            PartitionKey = CreatePartitionKey(DateTime.Now.Year, DateTime.Now.Month)
        };
    }

    private PrayerRequestModel MapToApiModel(PrayerRequestTableEntity tableModel)
    {
        return new PrayerRequestModel
        {
            Name = tableModel.Name,
            Email = tableModel.Email,
            Subject = tableModel.Subject,
            Request = tableModel.Request,
            RecipientName = tableModel.RecipientName,
            RecipientAddress = tableModel.RecipientAddress,
            CreatedDate = tableModel.Timestamp?.DateTime ?? DateTime.MinValue
        };
    }

    private string CreatePartitionKey(int year, int month) => $"{year.ToString("0000")}-{month.ToString("00")}";
}