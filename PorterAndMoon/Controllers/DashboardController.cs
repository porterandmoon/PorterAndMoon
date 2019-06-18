using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        readonly DashboardConnections _connections;

        public DashboardController(DashboardConnections connections)
        {
            _connections = connections;
        }

        [HttpGet("{id}")]
        public ActionResult GetMonthlySales(int id)
        {
            var sales = _connections.GetMonthsSales(id);
            return Accepted(sales);
        }

        [HttpGet("{id}/all")]
        public ActionResult GetAllSales(int id)
        {
            var sales = _connections.GetAllSales(id);
            return Accepted(sales);
        }

        [HttpGet("{id}/num")]
        public ActionResult GetNumRockets(int id)
        {
            var total = _connections.GetNumRockets(id);
            return Accepted(total);
        }

        [HttpGet("{id}/month")]
        public ActionResult GetNumRocketsMonth(int id)
        {
            var total = _connections.GetNumRocketsMonth(id);
            return Accepted(total);
        }

        [HttpGet("{id}/departures")]
        public ActionResult GetDepartures(int id)
        {
            var total = _connections.GetDepartures(id);
            return Accepted(total);
        }

        [HttpGet("{id}/arrivals")]
        public ActionResult GetArrivals(int id)
        {
            var total = _connections.GetArrivals(id);
            return Accepted(total);
        }
    }
}