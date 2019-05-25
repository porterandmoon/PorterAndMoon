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
