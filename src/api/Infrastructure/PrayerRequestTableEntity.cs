using System;
using Azure;
using Azure.Data.Tables;

namespace API.Infrastructure;

public class PrayerRequestTableEntity : ITableEntity
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Subject { get; set; }
    public string Request { get; set; }
    public string RecipientName { get; set; }
    public string RecipientAddress { get; set; }
    public bool IsCompleted { get; set; }

    public string PartitionKey { get; set; }
    public string RowKey { get; set; }
    public DateTimeOffset? Timestamp { get; set; }
    public ETag ETag { get; set; }
}