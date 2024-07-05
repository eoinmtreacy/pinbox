using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserLikesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserLikesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("category/{categorySwipe}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetUserLikesByCategorySwipe(string categorySwipe)
        {
            // Adjusted to ensure case-insensitive comparison and match enum strings
            if (!Enum.TryParse<CategorySwipe>(categorySwipe.Replace(" ", string.Empty), true, out var parsedCategorySwipe))
            {
                return BadRequest(new { Message = "Invalid category swipe value." });
            }

            var userLikes = await _context.UserLikes
                .Include(ul => ul.Place)
                .Where(ul => ul.CategorySwipe == parsedCategorySwipe)
                .OrderBy(ul => ul.Timestamp)
                .ToListAsync();

            if (userLikes == null || userLikes.Count == 0)
            {
                return NotFound(new { Message = "No likes found for this category." });
            }

            var places = userLikes.Select(ul => ul.Place).ToList();

            return Ok(places);
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
    }
}
