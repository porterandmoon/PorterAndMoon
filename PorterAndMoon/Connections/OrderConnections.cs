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

        public List<OrderInfo> GetUserOrders(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"SELECT o.id, o.isRefunded, o.date, op.quantity as [quantityOrdered],
					                p.description, p.price, p.title, pt.name as [type], c.username as [seller],
                                    pay.type as [paymentType], pay.cardNumber, pay.bankAccountNumber,
                                    pay.name as [CardHolderName], pay.payPalAuth as [paypalReference]
					                FROM [Order] as O
						               join OrderProduct as OP on OP.orderId = O.Id
						               join Product as P on OP.productId = P.Id
						               join productType as PT on P.type = PT.Id
						               join Customer as c on C.id = P.sellerId
						               join Payment as pay on pay.id = o.paymentId
					                WHERE (O.customerId = @UserId)
						               and (O.isCompleted = 1)";
                var parameters = new { UserId = id };

                var matchedOrders = connection.Query<OrderInfo>(queryString, parameters).ToList();

                if(matchedOrders != null)
                {
                    foreach (var order in matchedOrders)
                    {
                        if (order.CardNumber != null)
                        {
                            order.CardNumber = order.CardNumber.Remove(0, 12);

                            order.CardNumber = order.CardNumber.PadLeft(16, '*');
                        }
                        if(order.BankAccountNumber != null)
                        {
                            var hiddenValueLength = order.BankAccountNumber.Length - 3;

                            order.BankAccountNumber = order.BankAccountNumber.Remove(0, hiddenValueLength);

                            order.BankAccountNumber = order.BankAccountNumber.PadLeft(hiddenValueLength + 3, '*');

                        }
                    }
                    return matchedOrders;
                }
            }
            throw new Exception("Unable to find matched, completed orders");
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
