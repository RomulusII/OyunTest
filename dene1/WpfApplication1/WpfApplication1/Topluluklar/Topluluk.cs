using WpfApplication1.Alan;
using WpfApplication1.Product;

namespace WpfApplication1.Topluluklar
{
    public class Topluluk
    {
        public ToplulukTipleri Tip { get; protected set; }
        public Koordinat Koordinat { get; set; }

        public Torba Torba { get; } = new Torba();

    }
}
