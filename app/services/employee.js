const BASE_URL = "http://localhost:5000/api/employee";

export async function fetchManagers() {
  const res = await fetch(`${BASE_URL}/managers`);
  return res.json();
}