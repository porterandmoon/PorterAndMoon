using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PorterAndMoon.Connections
{
    public class PaymentConnections
    {
        readonly string ConnectionString;

        public PaymentConnections(IOptions<DbConfiguration> dbConfig)
        {
            ConnectionString = dbConfig.Value.ConnectionString;
        }
    }
}
