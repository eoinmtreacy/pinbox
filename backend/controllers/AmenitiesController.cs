using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        // GET: api/amenities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Amenity>>> GetAmenities()
        {
            return await _context.Amenities.ToListAsync();
        }

        // GET: api/amenities/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Amenity>> GetAmenity(string id)
        {
            var amenity = await _context.Amenities.FindAsync(id);

            if (amenity == null)
            {
                return NotFound();
            }

            return amenity;
        }

        // POST: api/amenities
        [HttpPost]
        public async Task<ActionResult<Amenity>> AddAmenity([FromBody] Amenity amenity)
        {
            _context.Amenities.Add(amenity);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAmenity), new { id = amenity.Google_Id }, amenity);
        }

        // PUT: api/amenities/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAmenity(string id, [FromBody] Amenity amenity)
        {
            if (id != amenity.Google_Id)
            {
                return BadRequest();
            }

            _context.Entry(amenity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AmenityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/amenities/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAmenity(string id)
        {
            var amenity = await _context.Amenities.FindAsync(id);
            if (amenity == null)
            {
                return NotFound();
            }

            _context.Amenities.Remove(amenity);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AmenityExists(string id)
        {
            return _context.Amenities.Any(e => e.Google_Id == id);
        }
    }
}
