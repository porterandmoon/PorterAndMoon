using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models.Order;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        readonly OrderConnections _connections;

        public OrderController(OrderConnections connections)
        {
            _connections = connections;
        }

        [HttpGet("All")]
        public ActionResult GetAllOrders()
        {
            var orders = _connections.GetAllOrders();
            return Accepted(orders);
        }

        [HttpGet]
        public ActionResult GetOrder(int Id)
        {
            var order = _connections.GetSingleOrder(Id);
            return Accepted(order);
        }

        [HttpGet("my-orders")]
        public ActionResult GetUserOrders(int userid)
        {
            var myOrders = _connections.PurchasedOrders(userid);

            return Ok(myOrders);
        }

        //[HttpDelete("{Id}")]
        //public ActionResult DeleteOrder(int Id)
        //{
        //    var order = _connections.RemoveOrder(Id);
        //    return Accepted(order);
        //}


        /*
        Pass the order into the body
        IsCompleted - bool,
        PaymentId - int,
        CustomerId - int
        */

        [HttpPut("paid/{Id}")]
        public ActionResult FinalizeOrder(int Id)
        {
            var order = _connections.CompleteOrder(Id);
            return Accepted(order);
        }
    }
}