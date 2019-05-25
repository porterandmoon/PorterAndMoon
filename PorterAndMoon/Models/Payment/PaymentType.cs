using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Payment
{
    public class PaymentType
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public int? CustomerId { get; set; }
        public bool? IsExpired { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public string CardNumber { get; set; }
        public int? SecurityNumber { get; set; }
        public string RoutingNumber { get; set; }
        public string BankAccountNumber { get; set; }
        public string Name { get; set; }
        public string PaypalAuth { get; set; }
    }
}
