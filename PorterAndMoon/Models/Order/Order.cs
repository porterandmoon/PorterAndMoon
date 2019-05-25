using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Order
{
    public class Order
    {
        public bool IsRefunded { get; set; }
        public bool IsCompleted { get; set; }
        public int CustomerId { get; set; }
        public int PaymentId { get; set; }
        public DateTime Date { get; set; }
    }
}
