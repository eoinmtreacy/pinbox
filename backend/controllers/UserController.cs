using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore; // needed for AnyAsync in existingUserByPinboxId 
using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        // Constructor
        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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
                return Unauthorized(new { message = "Username not recognized" });
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
    }
}
