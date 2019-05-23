using Microsoft.Extensions.Options;
using PorterAndMoon.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace PorterAndMoon.Connections
{
    public class PaymentConnections
    {
        readonly string ConnectionString;

        public PaymentConnections(IOptions<DbConfiguration> dbConfig)
        {
            ConnectionString = dbConfig.Value.ConnectionString;
        }

        public IEnumerable<PaymentType> GetAllPaymentTypes()
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From Payment";
                var payment = connection.Query<PaymentType>(queryString);
                return payment;
            }
        }

        public PaymentType GetSinglePaymentType(int id)
        {
            using (var connection = new SqlConnection(ConnectionString)) {
                var queryString = @"Select *
                                    From Payment
                                    Where Id = @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, new { id });
                if (payment != null)
                {
                    return payment;
                }
            }
                throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType AddPaymentType(PaymentType newPayment)
        {
            using (var connection = new SqlConnection(ConnectionString)) {
                var queryString = @"Insert into Payment (customerId, type, cardNumber, securityNumber,
                                    bankAccountNumber, paypalAuth, name, isExpired, expirationDate)
                                    Output inserted.*
                                    Values (@customerId, @type, @cardNumber, @securityNumber,
                                    @bankAccountNumber, @paypalAuth, @name, @isExpired, @expirationDate)";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, newPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
                throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType RemovePaymentType(int id)
        {
            using (var connection = new SqlConnection(ConnectionString)) {
                var queryString = @"Delete
                                    From Payment
                                    Output deleted.*
                                    Where Id = @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, new { id });
                if (payment != null)
                {
                    return payment;
                }
            }
                throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType UpdatePaymentType(PaymentType oldPayment)
        {
            using (var connection = new SqlConnection(ConnectionString)) {
                var queryString = @"Update Payment
                                    Set type = @Type, customerId = @CustomerId, cardNumber = @CardNumber, securityNumber = @SecurityNumber,
                                    routingNumber = @RoutingNumber, bankAccountNumber = @BankAccountNumber, name = @Name,
                                    isExpired = @IsExpired, expirationDate = @ExpirationDate
                                    Output inserted.*
                                    Where Id= @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, oldPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
                throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }
    }
}
