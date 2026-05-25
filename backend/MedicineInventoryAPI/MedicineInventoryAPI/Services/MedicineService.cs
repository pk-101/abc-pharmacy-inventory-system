using System.Text.Json;
using MedicineInventoryAPI.Models;

namespace MedicineInventoryAPI.Services
{
    public class MedicineService
    {
        private readonly string _filePath;

        public MedicineService()
        {
            _filePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "Data",
                "medicines.json");
        }

        public async Task<List<Medicine>> GetMedicinesAsync()
        {
            if (!File.Exists(_filePath))
            {
                return new List<Medicine>();
            }

            var jsonData = await File.ReadAllTextAsync(_filePath);

            if (string.IsNullOrWhiteSpace(jsonData))
            {
                return new List<Medicine>();
            }

            return JsonSerializer.Deserialize<List<Medicine>>(jsonData)
                   ?? new List<Medicine>();
        }

        public async Task SaveMedicinesAsync(List<Medicine> medicines)
        {
            var options = new JsonSerializerOptions
            {
                WriteIndented = true
            };

            var jsonData = JsonSerializer.Serialize(medicines, options);

            await File.WriteAllTextAsync(_filePath, jsonData);
        }
    }
}
