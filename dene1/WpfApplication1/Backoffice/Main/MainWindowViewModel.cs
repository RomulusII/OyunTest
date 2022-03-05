using System.Text;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Windows;
using System.Diagnostics;
using System.Drawing;

using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Windows.Input;
using GameCore.Map;
using System.Threading.Tasks;

namespace Backoffice.Main
{
    public class MainWindowViewModel : NotifyPropertyChangedBase
    {
        public Ellipse Hedef { get; set; }

        private ImageSource imageSource;
        public ImageSource ImageSource 
        {
            get => imageSource; 
            set => SetField(ref imageSource, value); 
        }

        private string info;
        public string Info
        {
            get => info;
            set => SetField(ref info, value);
        }

        private System.Windows.Media.Brush colorDisplay; //0xFF3B3872
        public System.Windows.Media.Brush ColorDisplay
        {
            get => colorDisplay;
            set => SetField(ref colorDisplay, value);
        }

        public RelayCommand ShowMapCommand { get; set; }
        public RelayCommand InitMapFromBitmapsCommand { get; set; }
        public RelayCommand MapClickCommand { get; set; }

        public string MapName { get; set; } = "Test";

        private MapCreation.HaritaYaratici MapGenerator { get; set; }

        public MainWindowViewModel()
        {
            //var m = Hedef.Margin;

            //m.Left = Image.Margin.Left - Hedef.Width / 2;
            //m.Top = Image.Margin.Top - Hedef.Height / 2;

            //Hedef.Margin = m;
            GenerateMap();
            ShowMap(MapCreation.MapType.Soil);
            ShowMapCommand = new RelayCommand(ShowMap, param => true);
            InitMapFromBitmapsCommand = new RelayCommand(async (p) => await InitMapFromBitmaps(), param => true);
            MapClickCommand = new RelayCommand(MapClick, param => true);
            
            Info = "bir";


        }

        private void GenerateMap()
        {
            var oyun = new GameCore.Map.OyunAlani();
            MapGenerator = new MapCreation.HaritaYaratici(oyun.Harita);
        }

        private void OnTanimsizRenk(int x, int y, HaritaHucresi hucre)
        {
            Info = $"OnTanimsizRenk {x}, {y} {hucre.HucreDetay.TanimsizInfo}";
            var renk = hucre.HucreDetay.TanimsizRenk;
            ColorDisplay = new SolidColorBrush(System.Windows.Media.Color.FromArgb(renk.A, renk.R, renk.G, renk.B));
            Debug.Print($"OnTanimsizRenk {x}, {y} {hucre.HucreDetay.TanimsizInfo}");

            //var m = hedef.Margin;


            //m.Left = scrollView.Margin.Left + image.Margin.Left + x - hedef.Width / 2;
            //m.Top = scrollView.Margin.Top + image.Margin.Top + y - hedef.Height / 2;

            //hedef.Margin = m;
        }

        private void ShowMap(object obj)
        {
            var mapType = (MapCreation.MapType)obj;
            //ImageSource = ToBitmapImage(MapGenerator.GetMap(mapType));
            ImageSource = BitmapSourceHelper.Convert(MapGenerator.GetMap(mapType));

            Info = "showmap";
        }

        public static BitmapImage ToBitmapImage(Bitmap bitmap)
        {
            using (var memory = new MemoryStream())
            {
                bitmap.Save(memory, ImageFormat.Bmp);
                memory.Position = 0;

                var bitmapImage = new BitmapImage();
                bitmapImage.BeginInit();
                bitmapImage.StreamSource = memory;
                bitmapImage.CacheOption = BitmapCacheOption.OnLoad;
                bitmapImage.EndInit();

                return bitmapImage;
            }

        }

        public static BitmapSource BitmapToBitmapSource(Bitmap source)
        {
            return System.Windows.Interop.Imaging.CreateBitmapSourceFromHBitmap(
                          source.GetHbitmap(),
                          System.IntPtr.Zero,
                          Int32Rect.Empty,
                          BitmapSizeOptions.FromEmptyOptions());
        }
        private async Task InitMapFromBitmaps()
        {
            var handler = new MapCreation.HaritaYaratici.TanimsizRenkHandler(OnTanimsizRenk);
            MapGenerator.OnTanimsizRenk += handler;

            Info = "initmap";
            await Task.Run(()=> MapGenerator.InitHucreler());
            MapGenerator.OnTanimsizRenk -= handler;

        }

        private void MapClick(object obj)
        {
            var handler = new MapCreation.HaritaYaratici.TanimsizRenkHandler(OnTanimsizRenk);
            MapGenerator.OnTanimsizRenk += handler;

            Info = "initmap";
            //MapGenerator.InitHucreler();
            MapGenerator.OnTanimsizRenk -= handler;

        }
    }
}
