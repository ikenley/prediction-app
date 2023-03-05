using System;
using Microsoft.EntityFrameworkCore;
using PredictionApi.Models;

namespace PredictionApi.Models
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<DataPoint>().ToTable(nameof(DataPoint), t => t.ExcludeFromMigrations());
            //modelBuilder.Entity<CustomMarketShareOption>().HasKey(t => new { t.UnitId, t.RegionId, t.OptionId });
        }

        public DbSet<Prediction> Predictions { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
