const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY;

/**
 * 🛡️ SECURE API CLIENT
 * Centralizes all backend interactions with security headers.
 */
export const secureApi = {
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ADMIN_API_KEY
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API Request Failed');
    }

    return response.json();
  },

  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'x-api-key': ADMIN_API_KEY
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API Request Failed');
    }

    return response.json();
  }
};
