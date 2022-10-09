using Microsoft.AspNetCore.Mvc;

namespace React.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class GameMapController : Controller
    {
        [HttpGet]
        public IEnumerable<int> Get()
        {
            var rslt = new List<int>();
            rslt.Add(1);
            rslt.Add(2);
            rslt.Add(3);
            rslt.Add(4);
            return rslt;
        }
    }
}
