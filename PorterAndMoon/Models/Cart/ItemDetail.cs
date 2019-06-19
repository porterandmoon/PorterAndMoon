using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Cart
{
    public class ItemDetail
    {
        public decimal Quantity { get; set; }
        public int Type { get; set; }
        public int Id { get; set; }
        public decimal RemainingQty { get; set; }
        public DateTime Arrival { get; set; }
        public DateTime Departure { get; set; }
        public string Destination { get; set; }
        public string Origin { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsAvailable { get; set; }
        public int OrdProdId { get; set; }
    }
}
