using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PharmaLogic.Models;
using PharmaLogic.Repositories;

namespace PharmaLogic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MedicationController : ControllerBase
    {
        private readonly IMedicationRepository _repository;

        public MedicationController(IMedicationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_repository.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var med = _repository.GetById(id);
            return med == null ? NotFound() : Ok(med);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Medication medication)
        {
            _repository.Add(medication);
            return CreatedAtAction(nameof(GetById), new { id = medication.Id }, medication);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] Medication medication)
        {
            if (id != medication.Id) return BadRequest("El ID no coincide");
            
            var existing = _repository.GetById(id);
            if (existing == null) return NotFound();

            _repository.Update(medication);
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