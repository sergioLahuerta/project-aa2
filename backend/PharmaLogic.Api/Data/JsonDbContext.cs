using System.Text.Json;
using System.Text.Json.Serialization;
using PharmaLogic.Models;

namespace PharmaLogic.Data
{
    public class JsonDbContext
    {
        private readonly string _filePath = "db.json";
        
        // Listas en memoria que usarán los repositorios
        public List<Medication> Medications { get; set; } = new();
        public List<InventoryItem> Inventory { get; set; } = new();
        public List<User> Users { get; set; } = new();

        public JsonDbContext()
        {
            LoadData();
        }

        public void LoadData()
        {
            try 
            {
                if (!File.Exists(_filePath))
                {
                    Console.WriteLine($"[AVISO] El archivo {_filePath} no existe. Se crearán listas vacías.");
                    return;
                }

                var json = File.ReadAllText(_filePath);
                
                // Configuración para ser flexible con el JSON
                var options = new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true,
                    // Esto permite que "150" se convierta a int 150 sin dar error 500
                    NumberHandling = JsonNumberHandling.AllowReadingFromString 
                };

                var data = JsonSerializer.Deserialize<JsonDataWrapper>(json, options);
                
                if (data != null)
                {
                    Medications = data.Medications ?? new List<Medication>();
                    Inventory = data.Inventory ?? new List<InventoryItem>();
                    Users = data.Users ?? new List<User>();
                    Console.WriteLine($"[ÉXITO] Datos cargados: {Medications.Count} medicamentos, {Inventory.Count} lotes, {Users.Count} usuarios.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Error al leer el JSON: {ex.Message}");
            }
        }

        public void SaveChanges()
        {
            try
            {
                var data = new JsonDataWrapper 
                { 
                    Medications = Medications, 
                    Inventory = Inventory,
                    Users = Users 
                };

                var options = new JsonSerializerOptions 
                { 
                    WriteIndented = true, // Para que el JSON sea legible
                    PropertyNameCaseInsensitive = true 
                };

                var json = JsonSerializer.Serialize(data, options);
                File.WriteAllText(_filePath, json);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] Error al guardar en el JSON: {ex.Message}");
            }
        }
    }

    // Esta clase debe coincidir exactamente con las llaves de tu db.json
    public class JsonDataWrapper
    {
        [JsonPropertyName("medications")]
        public List<Medication> Medications { get; set; } = new();

        [JsonPropertyName("inventory")]
        public List<InventoryItem> Inventory { get; set; } = new();

        [JsonPropertyName("users")]
        public List<User> Users { get; set; } = new();
    }
}