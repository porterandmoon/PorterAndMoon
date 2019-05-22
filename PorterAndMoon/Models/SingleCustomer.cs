using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Models
{
    // All Collumns
    public class SingleCustomer
    {
        public int Id { get; }
        public string UserName { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public DateTime CreationDate { get; }
    }
}
