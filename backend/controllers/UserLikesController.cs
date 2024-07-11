using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserLikesController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly string[] allowedCategorySwipes = ["love_it", "hate_it", "wanna", "dont_care"];

        [HttpPost]
        public async Task<IActionResult> PostUserLike([FromBody] User_Likes userLike)
        {
            // Validate the incoming data
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Validate categorySwipe value
            if (!allowedCategorySwipes.Contains(userLike.CategorySwipe.ToLower()))
            {
                return BadRequest(new { Message = $"Invalid categorySwipe value. Allowed values are: {string.Join(", ", allowedCategorySwipes)}" });
            }

            // Check if the PlaceId and PlaceType exist in the Places table
            var place = await _context.Places
                .Where(p => p.Id == userLike.PlaceId && p.Type == userLike.Type)
                .FirstOrDefaultAsync();

            if (place == null)
            {
                return NotFound(new { Message = "Place not found." });
            }

            // If Timestamp is not provided in the request, set it to the current UTC time
            if (userLike.Timestamp == default(DateTime))
            {
                userLike.Timestamp = DateTime.UtcNow;
            }

            // Add the UserLike to the database
            _context.UserLikes.Add(userLike);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostUserLike), new { id = userLike.UserId }, userLike);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserLikes()
        {
            try
            {
                var userLikes = await _context.UserLikes.ToListAsync();
                if (userLikes == null || userLikes.Count == 0)
                {
                    return NotFound("No user likes found.");
                }
                return Ok(userLikes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
            
        }
    }
}