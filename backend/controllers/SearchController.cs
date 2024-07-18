using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
         private readonly ApplicationDbContext _context; // accessing the database connection
    
    // the constructor
    public SearchController(ApplicationDbContext context)
    {
        _context = context;
    }


        [HttpGet("search-places")]
        public async Task<IActionResult> SearchPlaces(string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Query parameter is required.");
            }

            var places = await _context.Places
                .Where(p => p.Name.Contains(query))
                .ToListAsync();

            return Ok(places);
        }
    }
}
