using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductController : ControllerBase
    {
        readonly OrderProductConnections _connections;

        public OrderProductController(OrderProductConnections connections)
        {
            _connections = connections;
        }

        [HttpGet("All")]
        public ActionResult GetAllOrderProducts()
        {
            var orderProductsList = _connections.GetAllOrderProduct();
            return Accepted(orderProductsList);
        }

        [HttpGet("{Id}")]
        public ActionResult GetSingleOrderProduct(int Id)
        {
            var product = _connections.GetSingleOrderProduct(Id);
            return Accepted(product);
        }


        //[HttpPost]
        //public ActionResult AddNewOrderProduct(NewOrderProduct newOrderProduct)
        //{
        //    var product = _connections.AddNewOrderProduct(newOrderProduct);
        //    return Accepted(product);
        //}


        //[HttpDelete("{id}")]
        //public ActionResult DeleteOrderProduct(int id)
        //{
        //    var product = _connections.DeleteOrderProduct(id);
        //    return Accepted(product);
        //}

        //[HttpPut]
        //public ActionResult updateQuantity(OrderProductQuantity updatedOrderProduct)
        //{
        //    var product = _connections.UpdateProductQuantity(updatedOrderProduct);
        //    return Accepted(product);
        //}
    }
}
