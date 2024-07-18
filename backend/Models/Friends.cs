namespace backend.Models
{
    public class Friends
    {
        required public int UserId { get; set; } 
        required public int UserFriendId { get; set; } 
        public DateTime Timestamp { get; set; }
    }
}
