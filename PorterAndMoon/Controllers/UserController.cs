using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models.Customer;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly CustomerRepo _repository;

        public UserController(CustomerRepo repository)
        {
            _repository = repository;
        }

        /* === Get a single Customer ===
         * Pass the intended customer's ID in the URL to get the user's properties*/
        [HttpGet("{uid}")]
        public ActionResult GetUser(string uid)
        {
            var user = _repository.GetUser(uid);

            return Ok(user);
        }

        // === Get all Customers ===
        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var users = _repository.GetAllUsers();

            return Ok(users);
        }

        // query users
        // localhost:####/api/user/customer?input=
        [HttpGet("customer")]
        public ActionResult SearchCustomers(string input)
        {
            var output = _repository.SearchCustomers(input);

            return Ok(output);
        }

        /* === Register a new user ===
         * Must pass: 
         *   * "UserName" - string
         *   * "FirstName" - string
         *   * "LastName" - string
         */
        [HttpPost]
        public ActionResult RegisterUser(RegisterCustomer newCustomer)
        {
            bool UsernameExists = _repository.CheckIfUsernameExists(newCustomer.UserName);

            if (!UsernameExists)
            {
                var registrationInfo = _repository.RegisterCustomer(newCustomer);

                return Created($"/api/user/{registrationInfo.Id}", registrationInfo);
            }
            else
            {
                return Conflict("This Username already exists");
            }
        }


        /* === Remove First and Last name
         * pass the customer's ID to remove personal info from the account */
        [HttpDelete("{id}")]
        public ActionResult PseudoDeleteUser(int id)
        {
            var deletedInfo = _repository.PseudoDeleteUser(id);

            return Ok(deletedInfo);
        }

        [HttpGet("seller/{id}")]
        public ActionResult GetSellerInfo(int id)
        {
            var sellerInfo = _repository.GetSeller(id);
            return Ok(sellerInfo);
        }
    }
}