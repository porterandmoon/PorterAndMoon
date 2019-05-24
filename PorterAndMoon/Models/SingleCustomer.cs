using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PorterAndMoon.Interface;

namespace PorterAndMoon.Models
{
    // All Collumns
    public class SingleCustomer : ISingleCustomer
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? CreationDate { get; set; }
    }
}
