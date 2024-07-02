namespace backend.Models
{
public class User_Likes
    {
        public long Id { get; set; }
        public long UserId { get; set; }
      public string Type { get; set; } = string.Empty; 
        public long PlaceId { get; set; }
        public string CategorySwipe { get; set; } = string.Empty; 
        public DateTime Timestamp { get; set;} 
        public Place? Place { get; set; } // made the place property it nullable 
    }
}
