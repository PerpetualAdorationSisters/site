using System;
using System.Text;
using EmailApi.ApiModels;

namespace EmailApi
{
    public class EmailBuilder
    {
        public static string BuildPrayerRequestEmailBody(PrayerRequestModel prayerRequest)
        {
            var builder = new StringBuilder();

            builder.Append("<body style=\"padding: 20px;\"><h1>New Prayer Request</h1><p>");
            builder.Append($"<strong>Name</strong>: {prayerRequest.Name}<br/><br/>");
            builder.Append($"<strong>Email</strong>: {prayerRequest.Email}<br/><br/>");
            builder.Append($"<strong>Subject</strong>: {prayerRequest.Subject}<br/><br/>");
            builder.Append($"<strong>Prayer Request</strong>: {prayerRequest.Request}<br/><br/>");

            if (!string.IsNullOrWhiteSpace(prayerRequest.RecipientName))
            {
                builder.Append($"<strong>Recipient Name</strong>: {prayerRequest.RecipientName}<br/><br/>");
            }
            if (!string.IsNullOrWhiteSpace(prayerRequest.RecipientAddress))
            {
                builder.Append($"<strong>Recipient Address</strong>: {prayerRequest.RecipientAddress}<br/><br/>");
            }

            builder.Append($"<strong>Submitted Date</strong>: {DateTime.Now.ToShortDateString()}<br/><br/>");

            builder.Append("</p></body>");

            return builder.ToString();
        }
    }
}