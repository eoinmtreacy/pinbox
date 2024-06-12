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
            if (!_context.YourModels.Any())
            {
                _context.YourModels.Add(new YourModel
                {
                    Name = "Test Location",
                    Latitude = 0.0,
                    Longitude = 0.0
                });
                _context.SaveChanges();
            }

            var model = _context.YourModels.FirstOrDefault();
            return Ok(model);
        }
    }
}
