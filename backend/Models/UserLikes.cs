namespace backend.Models
{
    public class User_Likes
    {
        public long Id { get; set; } // This maps to the 'index' column
        public required long UserId { get; set; } // 
        public required long PlaceId { get; set; } // 
        public required string Type { get; set; } // This maps to 'place_type'
        public CategorySwipe CategorySwipe { get; set; }
        public DateTime Timestamp { get; set; }

        public required Place Place { get; set; }
    }
}
