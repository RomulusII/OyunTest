using System.Drawing;

namespace GameCore.Map.Alan
{
    public class HaritaHucresi
    {
        public Koordinat Koordinat;
        public HucreDetay HucreDetay { get; }

        public HaritaHucresi(Koordinat koordinat, Color zemin, Color yukseklik, Color orman, Color nehir)
        {
            Koordinat = koordinat;
            HucreDetay = new HucreDetay(koordinat, zemin, yukseklik, orman, nehir);
        }

        public override string ToString()
        {
            var zemin = HucreDetay.Arazi;
            var yukseklik = HucreDetay.Yukseklik;
            var nehir = HucreDetay.Nehir;
            var veg = HucreDetay.Vejetasyon;

            return $"Hucre ({Koordinat.X}, {Koordinat.Y}) {zemin}, {yukseklik}, {nehir}, {veg}";
        }
    }
}