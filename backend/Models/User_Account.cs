namespace backend.Models
{
    public class UserAccount
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime Birthday { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string UserPhoto { get; set; } = string.Empty; // Path to picture

        // Navigation properties
        public ICollection<Friends>? Friends { get; set; } // Users that this user has added as friends
        public ICollection<Friends>? FriendOf { get; set; } // Users that have added this user as a friend
    }
}

