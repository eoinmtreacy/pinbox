using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore; // needed for AnyAsync in existingUserByPinboxId 
using backend.Models;
using System.Data.SqlClient;
using MySqlConnector;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ApplicationDbContext _context; // Anita accessing the database connection


        // Constructor
        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ApplicationDbContext context) //passing the db context to constructor
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context; // anita getting the context for userprofile
        }


[HttpPost("add-user")]
public async Task<IActionResult> Register([FromBody] RegisterModel model)
{
    List<string> errorMessages = new List<string>();

    if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Username))
    {
        errorMessages.Add("Email, Username, and Password are required");
        return BadRequest(new { errors = errorMessages });
    }

    var existingUserByEmail = await _userManager.FindByEmailAsync(model.Email);
    if (existingUserByEmail != null)
    {
        errorMessages.Add("Email is already in use");
        return BadRequest(new { errors = errorMessages });
    }

    var existingUserByPinboxId = await _userManager.Users.AnyAsync(u => u.PinboxId == model.PinboxId);
    if (existingUserByPinboxId)
    {
        errorMessages.Add("PinboxId is already in use");
        return BadRequest(new { errors = errorMessages });
    }

    var user = new AppUser()
    {
        Email = model.Email,
        PinboxId = model.PinboxId,
        UserName = model.Username
    };

    var result = await _userManager.CreateAsync(user, model.Password);

    if (result.Succeeded)
    {
        // Create a new user profile for the user
                var userProfile = new UserProfile()
                {
                    userId = model.PinboxId
                };

                _context.UserProfiles.Add(userProfile); //I've set it in the appdbcontext script
                await _context.SaveChangesAsync();
        return Ok("Registration made successfully");
    }

    // Convert Identity errors to a list of strings
    errorMessages.AddRange(result.Errors.Select(e => e.Description));
    return BadRequest(new { errors = errorMessages });
}

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest(new { message = "Email and Password are required" });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Email not recognized" });
            }

            var signInResult = await _signInManager.PasswordSignInAsync(
                userName: user.UserName!,
                password: model.Password!,
                isPersistent: false,
                lockoutOnFailure: false
            );

            if (signInResult.Succeeded)
            {
                return Ok(new { message = "You are successfully logged in" });
            }

            return Unauthorized(new { message = "Incorrect password" });
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok("You are successfully logged out");
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while logging out.");
            }
        }

        [HttpGet("auth")]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(new
            {
                user.Email,
                user.UserName,
                user.PinboxId
            });
        }

        //anita
        [HttpGet("user-profile/{userId}")]
        public async Task<IActionResult> GetUserProfileData(string userId)
        {
            try
            {
                // Fetch user profile data from the database
                var userProfile = await _context.UserProfiles
                    .FirstOrDefaultAsync(up => up.userId == userId);

                // Check if the user profile exists
                if (userProfile == null)
                {
                    return NotFound(new { Message = "User profile not found for the given userId." });
                }

                // Return the user profile data
                return Ok(new
                {
                    UserId = userProfile.userId,
                    Bio = userProfile.bio,
                    ProfileImageUrl = userProfile.profileImageUrl
                });
                    }
                    catch (Exception ex)
                    {
                        // Log the exception (optional) and return an internal server error response
                        return StatusCode(500, $"Internal server error: {ex.Message}");
                    }
        }

    }
}
