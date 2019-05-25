using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PorterAndMoon.Connections;
using PorterAndMoon.Models.ProductType;

namespace PorterAndMoon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        readonly ProductTypeRepo _repository;

        public ProductTypeController(ProductTypeRepo repository)
        {
            _repository = repository;
        }

        // === Gets all Product Types ===
        [HttpGet]
        public ActionResult GetTypes()
        {
            var types = _repository.GetTypes();

            return Ok(types);
        }


        /* === Gets Specified Product ===
         * Pass the ProductType ID in the URL
         */
        [HttpGet("{id}")]
        public ActionResult GetType(int id)
        {
            var type = _repository.ProdType(id);

            return Ok(type);
        }

        /* === Create New Product Type ===
         * Pass the Key "name" with a string value
         */
        [HttpPost]
        public ActionResult AddType(NewType newType)
        {
            var newTypeSuccess = _repository.AddType(newType);

            return Created("api/producttype", newTypeSuccess);
        }

        /* === Update an existing Product Type ===
         * Pass the Key "id" and "name". The only value that can be updated is the name
         */
        [HttpPut]
        public ActionResult UpdateType(ProductType updatedType)
        {
            var updateSuccessInfo = _repository.UpdateType(updatedType);

            return Ok(updateSuccessInfo);
        }

        /* === Deletes a Product Type
         * Pass the Id into the URL
         */
        [HttpDelete("{id}")]
        public ActionResult DeleteType(int id)
        {
            var deletedType = _repository.DeleteType(id);

            return Ok(deletedType);
        }
    }
}