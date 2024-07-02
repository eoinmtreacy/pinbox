namespace backend.Models
{
    public class Friends
    {
        public int UserId { get; set; }
        public int UserFriendId { get; set; }
        public DateTime Timestamp { get; set; }

        // Navigation properties
        public UserAccount? User { get; set; }
        public UserAccount? Friend { get; set; }
    }
}

