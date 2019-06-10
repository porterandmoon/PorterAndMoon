using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models.Order
{
    public class OrderProductInfo
    {
        public decimal QuantityOrdered { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Title { get; set; }
        public string type { get; set; }
        public string Seller { get; set; }

    }
}
