const API_BASE = "/api";

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/profile`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}

export async function fetchSkills() {
  const res = await fetch(`${API_BASE}/skills`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function fetchExperience() {
  const res = await fetch(`${API_BASE}/experience`);
  if (!res.ok) throw new Error("Failed to fetch experience");
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}