using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLikesController : ControllerBase
    {
        private readonly YourDbContext _context;

        public UserLikesController(YourDbContext context)
        {
            _context = context;
        }

        // POST: api/userlikes
        [HttpPost]
        public async Task<ActionResult<User_Likes>> AddUserLike([FromBody] User_Likes userLike)
        {
            if (userLike == null)
            {
                return BadRequest(new { error = "Invalid user like data" });
            }

            _context.UserLikes.Add(userLike);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserLikesByCategorySwipe), new { id = userLike.Id }, userLike);
        }

        // GET: api/userlikes/category/{categorySwipe}
        [HttpGet("category/{categorySwipe}")]
        public async Task<ActionResult<IEnumerable<Place>>> GetUserLikesByCategorySwipe(string categorySwipe)
        {
            var userLikes = await _context.UserLikes
                .Include(ul => ul.Place)
                .Where(ul => ul.CategorySwipe == categorySwipe)
                .OrderBy(ul => ul.Timestamp)
                .ToListAsync();

            if (userLikes == null || userLikes.Count == 0)
            {
                return NotFound(new { error = "No likes found for this category" });
            }

            var places = userLikes.Select(ul => ul.Place).ToList();

            return Ok(places);
        }
    }
}
