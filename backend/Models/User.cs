using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class User : IdentityUser
    {
        // Add additional properties here
        public string Pinbox_Id { get; set; }
        public User()
        {
            // Initialize required properties with default values if necessary
            Pinbox_Id = string.Empty;
        }
    }
}