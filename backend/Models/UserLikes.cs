namespace backend.Models
{
public class User_Likes
    {
        public int Id { get; set; }
        public int UserId { get; set; }
      public string Type { get; set; } = string.Empty; 
        public int PlaceId { get; set; }
        public string CategorySwipe { get; set; } = string.Empty; 
        public DateTime Timestamp { get; set;}
    }
}
