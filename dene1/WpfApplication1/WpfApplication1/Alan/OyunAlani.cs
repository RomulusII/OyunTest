using System.Drawing;
using System.IO;
using System.Windows.Media.Imaging;

namespace WpfApplication1.Alan
{
    public delegate void TanimsizRenkHandler(int x, int y, HaritaHucresi hucre);

    public class OyunAlani
    {
        public static Harita Harita = new Harita();

        public static Bitmap BitmapImage2Bitmap(BitmapImage bitmapImage)
        {
            // BitmapImage bitmapImage = new BitmapImage(new Uri("../Images/test.png", UriKind.Relative));

            using (MemoryStream outStream = new MemoryStream())
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
