using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Cart
{
    public class Purchase
    {
        public int UserId { get; set; }
        public int PaymentId { get; set; }
    }
}
