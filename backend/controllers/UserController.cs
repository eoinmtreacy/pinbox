using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;

        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
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
        public async Task<IActionResult> Login(string email, string password)
        {
            var signInResult = await signInManager.PasswordSignInAsync(
                  userName: email!,
                  password: password!,
                  isPersistent: false,
                  lockoutOnFailure: false
                  );
            if (signInResult.Succeeded)
            {
                var user = await userManager.FindByEmailAsync(email);
                if (user != null)
                {
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
    }
}