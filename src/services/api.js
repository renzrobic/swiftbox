/**
 * SWIFTBOX CENTRAL API CLIENT
 * 
 * Provides unified, secure HTTP communication with swiftbox-backend.
 * Handles:
 * - JWT Authorization header injection from sessionStorage
 * - Dynamic base URL resolution
 * - JSON serialization & deserialization
 * - Standardized error translation (400, 401, 403, 404, 429, 500)
 * - Automatic session eviction on 401 TOKEN_EXPIRED
 * - Request timeouts via AbortController
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const TOKEN_STORAGE_KEY = 'swiftbox_token';
const USER_STORAGE_KEY = 'swiftbox_user';
const DEFAULT_TIMEOUT_MS = 10000;

let unauthorizedListeners = [];

class ApiError extends Error {
  constructor(message, status, code, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code || 'API_ERROR';
    this.details = details;
  }
}

export const api = {
  /**
   * Register a listener for 401 / session expiry events
   */
  onUnauthorized(listener) {
    unauthorizedListeners.push(listener);
    return () => {
      unauthorizedListeners = unauthorizedListeners.filter(l => l !== listener);
    };
  },

  /**
   * Notify all registered listeners when session expires
   */
  notifyUnauthorized(err) {
    api.clearSession();
    unauthorizedListeners.forEach(fn => {
      try { fn(err); } catch (e) { console.error("Error in unauthorized listener:", e); }
    });
  },

  /**
   * Token & Session Management
   */
  getToken() {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY);
  },

  getUser() {
    try {
      const stored = sessionStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  setSession(token, user) {
    if (token) sessionStorage.setItem(TOKEN_STORAGE_KEY, token);
    if (user) sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  clearSession() {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(USER_STORAGE_KEY);
  },

  /**
   * Core request wrapper
   */
  async request(endpoint, options = {}) {
    const {
      method = 'GET',
      data = null,
      headers = {},
      timeout = DEFAULT_TIMEOUT_MS,
      signal
    } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Merge external abort signal if provided
    if (signal) {
      signal.addEventListener('abort', () => controller.abort());
    }

    const requestHeaders = {
      'Accept': 'application/json',
      ...headers
    };

    if (data && !(data instanceof FormData)) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    const token = api.getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      method,
      headers: requestHeaders,
      signal: controller.signal
    };

    if (data) {
      config.body = (data instanceof FormData) ? data : JSON.stringify(data);
    }

    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${API_BASE_URL}${cleanEndpoint}`;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      let payload = null;
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        payload = await response.json();
      } else {
        payload = await response.text();
      }

      if (!response.ok) {
        const errorMessage = (typeof payload === 'object' && (payload?.error?.message || payload?.error || payload?.message)) 
          || `Request failed with status ${response.status}`;
        const errorCode = (typeof payload === 'object' && (payload?.error?.code || payload?.code)) 
          || `HTTP_${response.status}`;
        const details = (typeof payload === 'object' && payload?.error?.details) || null;

        const apiErr = new ApiError(errorMessage, response.status, errorCode, details);

        // Auto handle 401 Unauthorized / Token Expired
        if (response.status === 401) {
          api.notifyUnauthorized(apiErr);
        }

        throw apiErr;
      }

      // If backend wrapped in canonical envelope { success: true, data: ... }
      if (payload && typeof payload === 'object' && 'success' in payload && 'data' in payload) {
        return payload.data;
      }

      return payload;

    } catch (err) {
      clearTimeout(timeoutId);

      if (err.name === 'AbortError') {
        throw new ApiError('Request timed out. Please check your connection.', 408, 'REQUEST_TIMEOUT');
      }

      if (err instanceof ApiError) {
        throw err;
      }

      throw new ApiError(err.message || 'Network connection failed.', 0, 'NETWORK_ERROR');
    }
  },

  get(endpoint, options = {}) {
    return api.request(endpoint, { ...options, method: 'GET' });
  },

  post(endpoint, data, options = {}) {
    return api.request(endpoint, { ...options, method: 'POST', data });
  },

  put(endpoint, data, options = {}) {
    return api.request(endpoint, { ...options, method: 'PUT', data });
  },

  delete(endpoint, options = {}) {
    return api.request(endpoint, { ...options, method: 'DELETE' });
  }
};

// Export legacy secureApi alias for backward compatibility if imported elsewhere
export const secureApi = {
  post: (endpoint, data) => api.post(endpoint, data),
  get: (endpoint) => api.get(endpoint)
};

export default api;
