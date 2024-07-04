using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

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
                    .Select(ul => new 
                    {
                        ul.Place.Id,
                        ul.Place.Name,
                        ul.Place.Lat,
                        ul.Place.Lon,
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
