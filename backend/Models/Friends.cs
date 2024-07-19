namespace backend.Models
{
    public class Friends
    {
        required public string UserId { get; set; } 
        required public string UserFriendId { get; set; } 
        public DateTime Timestamp { get; set; }
    }
}
