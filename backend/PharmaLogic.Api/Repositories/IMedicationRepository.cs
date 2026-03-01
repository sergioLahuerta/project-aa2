using PharmaLogic.Models;

namespace PharmaLogic.Repositories
{
    public interface IMedicationRepository
    {
        IEnumerable<Medication> GetAll();
        Medication? GetById(string id);
        void Add(Medication medication);
        void Update(Medication medication);
        void Delete(string id);
    }
}