using System;

namespace PorterAndMoon.Models.Order
{
    public class NewOrder
    {
        public bool IsRefunded { get; set; } = false;
        public bool IsCompleted { get; set; } = false;
        public int CustomerId { get; set; }
        public int? PaymentId { get; set; } = null;
        public DateTime Date { get; set; } = DateTime.Now;
    }

}
