using System.Drawing;

namespace WpfApplication1.Alan
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
    }
}