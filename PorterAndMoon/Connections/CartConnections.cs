using Dapper;
using Microsoft.Extensions.Options;
using PorterAndMoon.Models.Cart;
using PorterAndMoon.Models.Order;
using PorterAndMoon.Models.OrderProduct;
using PorterAndMoon.Validation;
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
                var cart = GetCartId(connection, newOrderProduct.UserId);

                var queryString = @"Insert into OrderProduct(ProductId, OrderId, Quantity)
                                        Output inserted.* 
                                        Values(@ProductId, @OrderId, @Quantity)";
                var parameters = new
                {
                    ProductId = newOrderProduct.ProductId,
                    OrderId = cart.Id,
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

        public Order GetCartId(SqlConnection connection, int userId)
        {
            var queryString = @"SELECT o.*
                                FROM [Order] as o
                                WHERE (o.isCompleted = 0) and (o.customerId = @UserId) ";
            var parameters = new { UserId = userId };

            var currentCart = connection.QueryFirstOrDefault<Order>(queryString, parameters);

            if (currentCart != null)
            {
                return currentCart;
            }
            else
            {
                var newCart = AddOrderForCart(connection, userId);
                return newCart;
            }
        }

        public Order AddOrderForCart(SqlConnection connection, int userId)
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
            throw new Exception("Trouble creating cart for user");
        }

        public object ViewCart(int userId)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var queryString = @"SELECT o.*
                                FROM [Order] as o
                                WHERE (o.isCompleted = 0) and (o.customerId = @UserId) ";
                var parameters = new { UserId = userId };
                var currentCart = connection.QueryFirstOrDefault<Cart>(queryString, parameters);


                if (currentCart != null)
                {
                    currentCart.ItemsInCart = GetPendingProducts(connection, currentCart.Id);
                    return currentCart;
                }
                else
                {
                    var newCart = AddOrderForCart(connection, userId);
                    return newCart.Id;
                }
            }
        }

        public List<ItemDetail> GetPendingProducts(SqlConnection connection, int orderId)
        {
            var queryString = @"SELECT op.quantity, p.type, p.Id, p.remainingQty, p.arrival,
                                    p.departure, p.destination, p.origin, p.title, p.description
                                FROM OrderProduct as op
	                                join Product as p on op.productId = p.Id
                                WHERE orderId = @OrderId";
            var parameters = new { OrderId = orderId };

            var pendingProducts = connection.Query<ItemDetail>(queryString, parameters);


            if (pendingProducts != null)
            {
                foreach (var product in pendingProducts)
                {
                    product.IsAvailable = new CheckSystem().VerifyDate(product.Departure);
                }
                return pendingProducts.ToList();
            }
            throw new Exception("Trouble getting user's cart products");
        }

        /*public object RemoveCartItem(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var queryString = @"SELECT op.quantity, p.type, p.Id, p.remainingQty, p.arrival,
                                        p.departure, p.destination, p.origin, p.title, p.description
                                    FROM OrderProduct as op
	                                    join Product as p on op.productId = p.Id
                                    WHERE Id = @OrderProductId";
                var parameters = new { OrderProductId = id };

                var deletedItem = connection.QueryFirstOrDefault<ItemDetail>(queryString, parameters);

            }
        }*/
    }
}
