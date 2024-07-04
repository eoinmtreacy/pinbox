using System.Collections.Generic;

namespace backend.Models
{
    public class Place
    {
        public long Id { get; set; } // Primary key
        public required string Google_Id { get; set; } = string.Empty;
        public required string Name { get; set; }
        public decimal Lat { get; set; }
        public decimal Lon { get; set; }
        public required string Type { get; set; } = string.Empty;
        public string? Subtype { get; set; }
        public string? Addr_City { get; set; }
        public string? Addr_Housenumber { get; set; }
        public string? Addr_Postcode { get; set; }
        public string? Addr_State { get; set; }
        public string? Addr_Street { get; set; }
        public string? Opening_Hours { get; set; }
        public string? Website { get; set; }
        public string? Photo_0 { get; set; }
        public string? Photo_1 { get; set; }
        public string? Photo_2 { get; set; }
        public string? Photo_3 { get; set; }
        public string? Photo_4 { get; set; }
        public string? Photo_5 { get; set; }
        public string? Photo_6 { get; set; }
        public string? Photo_7 { get; set; }
        public string? Photo_8 { get; set; }
        public string? Photo_9 { get; set; }
        public int Num_Likes { get; set; }
        public int Num_Dislikes { get; set; }

        public ICollection<User_Likes> UserLikes { get; set; } = [];
        public ICollection<Amenity> Amenities { get; set; } = [];
    }
}