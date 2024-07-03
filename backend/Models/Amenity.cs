using Enums.Models;

namespace backend.Models
{
    public class Amenity
    {
        public required string Id { get; set; }
        public bool Cuisine_Pizza { get; set; }
        public bool Cuisine_Chinese { get; set; }
        public bool Cuisine_Coffee_Shop { get; set; }
        public bool Cuisine_Mexican { get; set; }
        public bool Cuisine_Italian { get; set; }
        public bool Cuisine_Burger { get; set; }
        public bool Cuisine_Donut { get; set; }
        public bool Cuisine_Sandwich { get; set; }
        public bool Cuisine_Japanese { get; set; }
        public bool Cuisine_American { get; set; }
        public bool Diet_Vegan { get; set; }
        public bool Drink_Beer { get; set; }
        public bool Drink_Tea { get; set; }
        public bool Drink_Wine { get; set; }
        public bool Outdoor_Seating { get; set; }
        public AvailabilityStatus Wheelchair { get; set; } // Enum property
        public required string PlaceId { get; set; } // Foreign key property
        public required Place Place { get; set; } // Required navigation property
    }
}
