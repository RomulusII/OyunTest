using GameCore.Communities;
using GameCore.Map.Alan;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameCore.Mechanics
{
    public class GameEngine
    {

        public List<Unit> Units { get; set; }
        public Harita Map { get; }

        public GameEngine(Harita map)
        {
            Units = new List<Unit>();
            Map = map;
        }

        public void SeedNpcs()
        {
            var npc = new Player();

            var rnd = new Random();
            for(int i = 0; i < 10000; i++)
            {
                Unit u = new Unit(npc, Map.GetRandomLandCell(rnd).Koordinat);
                Units.Add(u);
            }
        }

        public void MoveNpcs()
        {
            foreach(Unit u in Units)
            {
                
            }
        }
    }
}
