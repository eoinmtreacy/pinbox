using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserLikesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<UserLikesController> _logger;

        public UserLikesController(ApplicationDbContext context, ILogger<UserLikesController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Endpoint to get places liked by a user
        [HttpGet("{userId}/places")]
        public async Task<ActionResult<IEnumerable<Place>>> GetPlacesLikedByUser(long userId)
        {
            _logger.LogInformation("GetPlacesLikedByUser called with userId: {userId}", userId);

            // Get the place IDs from the userlikes table for the given user ID
            var userLikes = await _context.UserLikes
                .Where(ul => ul.UserId == userId)
                .ToListAsync();

            _logger.LogInformation("UserLikes found: {userLikes}", userLikes);

            if (userLikes == null || userLikes.Count == 0)
            {
                _logger.LogInformation("No places found for userId: {userId}", userId);
                return NotFound(new { Message = "No places found for this user." });
            }

            var placeIds = userLikes.Select(ul => ul.PlaceId).ToList();
            _logger.LogInformation("Found place IDs: {placeIds}", string.Join(", ", placeIds));

            // Get the places from the places table using the place IDs
            var places = await _context.Places
                .Where(p => placeIds.Contains(p.Id))
                .ToListAsync();

            _logger.LogInformation("Places found: {places}", places);

            if (places == null || places.Count == 0)
            {
                _logger.LogInformation("No matching places found in places table for userId: {userId}", userId);
                return NotFound(new { Message = "No places found for this user." });
            }

            _logger.LogInformation("{count} places found for userId: {userId}", places.Count, userId);
            return Ok(places);
        }

        [HttpGet("category/{categorySwipe}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetUserLikesByCategorySwipe(string categorySwipe)
        {
            _logger.LogInformation("GetUserLikesByCategorySwipe called with categorySwipe: {categorySwipe}", categorySwipe);

            if (!Enum.TryParse<CategorySwipe>(categorySwipe.Replace(" ", string.Empty), true, out var parsedCategorySwipe))
            {
                _logger.LogWarning("Invalid category swipe value: {categorySwipe}", categorySwipe);
                return BadRequest(new { Message = "Invalid category swipe value." });
            }

            var userLikes = await _context.UserLikes
                .Include(ul => ul.Place)
                .Where(ul => ul.CategorySwipe == parsedCategorySwipe)
                .OrderBy(ul => ul.Timestamp)
                .ToListAsync();

            _logger.LogInformation("UserLikes found: {userLikes}", userLikes);

            if (userLikes == null || userLikes.Count == 0)
            {
                _logger.LogInformation("No likes found for category: {categorySwipe}", categorySwipe);
                return NotFound(new { Message = "No likes found for this category." });
            }

            var places = userLikes.Select(ul => ul.Place).ToList();

            _logger.LogInformation("{count} places found for category: {categorySwipe}", places.Count, categorySwipe);
            return Ok(places);
        }

        [HttpGet("{userId}/{placeId}")]
        public async Task<ActionResult<Place>> GetPlaceForUserLike(long userId, long placeId)
        {
            _logger.LogInformation("GetPlaceForUserLike called with userId: {userId}, placeId: {placeId}", userId, placeId);

            var userLike = await _context.UserLikes
                .Include(ul => ul.Place)
                .FirstOrDefaultAsync(ul => ul.UserId == userId && ul.PlaceId == placeId);

            _logger.LogInformation("UserLike found: {userLike}", userLike);

            if (userLike == null)
            {
                _logger.LogInformation("No like found for userId: {userId}, placeId: {placeId}", userId, placeId);
                return NotFound(new { Message = "No like found for this user and place." });
            }

            _logger.LogInformation("Place found for userId: {userId}, placeId: {placeId}", userId, placeId);
            return Ok(userLike.Place);
        }

        [HttpGet("get-places")]
        public IActionResult GetAllPlaces()
        {
            try
            {
                _logger.LogInformation("GetAllPlaces called");

                var places = _context.Places.ToList();

                _logger.LogInformation("{count} places found", places.Count);
                return Ok(places);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve data from the database");
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }
    }
}
