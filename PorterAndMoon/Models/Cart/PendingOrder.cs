using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Cart
{
    public class PendingOrder
    {
        public int Id { get; set; }
        public decimal OrderQuantity { get; set; }
        public decimal RemainingQty { get; set; }
        public decimal Quantity { get; set; }
        public DateTime Departure { get; set; }
        public decimal Price { get; set; }
    }
}
