﻿using System;
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

        [HttpPost]
        public Products AddNewProduct(Products newProduct)
        {
            using (var connection = new SqlConnection("Server = localhost; Database = PorterAndMoon; Trusted_Connection = True;"))
            {
                connection.Open();
                var addProductCommand = connection.CreateCommand();
                addProductCommand.CommandText = @"Insert into Product(Type, Description, Quantity, SellerId, Price, Title)
                                        Output inserted.* 
                                        Values(@Type, @Description, @Quantity, @SellerId, @Price, @Title)";
                addProductCommand.Parameters.AddWithValue("Type", newProduct.Type);
                addProductCommand.Parameters.AddWithValue("Description", newProduct.Description);
                addProductCommand.Parameters.AddWithValue("Quantity", newProduct.Quantity);
                addProductCommand.Parameters.AddWithValue("SellerId", newProduct.SellerId);
                addProductCommand.Parameters.AddWithValue("Price", newProduct.Price);
                addProductCommand.Parameters.AddWithValue("Title", newProduct.Title);

                var reader = addProductCommand.ExecuteReader();
                if (reader.Read())
                {
                    var addType = (int)reader["Type"];
                    var addDescription = reader["Description"].ToString();
                    var addQuantity = (decimal)reader["Quantity"];
                    var addSellerId = (int)reader["SellerId"];
                    var addPrice = (decimal)reader["Price"];
                    var addTitle = reader["Title"].ToString();

                    var addedProduct = new Products(addType, addDescription, addQuantity, addSellerId, addPrice, addTitle);
                    return addedProduct;
                }
                throw new Exception("Not a valid product");
            }
        }
    }
}