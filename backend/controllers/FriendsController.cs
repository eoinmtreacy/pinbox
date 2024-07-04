using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Collections.Generic;
using System.Linq;

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

        [HttpGet]
        public ActionResult<IEnumerable<Friends>> GetFriends()
        {
            return _context.Friends.ToList();
        }

        [HttpPost]
        public ActionResult<Friends> AddFriend(Friends friend)
        {
            _context.Friends.Add(friend);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetFriends), new { id = friend.UserId }, friend);
        }
    }
}
