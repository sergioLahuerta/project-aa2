namespace PharmaLogic.Models
{
    public class Medication
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string ActiveIngredient { get; set; } = string.Empty;
        public string Dosage { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
    }
}