using System;
using System.Collections.Generic;
using System.Text;

namespace Model
{
    public enum UnitType
    {
        Nomad,
        Civilian,
        Soldier,
        Merchant,
        Animal,
    }
    public class Unit
    {
        public double Pop { get; set; }
        public Chest Chest { get; set; }
        public List<Profession> Professions { get; } = new List<Profession>();
        public UnitType UnitType { get; protected set; }
        public Coordinate Coordinate { get; set; } = default!;

        public UnitJobs UnitJobs { get; set; }

        public Player Player { get; }

        public Unit(Player player, Coordinate coordinate)
        {
            Player = player;
            Coordinate = coordinate;
        }

        public static Unit CreateFirstUnit(Player player, Coordinate coordinate)
        {
            return new Unit(player, coordinate);
        }
    }
}
