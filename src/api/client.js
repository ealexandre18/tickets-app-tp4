const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(chemin, options = {}) {
  const token = localStorage.getItem("token");

  const reponse = await fetch(`${API_URL}${chemin}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (reponse.status === 401 && chemin !== "/login") {
    window.dispatchEvent(new Event("session-expiree"));
  }

  if (!reponse.ok) {
    let message = `Erreur ${reponse.status}`;
    try {
      const data = await reponse.json();
      if (data && data.message) {
        message = data.message;
      }
    } catch {
      message = `Erreur ${reponse.status}`;
    }
    throw new Error(message);
  }

  if (reponse.status === 204) {
    return null;
  }

  return reponse.json();
}
