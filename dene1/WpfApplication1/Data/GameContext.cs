using Microsoft.EntityFrameworkCore;
using Model;

namespace Data
{
    public class GameContext : DbContext
    {
        public GameContext() : base()
        {

        }

        public DbSet<ProductItem> ProductItems { get; set; }
        public DbSet<Ability> Abilities { get; set; }
        public DbSet<Bag> Bags { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<BuildingPrototype> BuildingPrototypes { get; set; }

    }
}
