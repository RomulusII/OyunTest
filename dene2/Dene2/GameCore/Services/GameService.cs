using Data;
using GameCore.Map;
using GameCore.Mechanics;
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
        //public Dictionary<int, Player> AllPlayers { get; } = new Dictionary<int, Player>();
        //public Dictionary<int, Unit> AllUnits { get; } = new Dictionary<int, Unit>();

        public GameContext GameContext;
        public Harita Harita { get; } = new();
        public GameEngine GameEngine { get; } = new GameEngine();

        public Game()
        {
            GameContext = new GameContext();                 
        }
    }

    public class PlayerService
    {
        public Player? GetPlayer(int userId)
        {
            return GameService.Game.GameContext.Players.Where(p=>p.Id == userId).FirstOrDefault();
        }

    }
}
