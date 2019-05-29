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

        public OrderProduct AddNewOrderProduct(NewOrderProduct newOrderProduct)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {

                var queryString = @"Insert into OrderProduct(ProductId, OrderId, Quantity)
                                        Output inserted.* 
                                        Values(@ProductId, @OrderId, @Quantity)";
                var product = connection.QueryFirstOrDefault<OrderProduct>(queryString, newOrderProduct);
                if (product != null)
                {
                    return product;
                }
                throw new Exception("Can't add a new order product");
            }
        }

        public OrderProduct DeleteOrderProduct(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Delete From OrderProduct Output Deleted.* Where Id = @id";
                var deletedOrderProduct = connection.QueryFirstOrDefault<OrderProduct>(queryString, new { id });
                if (deletedOrderProduct != null)
                {
                    return deletedOrderProduct;
                }
                throw new Exception("Can't delete that product");
            }
        }

        public UpdateOrderProductQuantity UpdateQuantity(UpdateOrderProductQuantity updatedOrderQuantity)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update OrderProduct
                                    Set quantity = @quantity
                                    output inserted.*
                                    Where id = @id";
                var updatedProduct = connection.QueryFirstOrDefault<UpdateOrderProductQuantity>(queryString, new { quantity = updatedOrderQuantity.Quantity, id = updatedOrderQuantity.Id });
                return updatedProduct;
            }

            throw new Exception("Could not update product quantity");
        }

    }
}
