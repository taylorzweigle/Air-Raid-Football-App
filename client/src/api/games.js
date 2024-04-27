//Taylor Zweigle, 2024
const API_URL =
  process.env.NODE_ENV === "production" ? "https://air-raid-football-app-server.vercel.app" : "http://localhost:5000";

export const getGames = async (token) => {
  const res = await fetch(`${API_URL}/api/games`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const getGame = async (id, token) => {
  const res = await fetch(`${API_URL}/api/games/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const createGame = async (body, token) => {
  const res = await fetch(`${API_URL}/api/games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const deleteGame = async (id, token) => {
  const res = await fetch(`${API_URL}/api/games/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};

export const updateGame = async (id, body, token) => {
  const res = await fetch(`${API_URL}/api/games/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (!res.ok) {
    return { json: null, error: json.error };
  }
  if (res.ok) {
    return { json: json, error: "" };
  }
};
