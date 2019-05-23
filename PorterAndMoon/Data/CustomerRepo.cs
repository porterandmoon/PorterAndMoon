using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using PorterAndMoon.Models;
using PorterAndMoon.Interface;

namespace PorterAndMoon.Data
{
    public class CustomerRepo
    {
        readonly string _connectionString;
        public CustomerRepo(IOptions<DbConfiguration> dbConfig)
        {
            // builds ConnectionString from appsettings.json
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public SingleCustomer GetUser(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"SELECT *
                                       FROM Customer
                                       WHERE Id = @id";
                var parameters = new { id = id };

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
                
                if(!doesUNameExist)
                {
                    var insertQuery = @"INSERT Into Customer (Username, FirstName, LastName, CreationDate)
                                        OUTPUT Inserted.*
                                        VALUES (@username, @firstname, @lastname, @creationDate)";
                    var parameters = new
                    {
                        username = newCustomer.UserName,
                        firstname = newCustomer.FirstName,
                        lastname = newCustomer.LastName,
                        creationDate = DateTime.Now
                    };

                    var createdUser = db.QuerySingle<SingleCustomer>(insertQuery, parameters);

                    return createdUser;
                }
                else
                {
                    throw new Exception();  //ISingleCustomer{ Id = null, UserName = null, FirstName = null, LastName = null, CreationDate = null }
                }
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
    }
}
