using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Options;
using PorterAndMoon.Models.Order;

namespace PorterAndMoon.Connections
{
    public class OrderConnections
    {
        readonly string ConnectionString;

        public OrderConnections(IOptions<DbConfiguration> dbConfig)
        {
            ConnectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<OrderInfo> test(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"SELECT o.id, op.productId, op.id as [OPid], o.paymentId
                                    FROM [Order] as O
	                                    join OrderProduct as OP on OP.orderId = O.Id
                                    WHERE (O.customerId = @Id)
	                                    and (O.isCompleted = 1)";
                var parameters = new { UserId = id };



                var matchedOrders = connection.Query<OrderId>(queryString, parameters);

                if (matchedOrders != null)
                {
                    List<OrderInfo> finalOrders = new List<OrderInfo>();

                    var UserOrders = matchedOrders.GroupBy(order => order.Id);

                    foreach (var group in UserOrders)
                    {
                        var payid = group.ToList()[0].PaymentId;


                        var orderQuery = @"SELECT o.id, o.isRefunded, o.date, 
                                    pay.type as [paymentType], pay.cardNumber, pay.bankAccountNumber,
                                    pay.name as [CardHolderName], pay.payPalAuth as [paypalReference]
                                    FROM[Order] as O
                                        join Payment as pay on pay.id = o.paymentId
                                    WHERE(pay.id = @PayId)
                                    and (O.isCompleted = 1)";
                        var orderParameters = new { PayId = payid };

                        var orderInfo = connection.QueryFirstOrDefault<OrderInfo>(orderQuery, orderParameters);

                        foreach (var product in group)
                        {
                            var productQuery = @"
                            SELECT op.quantity as [quantityOrdered], p.description, p.price,
                                    p.title, pt.name as [type], c.username as [seller]
                            FROM OrderProduct as OP
                               join Product as P on OP.productId = P.Id
                               join productType as PT on P.type = PT.Id
                               join Customer as c on C.id = P.sellerId
                            WHERE(op.Id = @OrdProdId)";
                            var productParams = new { OrdProdId = product.OPid };

                            var productDetail = connection.QueryFirstOrDefault<OrderProductInfo>(productQuery, productParams);

                            if (productDetail != null)
                            {
                                orderInfo.ProductDetail.Add(productDetail);
                            }
                        }

                        finalOrders.Add(orderInfo);
                    }
                    return finalOrders;
                }
            }
            throw new Exception("Unable to find matched, completed orders");
        }


        public IEnumerable<Order> GetAllOrders()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From [Order]";
                var orders = connection.Query<Order>(queryString);
                return orders;
            }
        }

        public Order GetSingleOrder(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From [Order]
                                    Where Id = @Id";
                var order = connection.QueryFirstOrDefault<Order>(queryString, new { id });
                if (order != null)
                {
                    return order;
                }
                throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
            }
        }


        public Order AddOrder(Order newOrder)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                newOrder.Date = DateTime.Now;
                newOrder.IsRefunded = false;
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

        //public Order RemoveOrder(int id)
        //{
        //    using (var connection = new SqlConnection(ConnectionString))
        //    {
        //        var queryString = @"Delete 
        //                            From [Order]
        //                            Output deleted.*
        //                            Where Id = @Id";
        //        var order = connection.QueryFirstOrDefault<Order>(queryString, new { id });
        //        if (order != null)
        //        {
        //            return order;
        //        }
        //        throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        //    }
        //}

        public Order CompleteOrder(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update [Order]
                                    Set IsCompleted = 1
                                    Output inserted.*
                                    Where Id = @Id";
                var order = connection.QueryFirstOrDefault<Order>(queryString, new { id });
                if (order != null)
                {
                    return order;
                }
                throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
            }
        }
    }
}
