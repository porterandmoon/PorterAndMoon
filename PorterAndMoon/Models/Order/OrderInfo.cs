using System;
using System.Collections.Generic;

namespace PorterAndMoon.Models.Order
{
    public class OrderInfo
    {
        public int Id { get; set; }
        public bool IsRefunded { get; set; }
        public DateTime Date { get; set; }
        public string PaymentType { get; set; }
        public string CardNumber { get; set; }
        public string BankAccountNumber { get; set; }
        public string CardHolderName { get; set; }
        public string PaypalReference { get; set; }
        public List<OrderProductInfo> ProductDetail { get; set; } = new List<OrderProductInfo>();
    }
}
