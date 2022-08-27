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

        //public List<Unit> Units { get; set; }
        public GameEngine()
        {
        }

        public void MoveNpcs()
        {
            foreach(Unit u in Services.GameService.Game.GameContext.Units)
            {
                
            }
        }
    }
}
