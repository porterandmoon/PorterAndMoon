using Dapper;
using Microsoft.Extensions.Options;
using PorterAndMoon.Models.ProductType;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace PorterAndMoon.Connections
{
    public class ProductTypeRepo
    {
        readonly string _connectionString;
        public ProductTypeRepo(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<ProductType> GetTypes()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"SELECT *
                                       FROM ProductType";

                var productTypes = db.Query<ProductType>(selectQuery);

                if (productTypes != null)
                {
                    return productTypes;
                }
            }
            throw new Exception("error getting product types");
        }

        public ProductType ProdType(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"SELECT *
                                       FROM ProductType
                                       Where Id = @Id";

                var parameters = new {  Id = id };

                var productType = db.QueryFirstOrDefault<ProductType>(selectQuery, parameters);

                if (productType != null)
                {
                    return productType;
                }
            }
            throw new Exception("error getting product types");
        }

        public ProductType AddType(NewType newType)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"INSERT Into ProductType (Name)
                                       OUTPUT inserted.*
                                       VALUES (@name)";

                var parameters = new { name = newType.Name };

                var productType = db.QueryFirstOrDefault<ProductType>(selectQuery, parameters);

                if (productType != null)
                {
                    return productType;
                }
            }
            throw new Exception("error getting product types");
        }

        public ProductType DeleteType(int id)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"DELETE ProductType
                                       OUTPUT deleted.*
                                       WHERE Id = @id";

                var parameters = new { id = id };

                var productType = db.QueryFirstOrDefault<ProductType>(selectQuery, parameters);

                if (productType != null)
                {
                    return productType;
                }
            }
            throw new Exception("error getting product types");
        }

        public ProductType UpdateType(ProductType updatedType)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                string selectQuery = @"UPDATE ProductType
                                       SET name = @name
                                       OUTPUT inserted.*
                                       WHERE Id = @id";

                var parameters = new { name = updatedType.Name, id = updatedType.Id };

                var productType = db.QueryFirstOrDefault<ProductType>(selectQuery, parameters);

                if (productType != null)
                {
                    return productType;
                }
            }
            throw new Exception("error getting product types");
        }
    }
}
