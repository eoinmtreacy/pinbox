using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmenitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AmenitiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Example method to demonstrate accessing Google_Id
        [HttpGet("{id}")]
        public async Task<ActionResult<Amenity>> GetAmenity(string id)
        {
            var amenity = await _context.Amenities
                .Include(a => a.Place) // Include the related Place
                .FirstOrDefaultAsync(a => a.Id == id);

            if (amenity == null)
            {
                return NotFound();
            }

            // Access the Google_Id through the Place navigation property
            var googleId = amenity.Place.Google_Id;

            return Ok(new { Amenity = amenity, GoogleId = googleId });
        }

        // Other controller methods...
    }
}
