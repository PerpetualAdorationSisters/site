using System;
using System.Net;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace EmailApi
{
    public class Emailer
    {
        private SendGridClient _emailClient;

        public Emailer()
        {
            var apiKey = Environment.GetEnvironmentVariable("SendGridKey");
            _emailClient = new SendGridClient(apiKey);
        }

        public async Task SendEmail(string emailTo, string emailFrom, string subject, string body)
        {
            var emailAddrFrom = new EmailAddress(emailFrom);
            var emailAddrTo = new EmailAddress(emailTo);

            var msg = MailHelper.CreateSingleEmail(emailAddrFrom, emailAddrTo, subject, "", body);

            var response = await _emailClient.SendEmailAsync(msg);

            if(response.StatusCode != HttpStatusCode.Accepted)
            {
                var responseBody = await response.Body.ReadAsStringAsync();
                throw new Exception($"Error sending email. Status Code: {response.StatusCode}");
            }
        }
    }
}