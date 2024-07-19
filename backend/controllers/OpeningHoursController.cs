using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

[ApiController]
[Route("api/[controller]")]
public class OpeningHoursController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OpeningHoursController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Get Opening Hours by PlaceId
    [HttpGet("{placeId}")]
    public async Task<ActionResult<IEnumerable<OpeningHour>>> GetOpeningHours(long placeId)
    {
        var place = await _context.Places
            .Where(p => p.Id == placeId)
            .FirstOrDefaultAsync();

        if (place == null || string.IsNullOrEmpty(place.Opening_Hours))
        {
            return NotFound();
        }

        var openingHours = ParseOpeningHours(place.Opening_Hours, placeId);
        SetOpeningStatus(openingHours);
        return Ok(openingHours);
    }

    private List<OpeningHour> ParseOpeningHours(string openingHours, long placeId)
    {
        var result = new List<OpeningHour>();
        var segments = openingHours.Split(';');

        foreach (var segment in segments)
        {
            var parts = segment.Trim().Split(' ');
            var daysPart = parts[0];
            var timePart = parts[1];

            var days = ParseDays(daysPart);
            var times = timePart.Split('-');

            var openTime = TimeSpan.ParseExact(times[0], "hh\\:mm", CultureInfo.InvariantCulture);
            var closeTime = TimeSpan.ParseExact(times[1], "hh\\:mm", CultureInfo.InvariantCulture);

            foreach (var day in days)
            {
                result.Add(new OpeningHour
                {
                    PlaceId = placeId,
                    Day = day,
                    OpenTime = openTime,
                    CloseTime = closeTime,
                    Status = "Closed" // default status
                });
            }
        }

        return result;
    }

    private List<string> ParseDays(string daysPart)
    {
        var days = new List<string>();

        if (daysPart.Contains("-"))
        {
            var range = daysPart.Split('-');
            var startDay = ConvertDay(range[0]);
            var endDay = ConvertDay(range[1]);
            var dayIndex = Array.IndexOf(DayOfWeekValues, startDay);

            while (true)
            {
                days.Add(DayOfWeekValues[dayIndex]);
                if (DayOfWeekValues[dayIndex] == endDay)
                {
                    break;
                }
                dayIndex = (dayIndex + 1) % 7;
            }
        }
        else
        {
            days.Add(ConvertDay(daysPart));
        }

        return days;
    }

    private string ConvertDay(string day)
    {
        return day switch
        {
            "Mo" => "Monday",
            "Tu" => "Tuesday",
            "We" => "Wednesday",
            "Th" => "Thursday",
            "Fr" => "Friday",
            "Sa" => "Saturday",
            "Su" => "Sunday",
            _ => throw new ArgumentException("Invalid day abbreviation")
        };
    }

    private static readonly string[] DayOfWeekValues = { "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" };

    private void SetOpeningStatus(List<OpeningHour> openingHours)
    {
        var now = DateTime.UtcNow;
        var currentDay = now.DayOfWeek.ToString();
        var currentTime = now.TimeOfDay;

        foreach (var openingHour in openingHours)
        {
            if (openingHour.Day == currentDay)
            {
                if (openingHour.OpenTime <= currentTime && currentTime <= openingHour.CloseTime)
                {
                    openingHour.Status = "Open";
                }
                else
                {
                    openingHour.Status = "Closed";
                }
            }
        }
    }

    // Check if a place is open
    [HttpGet("{placeId}/isopen")]
    public async Task<ActionResult<string>> IsOpen(long placeId)
    {
        var place = await _context.Places
            .Where(p => p.Id == placeId)
            .FirstOrDefaultAsync();

        if (place == null || string.IsNullOrEmpty(place.Opening_Hours))
        {
            return NotFound();
        }

        var now = DateTime.UtcNow;
        var currentDay = now.DayOfWeek.ToString();
        var currentTime = now.TimeOfDay;

        var openingHours = ParseOpeningHours(place.Opening_Hours, placeId);

        var openingHour = openingHours
            .Where(o => o.Day == currentDay)
            .FirstOrDefault();

        if (openingHour != null)
        {
            string status = openingHour.OpenTime <= currentTime && currentTime <= openingHour.CloseTime ? "Open" : "Closed";
            return Ok(status);
        }

        return Ok("Closed");
    }
}