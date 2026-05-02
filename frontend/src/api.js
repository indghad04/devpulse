const BASE = "/api";

export async function fetchDevelopers() {
  const res = await fetch(`${BASE}/developers`);
  if (!res.ok) throw new Error("Failed to fetch developers");
  return res.json();
}

export async function fetchMonths() {
  const res = await fetch(`${BASE}/months`);
  if (!res.ok) throw new Error("Failed to fetch months");
  return res.json();
}

export async function fetchMetrics(devId, month) {
  const res = await fetch(`${BASE}/metrics?dev_id=${devId}&month=${month}`);
  if (!res.ok) throw new Error("Failed to fetch metrics");
  return res.json();
}

export async function fetchManagerSummary() {
  const res = await fetch(`${BASE}/manager-summary`);
  if (!res.ok) throw new Error("Failed to fetch manager summary");
  return res.json();
}
