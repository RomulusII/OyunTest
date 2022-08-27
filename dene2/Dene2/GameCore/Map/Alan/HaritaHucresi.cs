using Model;
using System.Drawing;

namespace GameCore.Map.Alan
{

    public class HaritaHucresi : CoordinateBase
    {
        public HucreDetay HucreDetay { get; }

        public HaritaHucresi(int x, int y, Color zemin, Color yukseklik, Color orman, Color nehir)
        {
            HucreDetay = new HucreDetay(x, y, zemin, yukseklik, orman, nehir);
            X = x;
            Y = y;
        }

        public override string ToString()
        {
            var zemin = HucreDetay.Arazi;
            var yukseklik = HucreDetay.Yukseklik;
            var nehir = HucreDetay.Nehir;
            var veg = HucreDetay.Vejetasyon;

            return $"Hucre ({X}, {Y}) {zemin}, {yukseklik}, {nehir}, {veg}";
        }
    }
}