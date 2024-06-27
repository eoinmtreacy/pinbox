using Microsoft.AspNetCore.Mvc;
using backend.data;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppController(ApplicationDbContext context)
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
        [HttpGet("get-places")]
        public IActionResult GetAllPlaces()
        {
            try
            {
                // Query the Places table to get all records
                var places = _context.Places.ToList(); // This retrieves all records from the Places table

                // If the query succeeds, return the records
                return Ok(places);
            }
            catch (Exception ex)
            {
                // If the query fails, catch the exception and return a failure response
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }
    }
}
