using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using PorterAndMoon.Models;
using PorterAndMoon.Validation;

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

        public AvailableProduct GetSingleProduct(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From [Product]
                                    Where Id = @Id";
                var product = connection.QueryFirstOrDefault<AvailableProduct>(queryString, new { id });
                if (product != null)
                {
                    product.Available = new CheckSystem().VerifyDate(product.Departure);
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

        public IEnumerable<Products> SearchProducts(string input)
        {
            using (var db = new SqlConnection(ConnectionString))
            {
                string selectQuery = @"SELECT *
                                       FROM Product
                                       WHERE title
                                       LIKE '%' + @input + '%'";
                var parameters = new { input = input };

                var products = db.Query<Products>(selectQuery, parameters).ToList();

                if (products != null)
                {
                    return products;
                }
            }
            throw new Exception("Something went wrong searching the products");
        }

        //Gets a list of rockets of the selected type (freight or passenger) and groups them based on their destination
        public Dictionary<string, List<Products>> GetRocketsOfType(int type)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select p.arrival, p.departure, p.[description], p.destination, p.Id, p.origin, p.price, p.quantity, p.remainingQty,
	                                    p.sellerId, p.timePosted, p.title, p.[type], c.username
                                    From product as p
	                                Join customer as c on p. sellerId = c.id
                                    Where type = @type";
                var rockets = connection.Query<Products>(queryString, new { type });
                var sortedRockets = rockets.GroupBy(rocket => rocket.Destination);                

                return sortedRockets.ToDictionary(x => x.Key,x => x.ToList());
            }
            throw new Exception("Could not get products.");
        }

        //Gets a list of freight rockets with the selected destination
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

        //Gets a list of passenger rockets with the selected destination
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

        //Gets a list of the 20 most recently added rockets for sale and groups them by their destination
        public Dictionary<string, List<Products>> GetMostRecentRockets()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select top(20) p.arrival, p.departure, p.[description], p.destination, p.Id, p.origin, p.price, p.quantity, p.remainingQty,
	                                    p.sellerId, p.timePosted, p.title, p.[type], c.username
                                    From product as p
	                                    Join customer as c on p. sellerId = c.id
                                    Order by timePosted desc";
                var rockets = connection.Query<Products>(queryString);
                var sortedRockets = rockets.GroupBy(rocket => rocket.Destination);

                return sortedRockets.ToDictionary(x => x.Key, x => x.ToList());
            }
            throw new Exception("Could not get rockets");
        }

        //Gets a list of all rockets being sold by the selected seller.
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

        //Adds a new rocket to the database for the current user
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

                //Gets a list of flight numbers for rockets being sold by the current user
                var initQueryString = @"Select Title
                                        From Product
                                        Where SellerId = @SellerId AND Departure > @CurrentTime";
                var flightStrings = connection.Query<string>(initQueryString, new { sellerId, currentTime });
                var flightNums = flightStrings.Select(flightNum => Int32.Parse(flightNum)).ToList();

                //Creates a random 4 digit flight number then checks to see if it is already in use, repeats itself until a nonmatching number is generated.
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
