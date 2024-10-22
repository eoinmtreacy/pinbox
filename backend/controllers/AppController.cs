using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<AppController> _logger;

        public AppController(ApplicationDbContext context, ILogger<AppController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // Test endpoint to return a default place if the database is empty
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (!_context.Places.Any())
            {
                _context.Places.Add(new Place
                {
                    Google_Id = "default_google_id",
                    Name = "Test Location",
                    Lat = 0.0M, // The 'M' suffix specifies decimal literal 
                    Lon = 0.0M,
                    Type = "default_type"
                });
                await _context.SaveChangesAsync();
            }

            var place = await _context.Places
                .OrderBy(p => p.Id) // Ensure deterministic results by ordering by a column
                .FirstOrDefaultAsync();

            if (place == null)
            {
                return NotFound();
            }

            return Ok(place);
        }

        // Endpoint to get all places
        [HttpGet("get-places")]
        public IActionResult GetAllPlaces()
        {
            try
            {
                var places = _context.Places.ToList();
                return Ok(places);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }

        // Endpoint to get predictions grouped by location

        [HttpGet("get-predictions/{day}")]
        public IActionResult GetPredictions(string day)
        {
            try
            {
                var now = DateTime.Now.AddHours(int.Parse(day) * 24);
                var tomorrow = now.AddHours(24);
                var hourlyPredictions = new Dictionary<int, List<object>>();

                for (int i = 0; i < 24; i++)
                {
                    hourlyPredictions[i] = new List<object>();
                }

                var predictions = _context.Predictions
                    .Where(p => p.datetime >= now && p.datetime <= tomorrow)
                    .ToList();

                foreach (var prediction in predictions)
                {
                    var hourDifference = (int)(prediction.datetime - now).TotalHours;
                    if (hourDifference >= 0 && hourDifference < 24)
                    {
                        var groupedPrediction = new { Location = prediction.location, Prediction = prediction };
                        hourlyPredictions[hourDifference].Add(groupedPrediction);
                    }
                }

                var predictionsForNext24Hours = hourlyPredictions.Select(kvp => new { Hour = now.AddHours(kvp.Key), PredictionsByLocation = kvp.Value }).ToList();

                return Ok(predictionsForNext24Hours);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }


        // Feed for users who are not logged in (ghost mode): Returns all places
        [HttpGet("feed/ghost")]
        public async Task<ActionResult<IEnumerable<Place>>> GetAllPlacesForGhostMode()
        {
            var allPlaces = await _context.Places.ToListAsync();
            return Ok(allPlaces);
        }

        // Feed for users who are logged in: Returns places not in their UserLikes (places they haven't seen)
        [HttpGet("feed/{userId}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlacesNotSeenByUser(string userId)
        {
            var userLikes = await _context.UserLikes
                .Where(ul => ul.UserId == userId)
                .Select(ul => ul.PlaceId)
                .ToListAsync();

            var placesNotSeen = await _context.Places
                .Where(p => !userLikes.Contains(p.Id))
                .ToListAsync();

            return Ok(placesNotSeen);
        }

        // Endpoint to get places seen by the user (UserLikes)
        [HttpGet("seen-places/{userId}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetUserSeenPlaces(string userId)
        {
            var userLikes = await _context.UserLikes
                .Where(ul => ul.UserId == userId)
                .Include(ul => ul.Place)
                .ToListAsync();

            var seenPlaces = userLikes.Select(ul => ul.Place).ToList();

            if (!seenPlaces.Any())
            {
                return NotFound(new { Message = "No places found for the given user." });
            }

            return Ok(seenPlaces);
        }

        [HttpGet("feed-and-pins/{userId}/{collection?}")]
        public async Task<IActionResult> GetFeedAndPins(string userId, string collection)
        {

            try
            {
                userId ??= "";

                var places = await _context.Places.ToListAsync();

                var userLikes = await _context.UserLikes
                    .Where(ul => ul.UserId == userId )
                    .ToListAsync();

                var pins = places
                    .Where(place => userLikes.Any(like => like.PlaceId == place.Id && (collection == "undefined" || like.Collection == collection)))
                    .Select(place => new
                    {
                        Place = place,
                        attitude = userLikes.FirstOrDefault(like => like.PlaceId == place.Id)?.CategorySwipe
                    })
                    .ToList();

                var feed = places
                    .Where(place => !userLikes.Any(like => like.PlaceId == place.Id))
                    .ToList();

                return Ok(new { Pins = pins, Feed = feed });
            }

            catch
            {
                return StatusCode(500, new { Message = "Failed to retrieve data from the database." });
            }

        }

        [HttpGet("get-collections/{userId}")]
        public async Task<IActionResult> GetCollections(string userId)
        {
            try
            {
                var collections = await _context.UserLikes
                    .Where(ul => ul.UserId == userId)
                    .Select(ul => new { ul.Collection, ul.NormalizedCollection })
                    .Distinct()
                    .ToListAsync();

                return Ok(collections);
            }
            catch
            {
                return StatusCode(500, new { Message = "Failed to retrieve data from the database." });
            }
        }
        // get all users from the database and return their pinbox ids
        [HttpGet("get-users")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _context.Users.ToList();
                var userPinboxIds = users.Select(u => u.PinboxId).ToList();
                return Ok(userPinboxIds);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }

    }
}
