using GameCore.Map;
using GameCore.Services;
using Microsoft.AspNetCore.Mvc;

namespace OyunApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OyunController : ControllerBase
    {

        private readonly ILogger<OyunController> _logger;

        public OyunController(ILogger<OyunController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "Oyun")]
        public ActionResult<MapCell> Get(int x, int y)
        {
            try
            {
                var cell = GameService.Game.Harita.Hucreler[x, y];
                return Ok(cell);

            }
            catch(IndexOutOfRangeException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw;
            }        
        }
    }
}