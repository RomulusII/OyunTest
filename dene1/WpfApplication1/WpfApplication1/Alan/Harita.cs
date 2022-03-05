using System.Diagnostics;
using System.Drawing;

namespace WpfApplication1.Alan
{
    public class Harita
    {
        public event TanimsizRenkHandler OnTanimsizRenk;

        public readonly int MaxX;
        public readonly int MaxY;

        private const string ZeminHaritaPng = "Haritalar\\avrasya-arazi.fw.bmp";
        private const string OrmanHaritaPng = "Haritalar\\avrasya orman.fw.bmp";
        private const string DagTepeHaritaPng = "Haritalar\\avrasya.yukseklik.fw.bmp";
        private const string NehirHaritaPng = "Haritalar\\avrasya-nehir.fw.bmp";

        public Bitmap ZeminHarita { get; }
        public Bitmap OrmanHarita { get; }
        public Bitmap DagHarita { get; }
        public Bitmap NehirHarita { get; }

        public static HaritaHucresi[,] Hucreler;

        public Harita()
        {
            ZeminHarita = new Bitmap(ZeminHaritaPng);
            OrmanHarita = new Bitmap(OrmanHaritaPng);
            DagHarita = new Bitmap(DagTepeHaritaPng);
            NehirHarita = new Bitmap(NehirHaritaPng);

            MaxX = ZeminHarita.Width;
            MaxY = ZeminHarita.Height;
        }

        public void InitHucreler()
        {
            Hucreler = new HaritaHucresi[MaxX, MaxY];

            var adet = 0;

            for (var y = 0; y < MaxY; y++)
            {
                for (var x = 0; x < MaxX; x++)
                {
                    var haritaPixel = ZeminHarita.GetPixel(x, y);
                    var yuksekPixel = DagHarita.GetPixel(x, y);
                    var ormanPixel = OrmanHarita.GetPixel(x, y);
                    var nehirPixel = NehirHarita.GetPixel(x, y);
                    var hucre = new HaritaHucresi(new Koordinat(x, y), haritaPixel, yuksekPixel, ormanPixel, nehirPixel);
                    Hucreler[x, y] = hucre;
                    adet++;

                    if (hucre.HucreDetay.TanimsizInfo != string.Empty)
                    {
                        OnTanimsizRenk?.Invoke(x, y, hucre);
                        return;
                    }
                }
            }
            Debug.WriteLine($"adet: {adet}");
        }

    }
}