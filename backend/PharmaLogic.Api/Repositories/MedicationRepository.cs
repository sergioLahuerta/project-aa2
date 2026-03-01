using PharmaLogic.Data;
using PharmaLogic.Models;

namespace PharmaLogic.Repositories
{
    public class MedicationRepository : IMedicationRepository
    {
        private readonly JsonDbContext _context;

        public MedicationRepository(JsonDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Medication> GetAll() => _context.Medications;

        public Medication? GetById(string id) 
            => _context.Medications.FirstOrDefault(m => m.Id == id);

        public void Add(Medication medication)
        {
            if (string.IsNullOrEmpty(medication.Id))
            {
                int maxId = _context.Medications.Count > 0 
                    ? _context.Medications.Max(m => int.Parse(m.Id)) 
                    : 0;
                medication.Id = (maxId + 1).ToString();
            }

            _context.Medications.Add(medication);
            _context.SaveChanges();
        }

        public void Update(Medication medication)
        {
            var index = _context.Medications.FindIndex(m => m.Id == medication.Id);
            if (index != -1)
            {
                _context.Medications[index] = medication;
                _context.SaveChanges();
            }
        }

        public void Delete(string id)
        {
            var medication = _context.Medications.FirstOrDefault(m => m.Id == id);
            if (medication != null)
            {
                _context.Medications.Remove(medication);
                _context.SaveChanges();
            }
        }
    }
}