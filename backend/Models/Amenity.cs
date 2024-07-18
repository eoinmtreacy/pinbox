namespace backend.Models
{
    public class Amenity
    {
        public required long Id { get; set; } // Primary key and foreign key
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
        public AvailabilityStatus Diet_Vegan { get; set; } // AvailabiltyStatus = enum 
        public AvailabilityStatus Drink_Beer { get; set; }
        public AvailabilityStatus Drink_Tea { get; set; }
        public AvailabilityStatus Drink_Wine { get; set; }
        public AvailabilityStatus Outdoor_Seating { get; set; }
        public AvailabilityStatus Wheelchair { get; set; } 

        // Navigation property
        public required Place Place { get; set; } 
    }
}
