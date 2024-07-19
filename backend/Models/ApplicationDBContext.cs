using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace backend.Models
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User_Likes> UserLikes { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Amenity> Amenities { get; set; }
        public DbSet<Friends> Friends { get; set; }
        public DbSet<Prediction> Predictions { get; set; }
        public DbSet<OpeningHour> OpeningHours { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var configuration = new ConfigurationBuilder()
                    .SetBasePath(AppContext.BaseDirectory)
                    .AddJsonFile("appsettings.json")
                    .Build();

                var connectionString = configuration.GetConnectionString("DefaultConnection");

                optionsBuilder.UseMySql(connectionString, 
                    new MySqlServerVersion(new Version(8, 0, 21)),
                    options => options.EnableRetryOnFailure());
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Composite key 
            modelBuilder.Entity<OpeningHour>()
                .HasKey(o => o.Id); // setting Id as a primary key

            // Configure Pinbox_Id to be unique
            modelBuilder.Entity<AppUser>()
                .HasIndex(u => u.PinboxId)
                .IsUnique();

            modelBuilder.Entity<Prediction>()
                  .HasKey(p => new { p.location, p.datetime });

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

                entity.HasMany(e => e.UserLikes)
                      .WithOne(ul => ul.Place)
                      .HasForeignKey(ul => ul.PlaceId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.Amenities)
                      .WithOne(a => a.Place)
                      .HasForeignKey(a => a.Id)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.OpeningHours)
                      .WithOne(oh => oh.Place)
                      .HasForeignKey(oh => oh.PlaceId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Amenity>(entity =>
            {
                entity.ToTable("amenities");

                entity.HasKey(e => e.Id);
                entity.Property(e => e.Cuisine_Pizza).IsRequired();
                entity.Property(e => e.Cuisine_Chinese).IsRequired();
                entity.Property(e => e.Cuisine_Coffee_Shop).IsRequired();
                entity.Property(e => e.Cuisine_Mexican).IsRequired();
                entity.Property(e => e.Cuisine_Italian).IsRequired();
                entity.Property(e => e.Cuisine_Burger).IsRequired();
                entity.Property(e => e.Cuisine_Donut).IsRequired();
                entity.Property(e => e.Cuisine_Sandwich).IsRequired();
                entity.Property(e => e.Cuisine_Japanese).IsRequired();
                entity.Property(e => e.Cuisine_American).IsRequired();

                entity.Property(e => e.Diet_Vegan)
                      .HasConversion<string>();
                entity.Property(e => e.Drink_Beer)
                      .HasConversion<string>();
                entity.Property(e => e.Drink_Tea)
                      .HasConversion<string>();
                entity.Property(e => e.Drink_Wine)
                      .HasConversion<string>();
                entity.Property(e => e.Outdoor_Seating)
                      .HasConversion<string>();
                entity.Property(e => e.Wheelchair)
                      .HasConversion<string>();

                entity.HasOne(d => d.Place)
                      .WithMany(p => p.Amenities)
                      .HasForeignKey(d => d.Id)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<User_Likes>(entity =>
            {
                entity.ToTable("userlikes");

                entity.HasKey(e => new { e.UserId, e.PlaceId, e.Type }); // Composite key

                entity.Property(e => e.Id).HasColumnName("index");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.Type).HasColumnName("place_type").IsRequired().HasMaxLength(50);
                entity.Property(e => e.PlaceId).HasColumnName("place_id");
                entity.Property(e => e.CategorySwipe).HasColumnName("category_swipe").HasConversion<string>();
                  entity.Property(e => e.Collection).HasColumnName("collection").HasMaxLength(50);
                  entity.Property(e => e.NormalizedCollection).HasColumnName("normalized_collection").HasMaxLength(50);
                entity.Property(e => e.Timestamp).HasColumnName("timestamp");

                entity.HasOne(e => e.Place)
                      .WithMany(p => p.UserLikes)
                      .HasForeignKey(e => e.PlaceId);
            });

            modelBuilder.Entity<Friends>(entity =>
            {
                entity.ToTable("friends");

                entity.HasKey(f => new { f.UserId, f.UserFriendId });

                entity.Property(f => f.UserId).HasColumnName("user_id");
                entity.Property(f => f.UserFriendId).HasColumnName("user_friend_id");
                entity.Property(f => f.Timestamp).HasColumnName("timestamp");
            });
        }
    }
}