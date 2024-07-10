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
        public ActionResult<IEnumerable<User_Likes>> GetUserLikes()
        {
            return _context.UserLikes.ToList();
        }

        [HttpPost]
        public async Task<ActionResult<User_Likes>> AddUserLike([FromBody] User_Likes userLike)
        {
            if (userLike == null)
            {
                return BadRequest(new { error = "Invalid user like data" });
            }

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
