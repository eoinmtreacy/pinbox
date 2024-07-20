using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Sprache;
using backend.Models;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ILogger<UserController> _logger;

        // Constructor with logger injection
        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ILogger<UserController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
        }

        [HttpPost("add-user")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Username))
            {
                _logger.LogWarning("Registration attempt failed: Email, Username, or Password is missing.");
                return BadRequest(new { message = "Email, Username, and Password are required" });
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
                _logger.LogInformation("User registration succeeded for {Username}.", model.Username);
                return Ok("Registration made successfully");
            }

            _logger.LogWarning("User registration failed for {Username}: {Errors}.", model.Username, string.Join(", ", result.Errors.Select(e => e.Description)));
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                _logger.LogWarning("Login attempt failed: Email or Password is missing.");
                return BadRequest(new { message = "Email and Password are required" });
            }

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                _logger.LogWarning("Login attempt failed: Username {Email} not recognized.", model.Email);
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
                _logger.LogInformation("User {Username} logged in successfully.", user.UserName);
                return Ok(new { message = "You are successfully logged in" });
            }

            _logger.LogWarning("Login attempt failed for {Username}: Incorrect password.", user.UserName);
            return Unauthorized(new { message = "Incorrect password" });
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                _logger.LogInformation("User logged out successfully.");
                return Ok("You are successfully logged out");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while logging out.");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while logging out.");
            }
        }

        [HttpGet("auth")]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                _logger.LogWarning("Authentication failed: User not found.");
                return Unauthorized();
            }

            _logger.LogInformation("User {Username} retrieved successfully.", user.UserName);
            return Ok(new
            {
                user.Email,
                user.UserName,
                user.PinboxId
            });
        }
    }
}
