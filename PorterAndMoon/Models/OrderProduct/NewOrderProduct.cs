using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.OrderProduct
{
    public class NewOrderProduct
    {
            public int ProductId { get; set; }
            public int OrderId { get; set; }
            public decimal Quantity { get; set; }

    }
}
