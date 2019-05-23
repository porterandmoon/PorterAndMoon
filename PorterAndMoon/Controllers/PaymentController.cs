using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        readonly PaymentConnections _connections;

        public PaymentController(PaymentConnections connections)
        {
            _connections = connections;
        }

        [HttpGet("all")]
        public ActionResult GetAllPaymentTypes()
        {
            var paymentTypes = _connections.GetAllPaymentTypes();
            return Accepted(paymentTypes);
        }

        [HttpGet("{Id}")]
        public ActionResult GetPaymentType(int Id)
        {
            var paymentType = _connections.GetSinglePaymentType(Id);
            return Accepted(paymentType);
        }

        [HttpPost]
        public ActionResult PostPaymentType(PaymentType newPayment)
        {
            var paymentType = _connections.AddPaymentType(newPayment);
            return Accepted(paymentType);
        }

        [HttpDelete("{Id}")]
        public ActionResult DeletePaymentType(int Id)
        {
            var paymentType = _connections.RemovePaymentType(Id);
            return Accepted(paymentType);
        }

        [HttpPut]
        public ActionResult EditPaymentType(PaymentType oldPayment)
        {
            var paymentType = _connections.UpdatePaymentType(oldPayment);
            return Accepted(paymentType);
        }
    }
}