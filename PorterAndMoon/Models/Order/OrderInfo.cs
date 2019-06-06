using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Order
{
    public class OrderInfo
    {
        public int Id { get; set; } 
        public bool IsRefunded { get; set; }
        public DateTime Date { get; set; }
        public decimal QuantityOrdered { get; set; }
		public string Description { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }
        public string type { get; set; }
        public string Seller { get; set; }
        public string PaymentType { get; set; }
        public string CardNumber { get; set; }
        public string BankAccountNumber { get; set; }
        public string CardHolderName { get; set; }
        public string PaypalReference { get; set; }
    }
}
