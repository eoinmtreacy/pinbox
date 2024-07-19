using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Sprache;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
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

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok("You are successfully logged out");
        }

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
        [HttpPost("check-email")]
        public async Task<IActionResult> CheckEmail([FromBody] CheckEmailModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                return Ok(new { exists = true });
            }
            return Ok(new { exists = false });
        }
    }

    public class CheckEmailModel
    {
        public string Email { get; set; }
    }

    public class RegisterModel
    {
        public string Email { get; set; }
        public string PinboxId { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}