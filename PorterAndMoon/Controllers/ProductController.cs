using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        readonly ProductsConnections _connections;

        public ProductController(ProductsConnections connections)
        {
            _connections = connections;
        }

        // in URL localhost:#####/api/product/all
        [HttpGet("All")]
        public ActionResult GetAllProducts()
        {
            var productsList = _connections.GetAllProducts();
            return Accepted(productsList);
        }

        // in URL localhost:#####/api/product/{id}
        [HttpGet("{Id}")]
        public ActionResult GetSingleProduct(int Id)
        {
            var product = _connections.GetSingleProduct(Id);
            return Accepted(product);
        }

        /* in body
         * {
	        "Type" : "",
	        "Description" : "",
	        "Quantity" : "",
	        "SellerId" : "",
	        "Price" : "",
	        "Title" : ""
             }
         */
        [HttpPost]
        public ActionResult AddNewProduct(NewProduct newProduct)
        {
            var product = _connections.AddNewProduct(newProduct);
            return Accepted(product);
        }

        // pass id in body
        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var product = _connections.DeleteProduct(id);
            return Accepted(product);
        }

        // pass {"quantity": "", "id" : ""} in body

    [HttpPut]
        public ActionResult updateQuantity(ProductQuantity updatedProduct)
        {
            var product = _connections.UpdateQuantity(updatedProduct);
            return Accepted(product);
        }
    }
    
}

