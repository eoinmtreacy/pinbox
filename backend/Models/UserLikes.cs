namespace backend.Models
{
    public class User_Likes
    {
        public required long UserId { get; set; } // Maps to 'user_id'
        public required long PlaceId { get; set; } // Maps to 'place_id'
        public required string Type { get; set; } // Maps to 'place_type'
        public CategorySwipe CategorySwipe { get; set; } // Maps to 'category_swipe'
        public DateTime Timestamp { get; set; } // Maps to 'timestamp'

        // Navigation property
        public required Place Place { get; set; }
    }
}
