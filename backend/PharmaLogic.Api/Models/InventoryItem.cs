namespace PharmaLogic.Models
{
    public class InventoryItem
    {
        public string Id { get; set; } = string.Empty;
        public int MedicationId { get; set; }
        public string BatchNumber { get; set; } = string.Empty;
        public string ExpiryDate { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}