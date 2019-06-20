using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Order
{
    public class SellerOrder
    {
        public int Type { get; set; }
        public string Description { get; set; }
        public decimal Quantity { get; set; }
        public decimal RemainingQty { get; set; }
        public decimal PurchasedQty { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }
        public string Destination { get; set; }
        public string Origin { get; set; }
        public DateTime TimePosted { get; set; }
        public DateTime Date { get; set; }
        public bool IsRefunded { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public int ProductId { get; set; }
        public string PayType { get; set; }
        public string CardNumber { get; set; }
        public string BankAccountNumber { get; set; }
        public string RoutingNumber { get; set; }
        public string PayPalAuth { get; set; }
        public int SecurityNumber { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
