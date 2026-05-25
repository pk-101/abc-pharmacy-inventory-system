const API_BASE_URL = "https://localhost:7160/api/medicines";

export async function getMedicines() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch medicines");
  }

  return await response.json();
}

export async function addMedicine(medicine) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicine),
  });

  if (!response.ok) {
    throw new Error("Failed to add medicine");
  }

  return await response.json();
}

export async function sellMedicine(id) {
  const response = await fetch(
    `${API_BASE_URL}/sell/${id}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to sell medicine");
  }

  return await response.json();
}