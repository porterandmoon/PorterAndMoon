using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Validation
{
    public class CheckSystem
    {
        public bool VerifyDate(DateTime departureDate)
        {
            if(DateTime.Now.CompareTo(departureDate) == -1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
