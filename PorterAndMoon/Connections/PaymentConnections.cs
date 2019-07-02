using Microsoft.Extensions.Options;
using PorterAndMoon.Models.Payment;
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
        public IEnumerable<PaymentType> GetAllUserPayments(int id)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Select *
                                    From Payment
                                    Where customerId = @Id";
                var payment = connection.Query<PaymentType>(queryString, new { id });
                return payment;
            }
        }
        public IEnumerable<PaymentType> GetUserPayment(int id)
        {
            using (var connection = new SqlConnection(ConnectionString)) {
                var queryString = @"Select *
                                    From Payment
                                    Where customerId = @Id";
                var payment = connection.Query<PaymentType>(queryString, new { id });
                if (payment != null)
                {
                    return payment.ToList();
                }
            }
                throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType AddPaymentType(NewPayment newPayment)
        {
            using (var connection = new SqlConnection(ConnectionString)) {
                var queryString = @"Insert into Payment (customerId, type, cardNumber, securityNumber,
                                    bankAccountNumber, routingNumber, paypalAuth, name, isExpired, expirationDate)
                                    Output inserted.*
                                    Values (@customerId, @type, @cardNumber, @securityNumber,
                                    @bankAccountNumber, @routingNumber, @paypalAuth, @name, @isExpired, @expirationDate)";
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

        public PaymentType UpdateCardNumber(PaymentType changedPayment)
        {
            using (var connection = new SqlConnection(ConnectionString)) {
                var queryString = @"Update Payment
                                    Set cardNumber = @CardNumber
                                    Output inserted.*
                                    Where Id= @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, changedPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
                throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType UpdateBankAccountNumber(PaymentType changedPayment)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update Payment
                                    Set bankAccountNumber = @BankAccountNumber
                                    Output inserted.*
                                    Where Id= @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, changedPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
            throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType UpdateRoutingNumber(PaymentType changedPayment)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update Payment
                                    Set routingNumber = @RoutingNumber
                                    Output inserted.*
                                    Where Id= @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, changedPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
            throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType UpdateSecurityNumber(PaymentType changedPayment)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update Payment
                                    Set securityNumber = @SecurityNumber
                                    Output inserted.*
                                    Where Id= @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, changedPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
            throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType UpdateExpirationDate(PaymentType changedPayment)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update Payment
                                    Set expirationDate = @ExpirationDate
                                    Output inserted.*
                                    Where Id= @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, changedPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
            throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType UpdatePaypalAuth(PaymentType changedPayment)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update Payment
                                    Set paypalAuth = @PaypalAuth
                                    Output inserted.*
                                    Where Id= @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, changedPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
            throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public PaymentType UpdateName(PaymentType changedPayment)
        {
            using (var connection = new SqlConnection(ConnectionString))
            {
                var queryString = @"Update Payment
                                    Set name = @Name
                                    Output inserted.*
                                    Where Id= @Id";
                var payment = connection.QueryFirstOrDefault<PaymentType>(queryString, changedPayment);
                if (payment != null)
                {
                    return payment;
                }
            }
            throw new Exception("Uhh uhh uhhh, didn't say the magic word.");
        }

        public void UpdatePaymentType(PaymentType changedPayment)
        {
            if (changedPayment.BankAccountNumber != null)
            {
                UpdateBankAccountNumber(changedPayment);
            }
            if (changedPayment.CardNumber != null)
            {
                UpdateCardNumber(changedPayment);
            }
            if (changedPayment.ExpirationDate != null)
            {
                UpdateExpirationDate(changedPayment);
            }
            if (changedPayment.PaypalAuth != null)
            {
                UpdatePaypalAuth(changedPayment);
            }
            if (changedPayment.RoutingNumber != null)
            {
                UpdateRoutingNumber(changedPayment);
            }
            if (changedPayment.SecurityNumber != null)
            {
                UpdateSecurityNumber(changedPayment);
            }
            if (changedPayment.Name != null)
            {
                UpdateName(changedPayment);
            }
        }
    }
}
