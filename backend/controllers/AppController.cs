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

        [HttpGet("get-places")]
        public IActionResult GetAllPlaces()
        {
            try
            {
                // Query the Places table to get all records
                var places = _context.Places.ToList(); // This retrieves all records from the Places table

                // If the query succeeds, return the records
                return Ok(places);
            }
            catch (Exception ex)
            {
                // If the query fails, catch the exception and return a failure response
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }

        // Endpoint to get places not seen by the user (Feed)
        [HttpGet("feed/{userId?}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlacesNotSeenByUser(long? userId = null)
        {
            if (userId == null)
            {
                // If no userId is provided, return all places (full feed)
                var allPlaces = await _context.Places.ToListAsync();
                return Ok(allPlaces);
            }

            var userLikes = await _context.UserLikes
                .Where(ul => ul.UserId == userId.Value)
                .Select(ul => ul.PlaceId)
                .ToListAsync();

            var placesNotSeen = await _context.Places
                .Where(p => !userLikes.Contains(p.Id))
                .ToListAsync();

            return Ok(placesNotSeen);
        }

        // Endpoint to get places liked by the user (Saved Pins)
        [HttpGet("saved/{userId}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlacesLikedByUser(long userId)
        {
            var userLikes = await _context.UserLikes
                .Where(ul => ul.UserId == userId)
                .Include(ul => ul.Place)
                .ToListAsync();

            var placesLiked = userLikes.Select(ul => ul.Place).ToList();

            return Ok(placesLiked);
        }
    }
}
