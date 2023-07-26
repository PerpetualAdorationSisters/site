using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Azure.Functions.Worker.Configuration;
using Microsoft.Extensions.DependencyInjection;
using API.PrayerRequest;
using API.Infrastructure;

namespace API
{
    public class Program
    {
        public static void Main()
        {
            var host = new HostBuilder()
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureServices(services => {
                    services.AddScoped<IPrayerRequestWriter, TableStorageAccess>();
                    services.AddScoped<IPrayerRequestReader, TableStorageAccess>();
                    
                    services.AddMemoryCache();
                })
                .Build();

            host.Run();
        }
    }
}