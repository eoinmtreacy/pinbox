using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace backend.controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ILogger<UserController> logger;

        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ILogger<UserController> logger)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.logger = logger;
        }

   
        [HttpPost("add-user")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new AppUser()
            {
                Email = model.Email,
                PinboxId = model.PinboxId,
                PasswordHash = model.Password,
                UserName = model.Username
            };
            var result = await userManager.CreateAsync(user, user.PasswordHash!);
            if (result.Succeeded)
                return Ok("Registration made successfully");
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var signInResult = await signInManager.PasswordSignInAsync(
                  userName: model.Email!,
                  password: model.Password!,
                  isPersistent: false,
                  lockoutOnFailure: false
                  );
            if (signInResult.Succeeded)
            {
                return Ok("You are successfully logged in");
            }
            return BadRequest("Error occured");
        }

        // log out endpoint
[HttpPost("logout")]
public async Task<IActionResult> Logout()
{
    await signInManager.SignOutAsync();
    // Manually setting the cookie to be deleted
var cookieOptions = new CookieOptions
{
    Expires = DateTime.UtcNow.AddDays(-1), // Set expiration to past date
    Path = "/", // Ensure path matches the cookie's path
    Domain = "localhost", // Ensure domain matches the cookie's domain, if applicable
    Secure = false, // Match the Secure flag as per the cookie's settings
    HttpOnly = true // Match the HttpOnly flag as per the cookie's settings
};
Response.Cookies.Delete(".AspNetCore.Identity.Application", cookieOptions);

    return Ok("You are successfully logged out");
}
        [Authorize]
        [HttpGet("auth")]
        public async Task<IActionResult> GetUser()
        {
            var user = await userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();
            return Ok(new
            {
                user.Email,
                user.UserName,
                user.PinboxId
            });
        }
    }
}