using Microsoft.EntityFrameworkCore;
using Enums.Models;

namespace backend.Models
{
    public class YourDbContext : DbContext
    {
        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options) { }

        public DbSet<User_Likes> UserLikes { get; set; }
        public DbSet<User_Preference> UserPreferences { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Amenity> Amenities { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Place>(entity =>
            {
                entity.ToTable("places");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Google_Id)
                      .IsRequired()
                      .HasMaxLength(255);

                entity.Property(e => e.Name)
                      .IsRequired()
                      .HasMaxLength(255);

                entity.Property(e => e.Lat)
                      .IsRequired()
                      .HasColumnType("decimal(9,6)");

                entity.Property(e => e.Lon)
                      .IsRequired()
                      .HasColumnType("decimal(9,6)");

                entity.Property(e => e.Type)
                      .IsRequired()
                      .HasMaxLength(50);

                entity.Property(e => e.Subtype)
                      .HasMaxLength(50);

                entity.Property(e => e.Addr_City)
                      .HasMaxLength(100);

                entity.Property(e => e.Addr_Housenumber)
                      .HasMaxLength(20);

                entity.Property(e => e.Addr_Postcode)
                      .HasMaxLength(20);

                entity.Property(e => e.Addr_State)
                      .HasMaxLength(100);

                entity.Property(e => e.Addr_Street)
                      .HasMaxLength(255);

                entity.Property(e => e.Opening_Hours)
                      .HasMaxLength(255);

                entity.Property(e => e.Website)
                      .HasMaxLength(255);

                entity.Property(e => e.Photo_0)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_1)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_2)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_3)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_4)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_5)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_6)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_7)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_8)
                      .HasMaxLength(500);

                entity.Property(e => e.Photo_9)
                      .HasMaxLength(500);

                entity.Property(e => e.Num_Likes)
                      .HasDefaultValue(0);

                entity.Property(e => e.Num_Dislikes)
                      .HasDefaultValue(0);
            });

            modelBuilder.Entity<Amenity>(entity =>
            {
                entity.ToTable("amenities");

                entity.HasKey(e => e.Google_Id); // Define primary key

                entity.Property(e => e.Google_Id)
                      .IsRequired()
                      .HasMaxLength(255); // Define Google_Id property

                entity.Property(e => e.Gluten_Free) // Before merge this needs to be clarified if in table
                      .IsRequired();

                entity.Property(e => e.Vegan)
                      .IsRequired();

                entity.Property(e => e.Wheelchair)
                      .IsRequired()
                      .HasConversion<string>(); // Store enum as string in the database

                entity.Property(e => e.Beer)
                      .IsRequired();

                entity.Property(e => e.Wine)
                      .IsRequired();

                entity.Property(e => e.Second_Hand)
                      .IsRequired();

                entity.Property(e => e.Atm)
                      .IsRequired();

                entity.Property(e => e.Toilets)
                      .IsRequired();

                entity.Property(e => e.Indoor_Seating)
                      .IsRequired();

                entity.Property(e => e.Outdoor_Seating)
                      .IsRequired();

                entity.Property(e => e.Coffee)
                      .IsRequired();

                entity.Property(e => e.Tea)
                      .IsRequired();

                entity.Property(e => e.PlaceGoogleId)
                      .IsRequired()
                      .HasMaxLength(255); // Define foreign key property

                entity.HasOne(d => d.Place)
                      .WithMany(p => p.Amenities)
                      .HasForeignKey(d => d.PlaceGoogleId)
                      .HasPrincipalKey(p => p.Google_Id)
                      .OnDelete(DeleteBehavior.Cascade); // Define foreign key relationship
            });
        }
    }
}

    namespace backend.Models
{
    public class Place
    {
        public int Id { get; set; } // Primary key
        public string Google_Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public decimal Lat { get; set; }
        public decimal Lon { get; set; }
        public string Type { get; set; } = string.Empty;
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
        public int Num_Likes { get; set; } = 0;
        public int Num_Dislikes { get; set; } = 0;
        public ICollection<Amenity> Amenities { get; set; } = new List<Amenity>();

    }
}

    
    namespace backend.Models
{
    public class Amenity
    {
        public required string Google_Id { get; set; } // Required modifier
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
        public bool Coffee { get; set; } // Coffee instead of espresso 
        public bool Tea { get; set; }

        public required Place Place { get; set; } // Required navigation property
        public required string PlaceGoogleId { get; set; } // Foreign key to Place
    }
    public class User_Account
    {
      
    }
}




            // Configuration for UserLike entity
            modelBuilder.Entity<User_Likes>(entity =>
            {
                entity.ToTable("user_likes");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.UserId)
                      .IsRequired();

                entity.Property(e => e.Type)
                      .IsRequired()
                      .HasMaxLength(50);

                entity.Property(e => e.PlaceId)
                      .IsRequired();

                entity.Property(e => e.CategorySwipe)
                      .HasMaxLength(50);

                entity.Property(e => e.Timestamp)
                      .IsRequired();

                  entity.HasOne(e => e.Place)
                      .WithMany()
                      .HasForeignKey(e => e.PlaceId);
            });

            modelBuilder.Entity<User_Preference>(entity =>
            {
                entity.ToTable("user_preferences");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Location)
                      .IsRequired()
                      .HasMaxLength(255);

                entity.Property(e => e.Radius)
                      .IsRequired();

                entity.Property(e => e.TypeOfPlace)
                      .HasMaxLength(255);
            });
        }
    }
}
    
    
    

