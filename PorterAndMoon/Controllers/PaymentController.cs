using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models.Payment;

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

        [HttpGet("{customerId}")]
        public ActionResult GetAllUserPayments(int customerId)
        {
            var userPayments = _connections.GetAllUserPayments(customerId);
                return Accepted(userPayments);
        }

        /*
         Pass new payment info into body of request.
         */

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

        /*
        Pass any information to update into the body of request 
        along with the id of the payment to update
        */

        [HttpPut]
        public ActionResult EditPaymentType(PaymentType changedPayment)
        {
            _connections.UpdatePaymentType(changedPayment);
            var paymentType = _connections.GetUserPayment(changedPayment.Id);
            return Accepted(paymentType);
        }
    }
}