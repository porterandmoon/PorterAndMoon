using System;

namespace PorterAndMoon.Interface
{
    public interface ISingleCustomer
    {
        DateTime? CreationDate { get; set; }
        string FirstName { get; set; }

        int Id { get; set; }
        string LastName { get; set; }
        string UserName { get; set; }
    }
}