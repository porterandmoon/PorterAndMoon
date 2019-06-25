using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Cart
{
    public class ValidProductWithPrice
    {
        public bool updateSuccessful { get; set; } = false;
        public decimal Total { get; set; } = 0;
    }
}
