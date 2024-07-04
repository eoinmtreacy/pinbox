namespace backend.Models
{
    public class User_Likes
    {
        public long Id { get; set; }
        public required string UserId { get; set; }
        public required long PlaceId { get; set; }
        public required string Type { get; set; }
        public required string CategorySwipe { get; set; }
        public DateTime Timestamp { get; set; }

        public required Place Place { get; set; }
    }
}

