using Microsoft.AspNetCore.Mvc;
using MedicineInventoryAPI.Services;
using MedicineInventoryAPI.Models;

namespace MedicineInventoryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicinesController : Controller
    {
        private readonly MedicineService _medicineService;

        public MedicinesController(MedicineService medicineService)
        {
            _medicineService = medicineService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Medicine>>> GetMedicines()
        {
            var medicines = await _medicineService.GetMedicinesAsync();

            return Ok(medicines);
        }

        [HttpPost]
        public async Task<ActionResult<Medicine>> AddMedicine(Medicine medicine)
        {
            var medicines = await _medicineService.GetMedicinesAsync();

            medicine.Id = medicines.Count > 0
                ? medicines.Max(m => m.Id) + 1
                : 1;

            medicines.Add(medicine);

            await _medicineService.SaveMedicinesAsync(medicines);

            return Ok(medicine);
        }

        [HttpPost("sell/{id}")]
        public async Task<ActionResult> SellMedicine(int id)
        {
            var medicines = await _medicineService.GetMedicinesAsync();

            var medicine = medicines.FirstOrDefault(m => m.Id == id);

            if (medicine == null)
            {
                return NotFound("Medicine not found");
            }

            if (medicine.Quantity <= 0)
            {
                return BadRequest("Medicine out of stock");
            }

            medicine.Quantity -= 1;

            await _medicineService.SaveMedicinesAsync(medicines);

            return Ok(medicine);
        }
    }
}
