using GameCore.Map.Alan;
using Model;

namespace GameCore.Topluluklar
{
    public class Topluluk
    {
        public ToplulukTipleri Tip { get; protected set; }
        public Koordinat Koordinat { get; set; } = default!;

        public Torba Torba { get; } = new Torba();

    }
}
