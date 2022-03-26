using Model;

namespace GameCore.Services
{

    public static class GameService
    {
        public static Game Game { get; } = new Game();

        static GameService()
        {
            
        }
    }

    public class Game
    {
        public Dictionary<int, Player> AllPlayers { get; } = new Dictionary<int, Player>();
        public Dictionary<int, Unit> AllUnits { get; } = new Dictionary<int, Unit>();

    }

    public class PlayerService
    {
        public Player GetPlayer(int userId)
        {
            return GameService.Game.AllPlayers[userId];
        }

    }
}
