using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IdentityController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public IdentityController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpPost("add-user")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            var user = new User()
            {
                Email = model.Email,
                Pinbox_Id = model.Pinbox_Id,
                PasswordHash = model.Password
            };
            var result = await userManager.CreateAsync(user, user.PasswordHash);
            if (result.Succeeded)
            {
                return Ok("Registration succesful");
            }
            else
            {
                // log bad request.errors
                return BadRequest(result.Errors);

            }
        }
    }
}


