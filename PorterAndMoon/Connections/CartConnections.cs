using Dapper;
using Microsoft.Extensions.Options;
using PorterAndMoon.Models.Cart;
using PorterAndMoon.Models.Order;
using PorterAndMoon.Models.OrderProduct;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Connections
{
    public class CartConnections
    {
        readonly string _connectionString;
        public CartConnections(IOptions<DbConfiguration> dbConfig)
        {
            // builds ConnectionString from appsettings.json
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public OrderProduct AddItemToCart(CartAdd newOrderProduct)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var cartId = GetCartId(connection, newOrderProduct.UserId);

                var queryString = @"Insert into OrderProduct(ProductId, OrderId, Quantity)
                                        Output inserted.* 
                                        Values(@ProductId, @OrderId, @Quantity)";
                var parameters = new
                {
                    ProductId = newOrderProduct.ProductId,
                    OrderId = cartId,
                    Quantity = newOrderProduct.OrderQuantity
                };

                var product = connection.QueryFirstOrDefault<OrderProduct>(queryString, parameters);
                if (product != null)
                {
                    return product;
                }
            }
            throw new Exception("Can't add a new order product");
        }

        public int GetCartId(SqlConnection connection, int userId)
        {
            var queryString = @"SELECT o.ID
                                FROM [Order] as o
                                WHERE (o.isCompleted = 0) and (o.customerId = @UserId) ";
            var parameters = new { UserId = userId };

            var currentCart = connection.QueryFirstOrDefault<OrderId>(queryString, parameters);

            if (currentCart != null)
            {
                return currentCart.Id;
            }
            else
            {
                var newCart = AddOrder(connection, userId);
                return newCart.Id;
            }
        }

        public Order AddOrder(SqlConnection connection, int userId)
        {
            NewOrder newOrder = new NewOrder() { CustomerId = userId };

            var queryString = @"Insert into [Order] (CustomerId, PaymentId, Date, IsRefunded, IsCompleted)
                                Output inserted.*
                                Values (@CustomerId, @PaymentId, @Date, @IsRefunded, @IsCompleted)";
            var order = connection.QueryFirstOrDefault<Order>(queryString, newOrder);
            if (order != null)
            {
                return order;
            }
            throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }
    }
}
