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

        public AppController(ApplicationDbContext context)
        {
            _context = context;
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
<<<<<<< HEAD

        // Feed for users who are not logged in (ghost mode): Returns all places
        [HttpGet("feed/ghost")]
        public async Task<ActionResult<IEnumerable<Place>>> GetAllPlacesForGhostMode()
        {
            var allPlaces = await _context.Places.ToListAsync();
            return Ok(allPlaces);
        }

        // Feed for users who are logged in: Returns places not in their UserLikes (places they haven't seen)
        [HttpGet("feed/{userId}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlacesNotSeenByUser(long userId)
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
        public async Task<ActionResult<IEnumerable<Place>>> GetUserSeenPlaces(long userId)
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
=======
        
        [HttpGet("get-predictions")]
        public IActionResult GetPredictions()
        {
            try
            {
                // Get the current time
                var now = DateTime.Now;

                // Retrieve all predictions and group them by location
                var groupedPredictions = _context.Predictions
                    .AsEnumerable() // Switch to client-side processing for the next operations
                    .GroupBy(p => p.location)
                    .Select(g => g.OrderBy(p => Math.Abs((p.datetime - now).Ticks)).First()) // For each group, find the prediction closest to now
                    .ToList();

                return Ok(groupedPredictions);
            }
            catch (Exception ex)
            {
                // If the query fails, catch the exception and return a failure response
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }

>>>>>>> dev
    }
}
