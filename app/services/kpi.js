const BASE_URL = "http://localhost:5000/api/kpi";

export async function fetchEmployeeKPIs() {
  const res = await fetch(`${BASE_URL}/employee`, { credentials: "include" });
  return res.json();
}

export async function fetchTeamKPIs() {
  const res = await fetch(`${BASE_URL}/team`, { credentials: "include" });
  return res.json();
}

export async function submitKPI(payload) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function scoreKPI(id, payload) {
  const res = await fetch(`${BASE_URL}/${id}/score`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function finalizeKPI(id) {
  const res = await fetch(`${BASE_URL}/${id}/finalize`, {
    method: "PUT",
    credentials: "include",
  });
  return res.json();
}

export async function fetchPreviousEmployeeKPIs() {
  const res = await fetch(`${BASE_URL}/employee/previous`, { credentials: "include" });
  console.log(res);
  return res.json();
}