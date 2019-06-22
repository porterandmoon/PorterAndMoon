using PorterAndMoon.Models;
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

        public bool VerifyAddRocket(Products rocket)
        {
            if (rocket.Departure < DateTime.Now || rocket.Arrival < DateTime.Now || rocket.Departure < rocket.Arrival || 
                rocket.Destination == rocket.Origin || rocket.Price <= 0 || rocket.Quantity <= 0)
            {
                return true;
            }
            return false;
        }
    }
}
