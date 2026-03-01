using PharmaLogic.Data;
using PharmaLogic.Models;

namespace PharmaLogic.Repositories
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly JsonDbContext _context;

        public InventoryRepository(JsonDbContext context)
        {
            _context = context;
        }

        public IEnumerable<InventoryItem> GetAll() => _context.Inventory;

        public InventoryItem? GetById(string id) 
            => _context.Inventory.FirstOrDefault(i => i.Id == id);

        public void Add(InventoryItem item)
        {
            if (string.IsNullOrEmpty(item.Id))
            {
                int maxId = _context.Inventory.Count > 0 
                    ? _context.Inventory.Max(i => int.Parse(i.Id)) 
                    : 0;
                item.Id = (maxId + 1).ToString();
            }

            _context.Inventory.Add(item);
            _context.SaveChanges();
        }

        public void Update(InventoryItem item)
        {
            var index = _context.Inventory.FindIndex(i => i.Id == item.Id);
            if (index != -1)
            {
                _context.Inventory[index] = item;
                _context.SaveChanges();
            }
        }

        public void Delete(string id)
        {
            var item = _context.Inventory.FirstOrDefault(i => i.Id == id);
            if (item != null)
            {
                _context.Inventory.Remove(item);
                _context.SaveChanges();
            }
        }
    }
}