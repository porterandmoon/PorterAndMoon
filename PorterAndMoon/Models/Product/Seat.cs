﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Product
{
    public class Seat
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public string SeatNumber { get; set; }
        public bool IsPurchased { get; set; }
        public decimal Premium { get; set; }
        public string Type { get; set; }
        public int RowLength { get; set; }
        public decimal Price { get; set; }
    }
}
