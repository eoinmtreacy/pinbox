using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Amenity>>> GetAllAmenities()
        {
            var amenities = await _context.Amenities
                .Include(a => a.Place)
                .ToListAsync();

            return Ok(amenities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Amenity>> GetAmenity(long id)
        {
            var amenity = await _context.Amenities
                .Include(a => a.Place)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (amenity == null)
            {
                return NotFound();
            }

            var googleId = amenity.Place.Google_Id;

            return Ok(new { Amenity = amenity, GoogleId = googleId });
        }

        [HttpGet("test")]
        public ActionResult<string> Test()
        {
            return "Test endpoint is working!";
        }
    }
}
