using Microsoft.AspNetCore.Mvc;
using backend.data;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (!_context.Places.Any())
            {
                _context.Places.Add(new Place
                {
                    Name = "Test Location",
                    Lat = 0.0M, // The 'M' suffix specifies decimal literal 
                    Lon = 0.0M 
                });
                _context.SaveChanges();
            }

            var model = _context.Places.FirstOrDefault();
            return Ok(model);
        }
    }
}