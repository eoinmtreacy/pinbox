using Microsoft.EntityFrameworkCore;

namespace backend.data 
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<YourModel> YourModels { get; set; }
    }

    public class YourModel
    {
        public int Id { get; set; }
        
        // Declare the Name property as nullable
        public string? Name { get; set; }

        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
