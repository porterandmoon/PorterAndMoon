using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models.OrderProduct;

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

        // in URL localhost:#####/api/OrderProduct/all
        [HttpGet("All")]
        public ActionResult GetAllOrderProducts()
        {
            var orderProductsList = _connections.GetAllOrderProduct();
            return Accepted(orderProductsList);
        }

        // in URL localhost:#####/api/OrderProduct/{id}
        [HttpGet("{Id}")]
        public ActionResult GetSingleOrderProduct(int Id)
        {
            var product = _connections.GetSingleOrderProduct(Id);
            return Accepted(product);
        }

        /* in body
         * {
	        "ProductId" : "",
	        "OrderId" : "",
	        "Quantity" : ""
             }
         */
        [HttpPost]
        public ActionResult AddNewOrderProduct(NewOrderProduct newOrderProduct)
        {
            var product = _connections.AddNewOrderProduct(newOrderProduct);
            return Accepted(product);
        }

        // pass id in body
        [HttpDelete("{id}")]
        public ActionResult DeleteOrderProduct(int id)
        {
            var product = _connections.DeleteOrderProduct(id);
            return Accepted(product);
        }

        // pass {"quantity": "", "id" : ""} in body
        [HttpPut]
        public ActionResult updateQuantity(UpdateOrderProductQuantity updatedOrderProduct)
        {
            var product = _connections.UpdateQuantity(updatedOrderProduct);
            return Accepted(product);
        }
    }
}
