using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Data;

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

        [HttpGet("{id}")]
        public ActionResult GetUser(int id)
        {
            var user = _repository.GetUser(id);

            return Ok(user);
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            throw new NotImplementedException();
        }

        [HttpPost("{id}")]
        public ActionResult RegisterUser(int id)
        {
            throw new NotImplementedException();
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