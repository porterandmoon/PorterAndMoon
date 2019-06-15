using Microsoft.Extensions.Options;
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

        public IEnumerable<Products> GetAllProducts()
        {
            var connection = new SqlConnection(ConnectionString);
            var queryString = @"Select *
                                    From [Product]";
            var products = connection.Query<Products>(queryString).ToList();
            return products;
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

        public Products AddNewProduct(NewProduct newProduct)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                newProduct.TimePosted = DateTime.Now;
                var queryString = @"Insert into Product(Type, Description, Quantity, SellerId, Price, Title, TimePosted)
                                        Output inserted.* 
                                        Values(@Type, @Description, @Quantity, @SellerId, @Price, @Title, @TimePosted)";
                var product = connection.QueryFirstOrDefault<Products>(queryString, newProduct);
                if (product != null)
                {
                    return product;
                }
                throw new Exception("Can't add a new product");
            }
        }

        public Products DeleteProduct(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Delete From Product Output Deleted.* Where Id = @id";
                var deletedProduct = connection.QueryFirstOrDefault<Products>(queryString, new { id });
                if (deletedProduct != null)
                {
                    return deletedProduct;
                }
                throw new Exception("Can't delete that product");
            }
        }

        public ProductQuantity UpdateQuantity(ProductQuantity updatedQuantity)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update Product
                                    Set quantity = @quantity
                                    output inserted.*
                                    Where id = @id";
                var updatedProduct = connection.QueryFirstOrDefault<ProductQuantity>(queryString, new { quantity = updatedQuantity.Quantity, id = updatedQuantity.Id });
                return updatedProduct;
            }

            throw new Exception("Could not update product quantity");
        }

        public Dictionary<string, List<Products>> GetRocketsOfType(int type)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From product
                                    Join customer on sellerId = customer.id
                                    Where type = @type";
                var rockets = connection.Query<Products>(queryString, new { type });
                var sortedRockets = rockets.GroupBy(rocket => rocket.Destination);                

                return sortedRockets.ToDictionary(x => x.Key,x => x.ToList());
            }
            throw new Exception("Could not get products.");
        }

        public IEnumerable<Products> GetFreightRocketsOfDestination(string destination)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From product
                                    Join customer on sellerId = customer.id
                                    Where destination = @destination AND type = 1";
                var rockets = connection.Query<Products>(queryString, new { destination });

                return rockets;
            }
            throw new Exception("Could not get rockets");
        }

        public IEnumerable<Products> GetPassengerRocketsOfDestination(string destination)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From product
                                    Join customer on sellerId = customer.id
                                    Where destination = @destination AND type = 2";
                var rockets = connection.Query<Products>(queryString, new { destination });

                return rockets;
            }
            throw new Exception("Could not get rockets");
        }

        public Dictionary<string, List<Products>> GetMostRecentRockets()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select top(20) *
                                    From product
                                    Join customer on sellerId = customer.id
                                    Order by timePosted desc";
                var rockets = connection.Query<Products>(queryString);
                var sortedRockets = rockets.GroupBy(rocket => rocket.Destination);

                return sortedRockets.ToDictionary(x => x.Key, x => x.ToList());
            }
            throw new Exception("Could not get rockets");
        }

        public IEnumerable<Products> GetSellerRockets(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From product
                                    Where sellerId = @id";
                var rockets = connection.Query<Products>(queryString, new { id });
                return rockets;
            }
            throw new Exception("Could not find rockets");
        }

        public Products AddRocket(Products newRocket)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                newRocket.RemainingQty = newRocket.Quantity;
                newRocket.TimePosted = DateTime.Now;
                var sellerId = newRocket.SellerId;
                var rando = new Random();
                var title = rando.Next(1000, 10000);
                var currentTime = DateTime.Now;
                var initQueryString = @"Select Title
                                        From Product
                                        Where SellerId = @SellerId AND Departure > @CurrentTime";
                var flightStrings = connection.Query<string>(initQueryString, new { sellerId, currentTime });
                var flightNums = flightStrings.Select(flightNum => Int32.Parse(flightNum)).ToList();
                newRocket.Title = titleChecker(title, flightNums).ToString();
                var queryString = @"Insert into Product(Type, Description, Quantity, SellerId, Price, RemainingQty,
                                        Title, TimePosted, Destination, Origin, Departure, Arrival)
                                    Output inserted.* 
                                    Values(@Type, @Description, @Quantity, @SellerId, @Price, @RemainingQty,
                                        @Title, @TimePosted, @Destination, @Origin, @Departure, @Arrival)"; ;
                var rocket = connection.QueryFirstOrDefault<Products>(queryString, newRocket);
                if (rocket != null)
                {
                    return rocket;
                }
            }
            throw new Exception("Could not add rocket");
        }

        private int titleChecker(int title, List<int> flightNums)
        {
            if (flightNums.Contains(title))
            {
                var rando = new Random();
                var newTitle = rando.Next(1000, 10000);
                return titleChecker(newTitle, flightNums);
            } else
            {
                return title;
            }
        }
    }
}
