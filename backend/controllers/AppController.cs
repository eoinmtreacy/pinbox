using Microsoft.AspNetCore.Mvc;
using backend.Models;
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

        [HttpGet("get-predictions")]
        public IActionResult GetPredictions()
        {
            try
            {
                // Get the current time
                var now = DateTime.Now;

                // Retrieve all predictions and group them by location
                var groupedPredictions = _context.Predictions
                    .AsEnumerable() // Switch to client-side processing for the next operations
                    .GroupBy(p => p.location)
                    .Select(g => g.OrderBy(p => Math.Abs((p.datetime - now).Ticks)).First()) // For each group, find the prediction closest to now
                    .ToList();

                return Ok(groupedPredictions);
            }
            catch (Exception ex)
            {
                // If the query fails, catch the exception and return a failure response
                return StatusCode(500, new { Message = "Failed to retrieve data from the database.", Error = ex.Message });
            }
        }
    }
}
