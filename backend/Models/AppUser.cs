using Microsoft.AspNetCore.Identity;
namespace backend.Models
{
    public class AppUser : IdentityUser
    {
        public string? PinboxId { get; set; }

    }
}