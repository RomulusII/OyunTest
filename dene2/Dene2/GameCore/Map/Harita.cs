namespace GameCore.Map
{
    public class Harita
    {
        public int MaxX;
        public int MaxY;
        public MapCell[,]? Hucreler { get; set; }

        public MapCell GetRandomLandCell(Random rnd)
        {
            MapCell hucre;
            do
            {
                var x = rnd.Next(0, MaxX - 1);
                var y = rnd.Next(0, MaxY - 1);
                hucre = Hucreler[x, y];

            } while (!hucre.CanUseAsStartup(rnd));
            return hucre;
        }

    }
}
