using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class YourDbContext : DbContext
    {
        public YourDbContext(DbContextOptions<YourDbContext> options) : base(options) { }

        public DbSet<User_Likes> UserLikes { get; set; }
        public DbSet<User_Preference> UserPreferences { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Amenity> Amenities { get; set; }
        public DbSet<UserAccount> UserAccounts { get; set; }
        public DbSet<Friends> Friends { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Place>(entity =>
            {
                entity.ToTable("places");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Google_Id).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Lat).IsRequired().HasColumnType("decimal(9,6)");
                entity.Property(e => e.Lon).IsRequired().HasColumnType("decimal(9,6)");
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Subtype).HasMaxLength(50);
                entity.Property(e => e.Addr_City).HasMaxLength(100);
                entity.Property(e => e.Addr_Housenumber).HasMaxLength(20);
                entity.Property(e => e.Addr_Postcode).HasMaxLength(20);
                entity.Property(e => e.Addr_State).HasMaxLength(100);
                entity.Property(e => e.Addr_Street).HasMaxLength(255);
                entity.Property(e => e.Opening_Hours).HasMaxLength(255);
                entity.Property(e => e.Website).HasMaxLength(255);
                entity.Property(e => e.Photo_0).HasMaxLength(500);
                entity.Property(e => e.Photo_1).HasMaxLength(500);
                entity.Property(e => e.Photo_2).HasMaxLength(500);
                entity.Property(e => e.Photo_3).HasMaxLength(500);
                entity.Property(e => e.Photo_4).HasMaxLength(500);
                entity.Property(e => e.Photo_5).HasMaxLength(500);
                entity.Property(e => e.Photo_6).HasMaxLength(500);
                entity.Property(e => e.Photo_7).HasMaxLength(500);
                entity.Property(e => e.Photo_8).HasMaxLength(500);
                entity.Property(e => e.Photo_9).HasMaxLength(500);
                entity.Property(e => e.Num_Likes).HasDefaultValue(0);
                entity.Property(e => e.Num_Dislikes).HasDefaultValue(0);

                // Configure the relationships
                entity.HasMany(e => e.UserLikes)
                      .WithOne(ul => ul.Place)
                      .HasForeignKey(ul => ul.PlaceId);

                entity.HasMany(e => e.Amenities)
                      .WithOne(a => a.Place)
                      .HasForeignKey(a => a.PlaceGoogleId)
                      .HasPrincipalKey(p => p.Google_Id)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Amenity>(entity =>
            {
                entity.ToTable("amenities");

                entity.HasKey(e => e.Google_Id);

                entity.Property(e => e.Gluten_Free).IsRequired();
                entity.Property(e => e.Vegan).IsRequired();
                entity.Property(e => e.Wheelchair).IsRequired().HasConversion<string>();
                entity.Property(e => e.Beer).IsRequired();
                entity.Property(e => e.Wine).IsRequired();
                entity.Property(e => e.Second_Hand).IsRequired();
                entity.Property(e => e.Atm).IsRequired();
                entity.Property(e => e.Toilets).IsRequired();
                entity.Property(e => e.Indoor_Seating).IsRequired();
                entity.Property(e => e.Outdoor_Seating).IsRequired();
                entity.Property(e => e.Coffee).IsRequired();
                entity.Property(e => e.Tea).IsRequired();
                entity.Property(e => e.PlaceGoogleId).IsRequired().HasMaxLength(255);

                entity.HasOne(d => d.Place)
                      .WithMany(p => p.Amenities)
                      .HasForeignKey(d => d.PlaceGoogleId)
                      .HasPrincipalKey(p => p.Google_Id)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<User_Likes>(entity =>
            {
                entity.ToTable("user_likes");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.Type).IsRequired().HasMaxLength(50);
                entity.Property(e => e.PlaceId).IsRequired();
                entity.Property(e => e.CategorySwipe).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Timestamp).IsRequired();

                entity.HasOne(e => e.Place)
                      .WithMany(p => p.UserLikes)
                      .HasForeignKey(e => e.PlaceId);
            });

            modelBuilder.Entity<User_Preference>(entity =>
            {
                entity.ToTable("user_preferences");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Location).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Radius).IsRequired();
                entity.Property(e => e.TypeOfPlace).HasMaxLength(255);
            });

            modelBuilder.Entity<UserAccount>(entity =>
            {
                entity.ToTable("user_account");

                entity.HasKey(e => e.UserId);

                entity.Property(e => e.Username).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Password).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Birthday).IsRequired();
                entity.Property(e => e.Gender).IsRequired().HasMaxLength(50);
                entity.Property(e => e.UserPhoto).IsRequired().HasMaxLength(500);

                // Configure the one-to-many relationships
                entity.HasMany(e => e.Friends)
                      .WithOne(f => f.User)
                      .HasForeignKey(f => f.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.FriendOf)
                      .WithOne(f => f.Friend)
                      .HasForeignKey(f => f.UserFriendId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Friends>(entity =>
            {
                entity.ToTable("friends");

                entity.HasKey(f => new { f.UserId, f.UserFriendId });

                entity.Property(f => f.Timestamp).IsRequired();

                entity.HasOne(f => f.User)
                      .WithMany(u => u.Friends)
                      .HasForeignKey(f => f.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(f => f.Friend)
                      .WithMany(u => u.FriendOf)
                      .HasForeignKey(f => f.UserFriendId)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
    
    public class Place
    {
        public long Id { get; set; }
        public string Google_Id { get; set; } = string.Empty; 
        public string Name { get; set; } = string.Empty; 
        public decimal Lat { get; set; }
        public decimal Lon { get; set; }
        public string Type { get; set; } = string.Empty; 
        public string? Subtype { get; set; }
        public string? Addr_City { get; set; }
        public string? Addr_Housenumber { get; set; }
        public string? Addr_Postcode { get; set; }
        public string? Addr_State  { get; set; }
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
        public long Num_Likes { get; set; } = 0;
        public long Num_Dislikes { get; set; } = 0;
    }
}
