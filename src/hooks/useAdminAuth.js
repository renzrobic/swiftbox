import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!api.getToken()); 
  const [userSession, setUserSession] = useState(() => api.getUser());
  const [loading, setLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Restore & verify session on mount
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      const token = api.getToken();
      if (!token) {
        if (isMounted) setIsInitializing(false);
        return;
      }

      try {
        const profile = await api.get('/api/v1/auth/me');
        if (isMounted) {
          setUserSession(profile);
          setIsAuthenticated(true);
        }
      } catch (err) {
        // Token is expired or invalid
        console.warn("Session expired or invalid:", err.message);
        api.clearSession();
        if (isMounted) {
          setIsAuthenticated(false);
          setUserSession(null);
        }
      } finally {
        if (isMounted) setIsInitializing(false);
      }
    };

    restoreSession();

    // Listen for unauthorized events from any API call
    const unsubscribe = api.onUnauthorized(() => {
      if (isMounted) {
        setIsAuthenticated(false);
        setUserSession(null);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const authorize = useCallback(async (passInput) => {
    const key = passInput ? passInput.trim() : '';
    if (!key) {
      alert("Please enter your Access Key.");
      return false;
    }

    setLoading(true);
    
    try {
      // 🛡️ SECURE BACKEND AUTH: Server validates bcrypt/key and issues signed JWT
      const response = await api.post('/api/v1/auth/login', { accessKey: key });
      
      const { token, user } = response;
      if (!token || !user) {
        throw new Error("Invalid authentication payload received from server.");
      }

      api.setSession(token, user);
      setUserSession(user);
      setIsAuthenticated(true);
      return true;

    } catch (err) {
      console.error("Authentication Error:", err);
      if (err.status === 401) {
        alert("ACCESS DENIED: Invalid Terminal Key.");
      } else if (err.status === 429) {
        alert("RATE LIMITED: Too many authentication attempts. Please wait.");
      } else {
        alert(err.message || "Failed to authenticate with SwiftBox Terminal.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    if (window.confirm("Disconnect from terminal session?")) {
      try {
        await api.post('/api/v1/auth/logout');
      } catch (err) {
        // Best effort logout on server
        console.warn("Server logout notification failed:", err.message);
      } finally {
        api.clearSession();
        setIsAuthenticated(false);
        setUserSession(null);
      }
    }
  }, []);

  return { 
    isAuthenticated, 
    userSession, 
    loading: loading || isInitializing, 
    authorize, 
    logout 
  };
}