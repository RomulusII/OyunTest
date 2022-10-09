using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class CoordinateBase
    {
        public int X { get; set; }
        public int Y { get; set; }
    }

    public class Unit : CoordinateBase
    {
        [Key] 
        public int Id { get; set; }
        public double Pop { get; set; }
        public Chest? Chest { get; set; }
        public List<Profession> Professions { get; } = new List<Profession>();
        public UnitType UnitType { get; protected set; }
        public UnitJobs? UnitJobs { get; set; }

        public Player? Player { get; }

        public Unit()
        {
        }

        public Unit(Player player, int x, int y)
        {
            Player = player;
            X = x;
            Y = y;
            Chest = new Chest();
            UnitJobs = new UnitJobs();
        }

        public static Unit CreateFirstUnit(Player player, int x, int y)
        {
            return new Unit(player, x, y);
        }

        public override string ToString()
        {
            return $"unit: {Id} {UnitType}";
        }
    }
}
