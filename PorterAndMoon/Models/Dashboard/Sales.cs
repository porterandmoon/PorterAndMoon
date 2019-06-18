using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Dashboard
{
    public class Sales
    {
        public decimal Price { get; set; }
        public decimal PurchasedQty { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
    }
}
