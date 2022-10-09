using GameCore.Map.Alan;
using GameCore.Services;
using Model;

namespace GameCore.Extensions
{
    public static class Extensions
    {
        public static HaritaHucresi? GetHucre(this Unit unit)
        {
            return GameService.Game?.Harita?.Hucreler?[unit.X, unit.Y];
        }
    }

}
