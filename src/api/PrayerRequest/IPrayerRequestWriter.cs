using System.Threading.Tasks;

namespace API.PrayerRequest;

public interface IPrayerRequestWriter
{
    Task SavePrayerRequest(PrayerRequestModel prayerRequest);
}