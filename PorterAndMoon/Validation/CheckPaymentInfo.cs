using PorterAndMoon.Models.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Validation
{
    public class CheckPaymentInfo
    {
        List<string> CardTypes = new List<string>
        {
            "VISA",
            "MASTER CARD",
            "AMEX",
            "DISCOVER",
            "DINERS INTERNATIONAL"
        };

        public bool ValidatePayment(PaymentType payment)
        {
            bool valid = false;

            if(payment.CustomerId != null)
            {
                if(payment.Type != null && payment.ExpirationDate.HasValue &&
                    payment.CardNumber != null && payment.SecurityNumber != null && payment.Name != null
                )
                {
                    var nonNullableExpirationDate = (DateTime)payment.ExpirationDate;
                    var dateCardInvalid = new DateTime(nonNullableExpirationDate.Year, nonNullableExpirationDate.Month, 1).AddMonths(1);
                    if(CardTypes.Contains(payment.Type) && VerifyDate(dateCardInvalid))
                    {
                        payment.IsExpired = false;
                        valid = true;
                    }
                } else if(payment.RoutingNumber != null && payment.BankAccountNumber != null)
                {
                    valid = true;
                } else if(payment.PaypalAuth != null)
                {
                    valid = true;
                }
            }
            return valid;
        }

        public bool VerifyDate(DateTime expirationDate)
        {
            if (DateTime.Now.CompareTo(expirationDate) == -1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}