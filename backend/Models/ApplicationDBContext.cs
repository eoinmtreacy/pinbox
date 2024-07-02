using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
   public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public DbSet<User_Likes> UserLikes { get; set; }
        public DbSet<User_Preference> UserPreferences { get; set; }
        public DbSet<Place> Places { get; set; }

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
    
    
    

