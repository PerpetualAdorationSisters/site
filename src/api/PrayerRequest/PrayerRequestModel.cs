
using System;
using System.ComponentModel.DataAnnotations;
using Azure;
using Azure.Data.Tables;

namespace API.PrayerRequest;

public class PrayerRequestModel
{
    [Required]
    [StringLength(256, MinimumLength = 1)]
    public string Name { get; set; }
    [Required]
    [StringLength(256, MinimumLength = 1)]
    public string Email { get; set; }
    [StringLength(256)]
    public string Subject { get; set; }
    [Required]
    [StringLength(4096, MinimumLength = 1)]
    public string Request { get; set; }
    [StringLength(256)]
    public string RecipientName { get; set; }
    [StringLength(512)]
    public string RecipientAddress { get; set; }
}