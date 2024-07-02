namespace backend.Models
{
public class User_Likes
    {
        public int Id { get; set; }
        public int UserId { get; set; }
      public string Type { get; set; } = string.Empty; 
        public int PlaceId { get; set; }
        public string CategorySwipe { get; set; } = string.Empty; 
        public DateTime Timestamp { get; set;} // This orders the likes by order of when they liked the place, do we want this feature 

        public Place? Place { get; set; } // made the place property it nullable 
    }
}
