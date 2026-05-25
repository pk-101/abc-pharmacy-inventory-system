# ABC Pharmacy Inventory System

Single Page Application for managing pharmacy medicine inventory.

## Tech Stack

### Frontend
- React
- Vite
- Bootstrap

### Backend
- ASP.NET Core Web API
- JSON file storage

---

## Features

- Display medicines in table/grid
- Add new medicine
- Sell medicine functionality
- Search medicines by name
- Expiry warning (red rows)
- Low stock warning (yellow rows)
- JSON file persistence
- Notes excluded from grid display

---

## Project Structure

```text
medicine-inventory-app/
├── backend/
├── frontend/
└── README.md
```

---

## Backend Setup

Navigate to backend project:

```bash
cd backend/MedicineInventoryAPI
```

Run backend:

```bash
dotnet run
```

Backend runs on:

```text
https://localhost:7160
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Get Medicines

```http
GET /api/medicines
```

### Add Medicine

```http
POST /api/medicines
```

### Sell Medicine

```http
POST /api/medicines/sell/{id}
```

---

## Notes

- Data is stored in JSON file inside:
  - `Data/medicines.json`
- No database is used as per assessment requirement.
- Built with simple and practical architecture.