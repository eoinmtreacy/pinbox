using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.AspNetCore.Identity.Data;
using System.Security.Claims;

namespace backend.controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;

        private readonly ILogger<UserController> _logger; // Add this line

        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ILogger<UserController> logger)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this._logger = logger; 
        }


        [HttpPost("add-user")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new AppUser()
            {
                Email = model.Email,
                Pinbox_Id = model.Pinbox_Id,
                PasswordHash = model.Password,
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, user.PasswordHash!);
            if (result.Succeeded)
                return Ok("Registration made successfully");
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var signInResult = await signInManager.PasswordSignInAsync(
                  userName: request.Email!,
                  password: request.Password!,
                  isPersistent: false,
                  lockoutOnFailure: false
                  );
            if (signInResult.Succeeded)
            {
                var user = await userManager.FindByEmailAsync(request.Email);
                if (user != null)
                {
                    var claims = new List<Claim>
                    {
                        new Claim("Pinbox_Id", user.Pinbox_Id)
                    };
                    var identityResult = await userManager.AddClaimsAsync(user, claims);

                    if (!identityResult.Succeeded)
                    {
                        return BadRequest("Failed to add user claims.");
                    }
                    // Create a response object excluding sensitive details
                    var userResponse = new
                    {
                        user.Pinbox_Id
                    };
                    return Ok(userResponse);
                }
                else
                {
                    // User not found (this should theoretically not happen here)
                    return BadRequest("User not found.");
                }

            }
            return BadRequest("Error occured");
        }

        // log out endpoint
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok("You are successfully logged out");
        }

        [HttpGet("get-user/{pinbox_id}")]
        public IActionResult GetUser(string pinbox_id)
        {
            var user = userManager.Users.FirstOrDefault(u => u.Pinbox_Id == pinbox_id);
            if (user == null)
                return NotFound("User not found");
            return Ok(user);
        }

        [HttpGet("auth")]
        public IActionResult IsAuthenticated()
        {
            // Assuming _logger is an instance of ILogger available in your controller
            _logger.LogInformation("Available claims:");
            foreach (var claim in User.Claims)
            {
                _logger.LogInformation($"Type: {claim.Type}, Value: {claim.Value}");
            }

            var pinboxIdClaim = User.Claims.FirstOrDefault(c => c.Type == "Pinbox_Id");
            if (pinboxIdClaim != null)
            {
                return Ok(new { Pinbox_Id = pinboxIdClaim.Value });
            }
            else
            {
                return BadRequest("Pinbox_Id claim not found.");
            }
        }
    }
}