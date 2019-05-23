﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Data;
using PorterAndMoon.Models;

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
        [HttpGet("{id}")]
        public ActionResult GetUser(int id)
        {
            var user = _repository.GetUser(id);

            return Ok(user);
        }

        // === Get all Customers ===
        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var users = _repository.GetAllUsers();

            return Ok(users);
        }

        [HttpPost]
        public ActionResult RegisterUser(RegisterCustomer newCustomer)
        {
            var registrationInfo = _repository.RegisterCustomer(newCustomer);

            return Created($"/api/user/{registrationInfo.Id}", registrationInfo);
        }


        [HttpPatch("{id}")]
        public ActionResult UpdateUser(int id)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public ActionResult PseudoDeleteUser(int id)
        {
            throw new NotImplementedException();
        }
    }
}