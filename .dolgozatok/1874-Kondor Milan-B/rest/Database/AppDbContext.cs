namespace Database;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<RouteEntity> Routes { get; set; }
}