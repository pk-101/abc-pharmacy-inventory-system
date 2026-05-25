using System.ComponentModel.DataAnnotations;

namespace MedicineInventoryAPI.Models
{
    public class Medicine
    {
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        public string Notes { get; set; } = string.Empty;

        [Required]
        public DateTime ExpiryDate { get; set; }

        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        [Required]
        public string Brand { get; set; } = string.Empty;
    }
}
