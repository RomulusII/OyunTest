using GameCore.Services;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameCore.Mechanics.Seeder
{
    public class GameSeeder
    {
        public static void SeedGame()
        {
            SeedUnits();
        }


        private static void SeedUnits()
        {
            var npc = new Player();

            var rnd = new Random();
            for (int i = 0; i < 3000; i++)
            {
                var randomCell = GameService.Game.Harita.GetRandomLandCell(rnd);
                Unit u = new Unit(npc, randomCell.X, randomCell.Y);
                Services.GameService.Game.GameContext.Units.Add(u);
            }
            Services.GameService.Game.GameContext.SaveChanges();
        }
    }
}
