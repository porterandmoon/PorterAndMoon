using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Models;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        [HttpGet]
        public List<Products> GetAllProducts()
        {
            var connection = new SqlConnection("Server = localhost; Database = PorterAndMoon; Trusted_Connection = True;");
            connection.Open();

            var getAllProductsCommand = connection.CreateCommand();
            getAllProductsCommand.CommandText = "SELECT * FROM product";

            var reader = getAllProductsCommand.ExecuteReader();
            var productsList = new List<Products>();

            while (reader.Read())
            {
                var type = (int)reader["Type"];
                var description = reader["Description"].ToString();
                var quantity = (decimal)reader["Quantity"];
                var sellerId = (int)reader["SellerId"];
                var price = (decimal)reader["Price"];
                var title = reader["Title"].ToString();
                var product = new Products(type, description, quantity, sellerId, price, title);

                productsList.Add(product);
            }

            connection.Close();

            return productsList;
        }
    }
}