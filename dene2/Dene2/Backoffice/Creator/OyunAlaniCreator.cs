using Backoffice.Creator;
using GameCore.Services;

namespace Backoffice
{
    public class OyunAlaniCreator
    {
        public HaritaCreator HaritaCreator = new HaritaCreator(GameService.Game.Harita);
    }
}
