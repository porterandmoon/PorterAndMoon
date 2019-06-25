using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Product
{
    public class NewFlightSeat
    {
        public int ProductId { get; set; }
        public int NumSeats { get; set; }
        public int NumPremium { get; set; }
        public decimal Premium { get; set; }
    }
}
