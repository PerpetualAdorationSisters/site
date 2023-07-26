using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.PrayerRequest;

public interface IPrayerRequestReader
{
    List<PrayerRequestModel> GetPrayerRequests(int year, int month);
}