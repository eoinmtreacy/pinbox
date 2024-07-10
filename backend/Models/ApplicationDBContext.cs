using Microsoft.EntityFrameworkCore;

namespace backend.Models 
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Place> Places { get; set; }
        public DbSet<Prediction> Predictions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Prediction>()
                  .HasKey(p => new { p.location, p.datetime });

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
