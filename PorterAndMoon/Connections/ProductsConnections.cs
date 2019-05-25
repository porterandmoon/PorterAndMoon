﻿using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PorterAndMoon.Models;

namespace PorterAndMoon.Connections
{
    public class ProductsConnections
    {
        readonly string ConnectionString;

        public ProductsConnections(IOptions<DbConfiguration> dbConfig)
        {
            ConnectionString = dbConfig.Value.ConnectionString;
        }

        public List<ProductsConnections> GetAllProducts()
        {
            var connection = new SqlConnection(ConnectionString);
            var queryString = @"Select *
                                    From [Product]";
            var products = connection.Query<ProductsConnections>(queryString).ToList();

            if (products != null)
            {
                return products;
            }

            throw new Exception("error getting all products list");
        }

        public Products GetSingleProduct(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From [Product]
                                    Where Id = @Id";
                var product = connection.QueryFirstOrDefault<Products>(queryString, new { id });
                if (product != null)
                {
                    return product;
                }
                throw new Exception("Error getting single product");
            }
        }

        public Products AddNewProduct(Products newProduct)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {

                var queryString = @"Insert into Product(Type, Description, Quantity, SellerId, Price, Title)
                                        Output inserted.* 
                                        Values(@Type, @Description, @Quantity, @SellerId, @Price, @Title)";
                var product = connection.QueryFirstOrDefault<Products>(queryString, newProduct);
                if (product != null)
                {
                    return product;
                }
                throw new Exception("Can't add a new product");
            }
        }
    }
}
