﻿using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PorterAndMoon.Models.Dashboard;
using PorterAndMoon.Models;

namespace PorterAndMoon.Connections
{
    public class DashboardConnections
    {
        readonly string ConnectionString;

        public DashboardConnections(IOptions<DbConfiguration> dbConfig)
        {
            ConnectionString = dbConfig.Value.ConnectionString;
        }


        /* Gets a list of orders for the current month for products sold by the current user. 
        */
        public Dictionary<int, List<Sales>> GetMonthsSales(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select price, OrderProduct.quantity as purchasedQty, customerId, productId
                                    From Product
                                    Join OrderProduct on productId = Product.Id
                                    Join [Order] on orderId = [Order].Id
                                    Where sellerId = @Id AND DATEPART(M, [Order].date) = DATEPART(M, GETDATE())";
                var sales = connection.Query<Sales>(queryString, new { id });
                var groupedSales = sales.GroupBy(sale => sale.ProductId);
                return groupedSales.ToDictionary(x => x.Key, x => x.ToList()); 
            }
            throw new Exception("Could not get sales");
        }

        /* Gets a list of orders for products sold by the current user for whole lifetime. 
        */
        public Dictionary<int, List<Sales>> GetAllSales(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select price, OrderProduct.quantity as purchasedQty, customerId, productId
                                    From Product
                                    Join OrderProduct on productId = Product.Id
                                    Join [Order] on orderId = [Order].Id
                                    Where sellerId = @Id";
                var sales = connection.Query<Sales>(queryString, new { id });
                var groupedSales = sales.GroupBy(sale => sale.ProductId);
                return groupedSales.ToDictionary(x => x.Key, x => x.ToList());
            }
            throw new Exception("Could not get sales");
        }

        //Gets the total number of rockets being sold by the current user for analytic purposes.
        public int GetNumRockets(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select Count(*)
                                    From Product
                                    Where sellerId = @Id";
                var total = connection.QueryFirst<int>(queryString, new { id });
                return total;
            }
            throw new Exception("Could not get total");
        }

        //Gets the total number of rockets being sold by the current user in the current month for analytic purposes.
        public int GetNumRocketsMonth(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select Count(*)
                                    From Product
                                    Join OrderProduct on productId = Product.Id
                                    Join [Order] on orderId = [Order].Id
                                    Where sellerId = @Id AND DATEPART(M, [Order].date) = DATEPART(M, GETDATE())";
                var total = connection.QueryFirst<int>(queryString, new { id });
                return total;
            }
            throw new Exception("Could not get total");
        }

        //Gets a list of rockets sold or being sold by the current user and groups them based on their departure date.
        public Dictionary<DateTime, List<Products>> GetDepartures(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From Product
                                    Where sellerId = @Id";
                var departures = connection.Query<Products>(queryString, new { id });
                var datedDepartures = departures.GroupBy(rocket => rocket.Departure);

                return datedDepartures.ToDictionary(x => x.Key, x => x.ToList());
            }
            throw new Exception("Could not get departures");
        }

        //Gets a list of rockets sold or being sold by the current user and groups them based on their arrival date.
        public Dictionary<DateTime, List<Products>> GetArrivals(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From Product
                                    Where sellerId = @Id";
                var arrivals = connection.Query<Products>(queryString, new { id });
                var datedArrivals = arrivals.GroupBy(rocket => rocket.Arrival);

                return datedArrivals.ToDictionary(x => x.Key, x => x.ToList());
            }
            throw new Exception("Could not get arrivals");
        }
    }
}
