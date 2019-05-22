using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models
{
    public class AddProduct
    {
        public int Type { get; set; }
        public string Description { get; set; }
        public decimal Quantity { get; set; }
        public int SellerId { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }
    }
}
