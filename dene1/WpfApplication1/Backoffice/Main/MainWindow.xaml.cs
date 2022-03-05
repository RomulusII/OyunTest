using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Xaml.Behaviors;

namespace Backoffice.Main
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void image_MouseMove(object sender, MouseEventArgs e)
        {
            var pos = e.GetPosition(image);

            var imgSrc = (BitmapSource)image.Source;
            var pixels = BitmapSourceHelper.GetPixels(imgSrc);

            var renk = pixels[(int)pos.X, (int)pos.Y];
            lblKoordinat.Content = $"{(int)pos.X}, {(int)pos.Y} \n R: {renk.Red} B:{renk.Blue} G:{renk.Green} A:{renk.Alpha} \n{((int)renk.Alpha).ToHex()}{((int)renk.Red).ToHex()}{((int)renk.Blue).ToHex()}{((int)renk.Green).ToHex()}";

            cursorRenk.Fill = new SolidColorBrush(System.Windows.Media.Color.FromArgb(renk.Alpha, renk.Red, renk.Green, renk.Blue));
        }
    }
}
