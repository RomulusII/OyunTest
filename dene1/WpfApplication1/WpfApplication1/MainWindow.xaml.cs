using System;
using System.Diagnostics;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Windows;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using WpfApplication1.Alan;
using Color = System.Drawing.Color;
using PixelFormat = System.Drawing.Imaging.PixelFormat;
using Point = System.Drawing.Point;

namespace WpfApplication1
{
    public static class BitmapSourceHelper
    {
        public static string ToHex(this int value, int minDigit = 2)
        {
            var hex = $"{value:X}";
            var rslt = $"{new string('0', minDigit)}{hex}";
            return rslt.Substring(rslt.Length - minDigit);
        }

#if UNSAFE
  public unsafe static void CopyPixels2(this BitmapSource source, PixelColor[,] pixels, int stride, int offset)
  {
    fixed(PixelColor* buffer = &pixels[0, 0])
      source.CopyPixels(
        new Int32Rect(0, 0, source.PixelWidth, source.PixelHeight),
        (IntPtr)(buffer + offset),
        pixels.GetLength(0) * pixels.GetLength(1) * sizeof(PixelColor),
        stride);
  }
#else
        public static void CopyPixels2(this BitmapSource source, MainWindow.PixelColor[,] pixels, int stride, int offset)
        {
            var height = source.PixelHeight;
            var width = source.PixelWidth;
            var pixelBytes = new byte[height * width * 4];
            source.CopyPixels(pixelBytes, stride, 0);
            int y0 = offset / width;
            int x0 = offset - width * y0;
            for (int y = 0; y < height; y++)
                for (int x = 0; x < width; x++)
                    pixels[x + x0, y + y0] = new MainWindow.PixelColor
                    {
                        Blue = pixelBytes[(y * width + x) * 4 + 0],
                        Green = pixelBytes[(y * width + x) * 4 + 1],
                        Red = pixelBytes[(y * width + x) * 4 + 2],
                        Alpha = pixelBytes[(y * width + x) * 4 + 3],
                    };
        }
#endif
    }

    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        [StructLayout(LayoutKind.Sequential)]
        public struct PixelColor
        {
            public byte Blue;
            public byte Green;
            public byte Red;
            public byte Alpha;
        }

        public PixelColor[,] GetPixels(BitmapSource source)
        {
            if (source.Format != PixelFormats.Bgra32)
                source = new FormatConvertedBitmap(source, PixelFormats.Bgra32, null, 0);

            int width = source.PixelWidth;
            int height = source.PixelHeight;
            PixelColor[,] result = new PixelColor[width, height];

            source.CopyPixels2(result, width * 4, 0);
            return result;
        }

        public MainWindow()
        {
            InitializeComponent();

            var m = hedef.Margin;


            m.Left = image.Margin.Left - hedef.Width / 2;
            m.Top = image.Margin.Top - hedef.Height / 2;

            hedef.Margin = m;
        }

        private void button_Click(object sender, RoutedEventArgs e)
        {
            var o = new OyunAlani();
            image.Source = ToBitmapImage(OyunAlani.Harita.ZeminHarita);
        }

        public static BitmapImage ToBitmapImage(Bitmap bitmap)
        {
            using (var memory = new MemoryStream())
            {
                bitmap.Save(memory, ImageFormat.Png);
                memory.Position = 0;

                var bitmapImage = new BitmapImage();
                bitmapImage.BeginInit();
                bitmapImage.StreamSource = memory;
                bitmapImage.CacheOption = BitmapCacheOption.OnLoad;
                bitmapImage.EndInit();

                return bitmapImage;
            }
        }

        private void btnDagTepe_Click(object sender, RoutedEventArgs e)
        {
            image.Source = ToBitmapImage(OyunAlani.Harita.DagHarita);
        }

        private void btnOrman_Click(object sender, RoutedEventArgs e)
        {
            image.Source = ToBitmapImage(OyunAlani.Harita.OrmanHarita);
        }

        private void btnNehir_Click(object sender, RoutedEventArgs e)
        {
            image.Source = ToBitmapImage(OyunAlani.Harita.NehirHarita);
        }

        private void button_Click_1(object sender, RoutedEventArgs e)
        {
            var handler = new TanimsizRenkHandler(OnTanimsizRenk);
            OyunAlani.Harita.OnTanimsizRenk += handler;
            OyunAlani.Harita.InitHucreler();
            OyunAlani.Harita.OnTanimsizRenk -= handler;

        }

        private void OnTanimsizRenk(int x, int y, HaritaHucresi hucre)
        {
            textBlock.Text = $"OnTanimsizRenk {x}, {y} {hucre.HucreDetay.TanimsizInfo}";
            var renk = hucre.HucreDetay.TanimsizRenk;
            renkGosterge.Fill = new SolidColorBrush(System.Windows.Media.Color.FromArgb(renk.A, renk.R, renk.G, renk.B));
            Debug.Print($"OnTanimsizRenk {x}, {y} {hucre.HucreDetay.TanimsizInfo}");

            var m = hedef.Margin;

            
            m.Left = scrollView.Margin.Left + image.Margin.Left + x - hedef.Width/2;
            m.Top = scrollView.Margin.Top + image.Margin.Top + y - hedef.Height / 2;

            hedef.Margin = m;
        }

        private void image_MouseMove(object sender, MouseEventArgs e)
        {
            var pos = e.GetPosition(image);

            var imgSrc = (BitmapSource) image.Source;
            var pixels = GetPixels(imgSrc);


            //using (var img = GetBitmap(imgSrc))
            //{
                var renk = pixels[(int)pos.X, (int)pos.Y];
                lblKoordinat.Content = $"{(int)pos.X}, {(int)pos.Y} \n R: {renk.Red} B:{renk.Blue} G:{renk.Green} A:{renk.Alpha} \n{((int)renk.Alpha).ToHex()}{((int)renk.Red).ToHex()}{((int)renk.Blue).ToHex()}{((int)renk.Green).ToHex()}";

                cursorRenk.Fill = new SolidColorBrush(System.Windows.Media.Color.FromArgb(renk.Alpha, renk.Red, renk.Green, renk.Blue));

            //}
        }

        Bitmap GetBitmap(BitmapSource source)
        {
            Bitmap bmp = new Bitmap(
              source.PixelWidth,
              source.PixelHeight,
              //System.Windows.Media.
              PixelFormat.Format32bppPArgb);
            BitmapData data = bmp.LockBits(
              new Rectangle(Point.Empty, bmp.Size),
              ImageLockMode.WriteOnly,
              PixelFormat.Format32bppPArgb);
            source.CopyPixels(
              Int32Rect.Empty,
              data.Scan0,
              data.Height * data.Stride,
              data.Stride);
            bmp.UnlockBits(data);
            return bmp;
        }

        //public static System.Drawing.Bitmap BitmapSourceToBitmap2(BitmapSource srs)
        //{
        //    int width = srs.PixelWidth;
        //    int height = srs.PixelHeight;
        //    int stride = width * ((srs.Format.BitsPerPixel + 7) / 8);
        //    IntPtr ptr = IntPtr.Zero;
        //    try
        //    {
        //        ptr = Marshal.AllocHGlobal(height * stride);
        //        srs.CopyPixels(new Int32Rect(0, 0, width, height), ptr, height * stride, stride);
        //        using (var btm = new System.Drawing.Bitmap(width, height, stride, System.Drawing.Imaging.PixelFormat.Format1bppIndexed, ptr))
        //        {
        //            // Clone the bitmap so that we can dispose it and
        //            // release the unmanaged memory at ptr
        //            return new System.Drawing.Bitmap(btm);
        //        }
        //    }
        //    finally
        //    {
        //        if (ptr != IntPtr.Zero)
        //            Marshal.FreeHGlobal(ptr);
        //    }
        //}
    }
}
