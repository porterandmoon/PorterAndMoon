using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using PorterAndMoon.Models.Customer;
using PorterAndMoon.Interface;
using PorterAndMoon.Models.Order;

namespace PorterAndMoon.Connections
{
    public class CustomerRepo
    {
        readonly string _connectionString;
        public CustomerRepo(IOptions<DbConfiguration> dbConfig)
        {
            // builds ConnectionString from appsettings.json
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public ISingleCustomer GetUser(string uid)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"SELECT *
                                       FROM Customer
                                       WHERE uid = @uid";
                var parameters = new { uid = uid };

                var user = db.QuerySingleOrDefault<SingleCustomer>(selectQuery, parameters);

                if (user != null)
                {
                    return user;
                }
            }
            throw new Exception("We could not retreive that User from the database");
        }

        public List<CustomerLite> GetAllUsers()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"SELECT *
                                       FROM Customer";

                var users = db.Query<CustomerLite>(selectQuery).ToList();

                if(users != null)
                {
                    return users;
                }
            }
                throw new Exception("Something went wrong getting the users");
        }

        public ISingleCustomer RegisterCustomer(RegisterCustomer newCustomer)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var doesUNameExist = CheckIfUsernameExists(newCustomer.UserName);
                
                    var insertQuery = @"INSERT Into Customer (Username, FirstName, LastName, CreationDate, Uid)
                                        OUTPUT Inserted.*
                                        VALUES (@username, @firstname, @lastname, @creationDate, @uid)";
                    var parameters = new
                    {
                        username = newCustomer.UserName,
                        firstname = newCustomer.FirstName,
                        lastname = newCustomer.LastName,
                        uid = newCustomer.Uid,
                        creationDate = DateTime.Now
                    };

                    var createdUser = db.QuerySingle<SingleCustomer>(insertQuery, parameters);

                    return createdUser;
            }
            throw new Exception("We could not register you as a user");
        }

        public bool CheckIfUsernameExists(string username)
        {
            using (var db = new SqlConnection(_connectionString))
            {

                var selectQuery = @"SELECT Username
                                FROM Customer
                                Where Username = @username";
                var parameters = new { username = username };

                var usernameMatch = db.Query<string>(selectQuery, parameters);

                if (usernameMatch.Count() < 1)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }

        public CustomerUNameAndId PseudoDeleteUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var selectQuery = @"UPDATE Customer
                                    SET FirstName = '', LastName = ''
                                    OUTPUT inserted.Id, inserted.Username
                                    Where Id = @Id";
                var parameters = new { Id = id };

                return db.QuerySingleOrDefault<CustomerUNameAndId>(selectQuery, parameters);
            }
            throw new Exception("The selected user data could not be erased");
        }

        public List<CustomerLite> SearchCustomers(string input)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"SELECT *
                                       FROM Customer
                                       WHERE username
                                       LIKE '%' + @input + '%'";
                var parameters = new { input = input };

                var users = db.Query<CustomerLite>(selectQuery, parameters).ToList();

                if (users != null)
                {
                    return users;
                }
            }
            throw new Exception("Something went wrong searching the users");
        }

        public SingleCustomer GetSeller(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var queryString = @"Select id, username, creationDate
                                    From customer
                                    Where id = @id";
                var seller = db.QueryFirstOrDefault<SingleCustomer>(queryString, new { id });
                if (seller != null)
                {
                    return seller;
                }
            }
            throw new Exception("Could not find user");

        }

        public Dictionary<int, List<SellerOrder>> GetSellerOrders(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var queryString = @"Select [type], [description], product.quantity, price, title, destination, origin, timePosted, remainingQty,
	                                    OrderProduct.quantity as purchasedQty, isRefunded, [date], firstName, lastName, username, productId,
                                        Payment.type AS PayType, expirationDate, cardNumber, securityNumber, routingNumber, bankAccountNumber, payPalAuth
                                    From Product
                                    Left Join OrderProduct ON ProductId = Product.Id
                                    Left Join [Order] ON [Order].Id = orderId 
                                    Left Join Customer ON Customer.Id = CustomerId
                                    Left Join Payment ON Payment.Id = paymentId
                                    Where sellerId = @Id AND (isCompleted IS NULL OR isCompleted = 1) AND departure > GetDate()";
                var orders = db.Query<SellerOrder>(queryString, new { id });
                var groupedOrders = orders.GroupBy(order => order.ProductId);
                return groupedOrders.ToDictionary(x => x.Key, x => x.ToList());
            }
            throw new Exception("Could not find orders");
        }

        public Dictionary<int, List<SellerOrder>> GetSellerHistory(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var queryString = @"Select [type], [description], product.quantity, price, title, destination, origin, timePosted, remainingQty,
	                                    OrderProduct.quantity as purchasedQty, isRefunded, [date], firstName, lastName, username, productId
                                    From Product
                                    Left Join OrderProduct ON ProductId = Product.Id
                                    Left Join [Order] ON [Order].Id = orderId 
                                    Left Join Customer ON Customer.Id = CustomerId
                                    Where sellerId = @id AND (isCompleted IS NULL OR isCompleted = 1) AND departure < GETDATE()";
                var orders = db.Query<SellerOrder>(queryString, new { id });
                var groupedOrders = orders.GroupBy(order => order.ProductId);
                return groupedOrders.ToDictionary(x => x.Key, x => x.ToList());
            }
            throw new Exception("Could not find orders");
        }
    }
}
