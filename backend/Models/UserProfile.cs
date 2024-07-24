 namespace backend.Models
{
    public class UserProfile
    {
    public required string userId { get; set; }
    public string bio { get; set; }
    public string profileImageUrl { get; set; }
    // Constructor to set default values
        public UserProfile()
        {
            bio = "Your bio here!";
            profileImageUrl = "userProfileImage.png";
        }
    }}