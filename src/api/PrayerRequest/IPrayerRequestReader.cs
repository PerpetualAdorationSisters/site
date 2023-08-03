using System.Collections.Generic;

namespace API.PrayerRequest;

public interface IPrayerRequestReader
{
    List<PrayerRequestModel> GetPrayerRequests(int year, int month);
}