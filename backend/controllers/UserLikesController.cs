using Microsoft.AspNetCore.Mvc;
using backend.Models;
using System.Collections.Generic;
using System.Linq;

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
        public ActionResult<User_Likes> AddUserLike(User_Likes userLike)
        {
            _context.UserLikes.Add(userLike);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUserLikes), new { id = userLike.Id }, userLike);
        }
    }
}
