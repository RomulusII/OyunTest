using System.Diagnostics;
using System.Drawing;
using System.Threading.Tasks;

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

        public async Task InitHucrelerAsync()
        {
            Hucreler = new HaritaHucresi[MaxX, MaxY];

            int adet = 0;
            int threadSize = 50;
            int threadCount = MaxY / threadSize;
            int threadIndex;
            int endY;
            int startY = 0;
            for (threadIndex = 0; threadIndex <= threadCount; threadIndex++)
            {
                endY = (threadIndex + 1) * threadSize;
                if (endY > MaxY) endY = MaxY;
                adet += await Task.Run(() => InitHucrelerThread(startY, endY));
                startY = endY;
            }

            Debug.WriteLine($"adet: {adet}");
        }

        private int InitHucrelerThread(int startY, int endY)
        {
            var adet = 0;
            for (var y = startY; y < endY; y++)
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
                        return adet;
                    }
                }
            }
            return adet;
        }

    }
}