using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PharmaLogic.Models;
using PharmaLogic.Repositories;

namespace PharmaLogic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Bloqueo de acceso no autorizado
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryRepository _repository;

        public InventoryController(IInventoryRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var item = _repository.GetById(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] InventoryItem item)
        {
            _repository.Add(item);
            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] InventoryItem item)
        {
            if (id != item.Id) return BadRequest("ID mismatch");
            
            var existing = _repository.GetById(id);
            if (existing == null) return NotFound();

            _repository.Update(item);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var existing = _repository.GetById(id);
            if (existing == null) return NotFound();

            _repository.Delete(id);
            return NoContent();
        }
    }
}