using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models.Product;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        readonly SeatConnections _connections;

        public SeatController(SeatConnections connections)
        {
            _connections = connections;
        }

        [HttpGet("{id}")]
        public ActionResult GetSeats(int id)
        {
            var seats = _connections.GetSeats(id);
            return Accepted(seats);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateSold(Seat updatedSeat)
        {
            var seat = _connections.UpdateSold(updatedSeat);
            return Accepted(seat);
        } 

        [HttpPost]
        public ActionResult CreateSeats(NewFlightSeat newFlight)
        {
            var numSeats = _connections.CreateSeats(newFlight);
            return Accepted(numSeats);
        }
    }
}