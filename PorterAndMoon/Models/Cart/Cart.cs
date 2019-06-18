using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Cart
{
    public class Cart
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public List<ItemDetail> ItemsInCart { get; set; } = new List<ItemDetail>();
    }
}
