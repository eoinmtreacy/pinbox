using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;

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

        [HttpPost]
        public async Task<IActionResult> PostUserLike([FromBody] User_Likes userLike)
        {
            if (userLike == null)
            {
                return BadRequest(new { Message = "User like data is null." });
            }

            // Validate the incoming data
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid user like data.", Details = ModelState });
            }

            try
            {
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
            catch (DbUpdateException dbEx)
            {
                // Handle database update exceptions
                return StatusCode(500, new { Message = "An error occurred while updating the database.", Details = dbEx.Message });
            }
            catch (Exception ex)
            {
                // Handle general exceptions
                return StatusCode(500, new { Message = "An unexpected error occurred.", Details = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserLikes()
        {
            try
            {
                var userLikes = await _context.UserLikes.ToListAsync();
                return Ok(userLikes);
            }
            catch (Exception ex)
            {
                // Handle general exceptions
                return StatusCode(500, new { Message = "An unexpected error occurred while retrieving user likes.", Details = ex.Message });
            }
        }

        [HttpGet("category/{categorySwipe}")]
        public async Task<IActionResult> GetUserLikesByCategorySwipe(string categorySwipe)
        {
            if (string.IsNullOrWhiteSpace(categorySwipe))
            {
                return BadRequest(new { Message = "Category swipe value is required." });
            }

            try
            {
                var userLikes = await _context.UserLikes
                    .Include(ul => ul.Place)
                    .Where(ul => ul.CategorySwipe == categorySwipe)
                    .OrderBy(ul => ul.Timestamp)
                    .ToListAsync();

                if (userLikes == null || userLikes.Count == 0)
                {
                    return NotFound(new { Message = "No likes found for this category." });
                }

                var places = userLikes.Select(ul => ul.Place).ToList();
                return Ok(places);
            }
            catch (Exception ex)
            {
                // Handle general exceptions
                return StatusCode(500, new { Message = "An unexpected error occurred while retrieving user likes by category.", Details = ex.Message });
            }
        }
    }
}
