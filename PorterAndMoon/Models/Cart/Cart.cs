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
        public Dictionary<int, List<ItemDetail>> ItemsInCart { get; set; } = new Dictionary<int, List<ItemDetail>>();
    }
}
