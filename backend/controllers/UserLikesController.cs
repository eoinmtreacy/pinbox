using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLikesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserLikesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User_Likes>>> GetUserLikes()
        {
            return await _context.UserLikes.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<User_Likes>> AddUserLike([FromBody] User_Likes userLike)
        {
            if (userLike == null)
            {
                return BadRequest(new { error = "Invalid user like data" });
            }

            // Check if the PlaceId exists in the Places table
            var place = await _context.Places
                .Where(p => p.Id == userLike.PlaceId && p.Type == userLike.Type)
                .FirstOrDefaultAsync();

            if (place == null)
            {
                return NotFound(new { Message = "Place not found." });
            }

            userLike.Place = place; // Assign the place to the userLike

            _context.UserLikes.Add(userLike);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUserLikes), new { id = userLike.Id }, userLike);
        }

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
