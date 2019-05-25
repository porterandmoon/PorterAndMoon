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

        [HttpGet("All")]
        public ActionResult GetAllProducts()
        {
            var productsList = _connections.GetAllProducts();
            return Accepted(productsList);
        }

        [HttpGet("{Id}")]
        public ActionResult GetSingleProduct(int Id)
        {
            var product = _connections.GetSingleProduct(Id);
            return Accepted(product);
        }


        //[HttpPost]
        //public Products AddNewProduct(Products newProduct)
        //{
        //    var product = _connections.AddNewProduct(newProduct);
        //    return Accepted(product);
        //}


        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var product = _connections.DeleteProduct(id);
            return Accepted(product);
        }

    }
    
}

