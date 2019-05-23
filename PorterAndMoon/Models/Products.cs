﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models
{
    public class Products
    {
        public int Type { get; set; }
        public string Description { get; set; }
        public decimal Quantity { get; set; }
        public int SellerId { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }

        public Products(int type, string description, decimal quantity, int sellerId, decimal price, string title)
        {
            Type = type;
            Description = description;
            Quantity = quantity;
            SellerId = sellerId;
            Price = price;
            Title = title;
        }

        
    }
}