using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using PorterAndMoon.Models.Customer;
using PorterAndMoon.Interface;

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
    }
}
