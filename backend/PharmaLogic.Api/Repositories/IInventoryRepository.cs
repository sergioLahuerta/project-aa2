using PharmaLogic.Models;

namespace PharmaLogic.Repositories
{
    public interface IInventoryRepository
    {
        IEnumerable<InventoryItem> GetAll();
        InventoryItem? GetById(string id);
        void Add(InventoryItem item);
        void Update(InventoryItem item);
        void Delete(string id);
    }
}