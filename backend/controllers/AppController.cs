using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (!_context.Places.Any())
            {
                _context.Places.Add(new Place
                {
                    Google_Id = "default_google_id",
                    Name = "Test Location",
                    Lat = 0.0M, // The 'M' suffix specifies decimal literal 
                    Lon = 0.0M,
                    Type = "default_type"
                });
                await _context.SaveChangesAsync();
            }

            var place = await _context.Places
                .OrderBy(p => p.Id) // Ensure deterministic results by ordering by a column
                .FirstOrDefaultAsync();

            if (place == null)
            {
                return NotFound();
            }

            return Ok(place);
        }

        [HttpGet("get-places")]
        public IActionResult GetAllPlaces()
        {
            var places = _context.Places.ToList();
            return Ok(places);
        }
    }
}
