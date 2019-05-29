using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PorterAndMoon.Models.OrderProduct;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Connections
{
    public class OrderProductConnections
    {
        readonly string ConnectionString;

        public OrderProductConnections(IOptions<DbConfiguration> dbConfig)
        {
            ConnectionString = dbConfig.Value.ConnectionString;
        }

        public List<OrderProduct> GetAllOrderProduct()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From orderProduct";
                var products = connection.Query<OrderProduct>(queryString).ToList();
                return products;
            }
        }

        public OrderProduct GetSingleOrderProduct(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From orderProduct
                                    Where id = @id";
                var product = connection.QueryFirstOrDefault<OrderProduct>(queryString, new { id });
                return product;
            }
        }


    }
}
