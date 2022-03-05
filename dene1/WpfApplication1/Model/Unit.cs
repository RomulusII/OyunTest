using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public class Coordinate
    {
        public double X { get; set; }
        public double Y { get; set; }
    }

    public class Unit
    {
        public double Pop { get; set; }
        public Bag Bag { get; set; }
        public List<Profession> Professions { get; } = new List<Profession>();

        public Coordinate Coordinate { get; } = new Coordinate();

        public Player Player { get; }

        public Unit(Player player)
        {
            Player = player;
        }

        public static Unit CreateFirstUnit(Player player)
        {
            return new Unit(player);
        }
    }

  

    public class Player
    {
        string Name { get; set; }

    }

    public class UnitJobs
    {

    }
}
