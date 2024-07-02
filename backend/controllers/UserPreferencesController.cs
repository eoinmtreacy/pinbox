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
    public class UserPreferencesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserPreferencesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/userpreferences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User_Preference>>> GetUserPreferences()
        {
            return await _context.UserPreferences.ToListAsync();
        }

        // GET: api/userpreferences/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User_Preference>> GetUserPreference(int id)
        {
            var userPreference = await _context.UserPreferences.FindAsync(id);

            if (userPreference == null)
            {
                return NotFound();
            }

            return userPreference;
        }

        // POST: api/userpreferences
        [HttpPost]
        public async Task<ActionResult<User_Preference>> AddUserPreference([FromBody] User_Preference userPreference)
        {
            _context.UserPreferences.Add(userPreference);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserPreference), new { id = userPreference.Id }, userPreference);
        }

        // PUT: api/userpreferences/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUserPreference(int id, [FromBody] User_Preference userPreference)
        {
            if (id != userPreference.Id)
            {
                return BadRequest();
            }

            _context.Entry(userPreference).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserPreferenceExists(id))
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

        // DELETE: api/userpreferences/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserPreference(int id)
        {
            var userPreference = await _context.UserPreferences.FindAsync(id);
            if (userPreference == null)
            {
                return NotFound();
            }

            _context.UserPreferences.Remove(userPreference);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserPreferenceExists(int id)
        {
            return _context.UserPreferences.Any(e => e.Id == id);
        }
    }
}
