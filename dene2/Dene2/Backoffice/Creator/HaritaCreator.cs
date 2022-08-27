using GameCore.Map.Alan;
using Model;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using System.Windows.Media.Imaging;

namespace Backoffice.Creator
{
    public delegate void TanimsizRenkHandler(int x, int y, HaritaHucresi hucre);

    public class HaritaCreator
    {
        public event TanimsizRenkHandler OnTanimsizRenk;

        private const string ZeminHaritaPng = "Haritalar\\avrasya-arazi.fw.bmp";
        private const string OrmanHaritaPng = "Haritalar\\avrasya orman.fw.bmp";
        private const string DagTepeHaritaPng = "Haritalar\\avrasya.yukseklik.fw.bmp";
        private const string NehirHaritaPng = "Haritalar\\avrasya-nehir.fw.bmp";

        public Bitmap ZeminHarita { get; }
        public Bitmap OrmanHarita { get; }
        public Bitmap DagHarita { get; }
        public Bitmap NehirHarita { get; }

        private Harita Harita { get; }

        public HaritaCreator(Harita harita)
        {
            Harita = harita ?? throw new System.ArgumentNullException(nameof(harita));
            ZeminHarita = new Bitmap(ZeminHaritaPng);
            OrmanHarita = new Bitmap(OrmanHaritaPng);
            DagHarita = new Bitmap(DagTepeHaritaPng);
            NehirHarita = new Bitmap(NehirHaritaPng);
        }

        public async Task InitHucrelerAsync()
        {
            Harita.Hucreler = new HaritaHucresi[ZeminHarita.Width, ZeminHarita.Height];
            Harita.MaxX = ZeminHarita.Width;
            Harita.MaxY = ZeminHarita.Height;

            int adet = 0;
            int threadSize = 50;
            int threadCount = ZeminHarita.Height / threadSize;
            int threadIndex;
            int endY;
            int startY = 0;
            for (threadIndex = 0; threadIndex <= threadCount; threadIndex++)
            {
                endY = (threadIndex + 1) * threadSize;
                if (endY > ZeminHarita.Height) endY = ZeminHarita.Height;
                adet += await Task.Run(() => InitHucrelerThread(startY, endY, GetHarita()));
                startY = endY;
            }

            Debug.WriteLine($"adet: {adet}");
        }

        private Harita GetHarita()
        {
            return Harita;
        }

        private int InitHucrelerThread(int startY, int endY, Harita harita)
        {
            var adet = 0;
            for (var y = startY; y < endY; y++)
            {
                for (var x = 0; x < Harita.MaxX; x++)
                {
                    var haritaPixel = ZeminHarita.GetPixel(x, y);
                    var yuksekPixel = DagHarita.GetPixel(x, y);
                    var ormanPixel = OrmanHarita.GetPixel(x, y);
                    var nehirPixel = NehirHarita.GetPixel(x, y);
                    var hucre = new HaritaHucresi(x, y, haritaPixel, yuksekPixel, ormanPixel, nehirPixel);
                    harita.Hucreler[x, y] = hucre;
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
        public static Bitmap BitmapImage2Bitmap(BitmapImage bitmapImage)
        {
            // BitmapImage bitmapImage = new BitmapImage(new Uri("../Images/test.png", UriKind.Relative));

            using (MemoryStream outStream = new())
            {
                BitmapEncoder enc = new BmpBitmapEncoder();
                enc.Frames.Add(BitmapFrame.Create(bitmapImage));
                enc.Save(outStream);
                var bitmap = new Bitmap(outStream);

                return new Bitmap(bitmap);
            }
        }
    }
}