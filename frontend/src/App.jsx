import { useEffect, useState } from "react";
import {
  getMedicines,
  addMedicine,
  sellMedicine,
} from "./services/medicineService";
function App() {
  const [medicines, setMedicines] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    notes: "",
    expiryDate: "",
    quantity: "",
    price: "",
    brand: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  async function fetchMedicines() {
    try {
      const data = await getMedicines();
      setMedicines(data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await addMedicine({
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });

      fetchMedicines();

      setFormData({
        fullName: "",
        notes: "",
        expiryDate: "",
        quantity: "",
        price: "",
        brand: "",
      });
    } catch (error) {
      console.error("Error adding medicine:", error);
    }
  }

  function getRowClass(medicine) {
    const today = new Date();

    const expiryDate = new Date(medicine.expiryDate);

    const differenceInDays = (expiryDate - today) / (1000 * 60 * 60 * 24);

    if (differenceInDays >= 0 && differenceInDays <= 30) {
      return "table-danger";
    }
    if (medicine.quantity < 10) {
      return "table-warning";
    }

    return "";
  }

  async function handleSell(id) {
    try {
      await sellMedicine(id);

      fetchMedicines();
    } catch (error) {
      console.error("Error selling medicine:", error);
    }
  }

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">
  ABC Pharmacy Inventory System
</h1>

      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <h3 className="mb-3">Add Medicine</h3>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Medicine Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Brand</label>
            <input
              type="text"
              name="brand"
              className="form-control"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              className="form-control"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              className="form-control"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Medicine
        </button>
      </form>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search medicine by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Medicine Name</th>
            <th>Brand</th>
            <th>Expiry Date</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredMedicines.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No medicines found
              </td>
            </tr>
          ) : (
            filteredMedicines.map((medicine) => (
              <tr key={medicine.id} className={getRowClass(medicine)}>
                <td>{medicine.id}</td>
                <td>{medicine.fullName}</td>
                <td>{medicine.brand}</td>
                <td>{new Date(medicine.expiryDate).toLocaleDateString()}</td>
                <td>{medicine.quantity}</td>
                <td>₹ {medicine.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleSell(medicine.id)}
                    disabled={medicine.quantity <= 0}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
