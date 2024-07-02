using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FriendsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/friends
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Friends>>> GetFriends()
        {
            return await _context.Friends.ToListAsync();
        }

        // GET: api/friends/{userId}/{friendId}
        [HttpGet("{userId}/{friendId}")]
        public async Task<ActionResult<Friends>> GetFriend(int userId, int friendId)
        {
            var friend = await _context.Friends
                .FirstOrDefaultAsync(f => f.UserId == userId && f.UserFriendId == friendId);

            if (friend == null)
            {
                return NotFound();
            }

            return friend;
        }

        // POST: api/friends
        [HttpPost]
        public async Task<ActionResult<Friends>> AddFriend([FromBody] Friends friend)
        {
            _context.Friends.Add(friend);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFriend), new { userId = friend.UserId, friendId = friend.UserFriendId }, friend);
        }

        // DELETE: api/friends/{userId}/{friendId}
        [HttpDelete("{userId}/{friendId}")]
        public async Task<IActionResult> DeleteFriend(int userId, int friendId)
        {
            var friend = await _context.Friends
                .FirstOrDefaultAsync(f => f.UserId == userId && f.UserFriendId == friendId);

            if (friend == null)
            {
                return NotFound();
            }

            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
