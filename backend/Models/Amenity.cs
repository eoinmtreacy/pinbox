using Enums.Models;

namespace backend.Models
{
    public class Amenity
    {
        public required string Google_Id { get; set; }
        public bool Gluten_Free { get; set; }
        public bool Vegan { get; set; }
        public AvailabilityStatus Wheelchair { get; set; } // Enum property
        public bool Beer { get; set; }
        public bool Wine { get; set; }
        public bool Second_Hand { get; set; }
        public bool Atm { get; set; }
        public bool Toilets { get; set; }
        public bool Indoor_Seating { get; set; }
        public bool Outdoor_Seating { get; set; }
        public bool Coffee { get; set; }
        public bool Tea { get; set; }

        public required Place Place { get; set; } // Required navigation property
        public required string PlaceGoogleId { get; set; } // Foreign key to Place
    }
}
