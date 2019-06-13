using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models.Cart;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        readonly CartConnections _connections;

        public CartController(CartConnections connections)
        {
            _connections = connections;
        }

        [HttpPost("cart")]
        public ActionResult FinalizeOrder(CartAdd Id)
        {
            var order = _connections.AddItemToCart(Id);
            return Accepted(order);
        }
    }
}