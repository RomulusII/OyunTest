namespace GameCore.Map.Alan
{
    public class Harita
    {
        public int MaxX;
        public int MaxY;
        public HaritaHucresi[,]? Hucreler { get; set; }

        public HaritaHucresi GetRandomLandCell(Random rnd)
        {
            HaritaHucresi hucre;
            do
            {
                var x = rnd.Next(0, MaxX - 1);
                var y = rnd.Next(0, MaxY - 1);
                hucre = Hucreler[x, y];

            } while (!hucre.HucreDetay.CanUseAsStartup(rnd));
            return hucre;
        }

    }
}
