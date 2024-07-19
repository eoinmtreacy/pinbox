using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlacesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlacesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("categorized-places")]
        public async Task<IActionResult> GetCategorizedPlaces()
        {
            try
            {
                var categorizedPlaces = await _context.UserLikes
                    .Include(ul => ul.Place)
                    .Where(ul => ul.Place != null)  // Null check for ul.Place
                    .Select(ul => new 
                    {
                        Id = ul.Place!.Id,           // Null-forgiving operator
                        Name = ul.Place!.Name,       // Null-forgiving operator
                        Lat = ul.Place!.Lat,         // Null-forgiving operator
                        Lon = ul.Place!.Lon,         // Null-forgiving operator
                        ul.CategorySwipe
                    })
                    .ToListAsync();

                return Ok(categorizedPlaces);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }
    }
}
