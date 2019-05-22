using System;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using System.Data.SqlClient;
using PorterAndMoon.Models;

namespace PorterAndMoon.Data
{
    public class CustomerRepo
    {
        readonly string _connectionString;
        public CustomerRepo(IOptions<DbConfiguration> dbConfig)
        {
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

                if(user != null)
                {
                    return user;
                }
            }
            throw new Exception("We could not retreive that User from the database");
        }
    }
}
