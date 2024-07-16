namespace backend.Models
{
    public class User_Likes
    {
        public long Id { get; set; }
        public required string UserId { get; set; } 
        public required long PlaceId { get; set; }
        public required string Type { get; set; }
        public required string CategorySwipe { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        public Place? Place { get; set; } // property has to be nullable
    }
}
