using Backoffice.Creator;
using GameCore;
using GameCore.Services;
using System.Drawing;
using System.IO;
using System.Windows.Media.Imaging;

namespace Backoffice
{
    public class OyunAlaniCreator
    {
        public HaritaCreator HaritaCreator = new HaritaCreator(GameService.Game.Harita);
    }
}
