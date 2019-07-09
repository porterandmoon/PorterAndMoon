using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Cart
{
    public class CartAdd
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public decimal OrderQuantity { get; set; }
        public int SeatId { get; set; }
    }
}
