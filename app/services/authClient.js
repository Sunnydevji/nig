const BASE_URL = "http://localhost:5000/api/auth"; // or your backend URL

export async function registerUser(payload) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function verifyOtp(payload) {
  const res = await fetch(`${BASE_URL}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function loginUser(payload) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include", // for cookies
  });
  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
}