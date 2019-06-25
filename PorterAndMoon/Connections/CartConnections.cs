﻿using Dapper;
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

                var queryString = @"MERGE OrderProduct AS Target
                                    USING (SELECT @ProductId ProductId, @OrderId OrderId, @Quantity Quantity) AS Source
                                    ON Target.ProductId = Source.ProductId and Target.Orderid = Source.OrderId
                                    WHEN MATCHED THEN
                                       UPDATE SET 
                                           Target.Quantity = Target.Quantity + Source.Quantity
                                    WHEN NOT MATCHED THEN
                                       INSERT (ProductId, OrderId, Quantity)
                                       VALUES (Source.ProductId, Source.OrderId, Source.Quantity)
                                    OUTPUT inserted.*;";
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
            var queryString = @"SELECT o.Id
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

        /* This gets the order that isn't complete yet. If one isn't 
         * available, it creates one 
         */
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

        /* this gets a list of products that are attached to an
         * Order that is not settled yet 
         */
        public List<ItemDetail> GetPendingProducts(SqlConnection connection, int orderId)
        {
            var queryString = @"SELECT op.id as OrdProdId, op.quantity, p.type, p.Id, p.remainingQty, p.arrival,
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

        public OrderProduct RemoveCartItem(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var queryString = @"DELETE
                                    FROM OrderProduct
                                    OUTPUT deleted.*
                                    WHERE Id = @OrderProductId";
                var parameters = new { OrderProductId = id };

                var deletedItem = connection.QueryFirstOrDefault<OrderProduct>(queryString, parameters);

                if (deletedItem != null)
                {
                    return deletedItem;
                }
            }
            throw new Exception("Failure to delete item from cart");
        }

        public OrderProduct FinalizeOrder(int id)
        {
            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                var currentCart = GetCartId(connection, id);

                var productsUpdated = GetPendingProductsLite(connection, currentCart.Id);

                if (productsUpdated)
                {
                    var queryString = @"Update [Order]
                                        Set IsCompleted = 1
                                        Output inserted.*
                                        Where Id = @Id";
                    var parameters = new { Id = currentCart.Id };

                    var completedOrder = connection.QueryFirstOrDefault<OrderProduct>(queryString, parameters);

                    if (completedOrder != null)
                    {
                        return completedOrder;
                    }
                }
            }
            throw new Exception("Failure to complete Order");
        }

        public bool GetPendingProductsLite(SqlConnection connection, int cartId)
        {
            var validOrder = false;

            var queryString = @"SELECT p.Id, op.quantity as OrderQuantity, p.remainingQty,
                                    p.Quantity, p.departure 
                                FROM OrderProduct as op
	                                join Product as p on op.productId = p.Id
                                WHERE orderId = @OrderId";
            var parameters = new { OrderId = cartId };

            var pendingProducts = connection.Query<PendingOrder>(queryString, parameters);


            if (pendingProducts != null)
            {
                var validItems = validateItems(pendingProducts, validOrder);
                if (validItems)
                {
                    var updated = UpdateRemainingProductQty(connection, pendingProducts);
                    return updated;
                }
                return false;
            }
            throw new Exception("Trouble getting user's cart products");
        }

        public bool validateItems(IEnumerable<PendingOrder> pendingProducts, bool validOrder)
        {
            validOrder = true;
            foreach (var product in pendingProducts)
            {
                var validQuantity = (product.Quantity >= product.RemainingQty);
                var validOrderQuantity = (product.RemainingQty >= product.OrderQuantity);
                var hasntLeft = new CheckSystem().VerifyDate(product.Departure);

                if (!validOrderQuantity || !validQuantity || !hasntLeft)
                {
                    validOrder = false;
                    return validOrder;
                }
            }
            return validOrder;
        }


        public bool UpdateRemainingProductQty(SqlConnection connection, IEnumerable<PendingOrder> pendingProducts)
        {
            var updatesSuccessful = false;

            foreach (var product in pendingProducts)
            {
                var exeOrder = @"Update Product
                                 Set remainingQty = @NewRemQty
                                 Where Id = @Id";
                var exeParams = new
                {
                    NewRemQty = product.RemainingQty - product.OrderQuantity,
                    Id = product.Id
                };
                var response = connection.QueryFirstOrDefault<int>(exeOrder, exeParams);

                if (response != null)
                {
                    updatesSuccessful = true;
                }
                else
                {
                    updatesSuccessful = false;
                    return updatesSuccessful;
                }
            }
            return updatesSuccessful;
        }
    }
}