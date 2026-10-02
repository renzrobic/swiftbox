import { useState, useCallback, useRef, useEffect } from 'react';
import { api } from '../services/api';

export function useParcelTracking() {
  const [parcelData, setParcelData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const abortControllerRef = useRef(null);

  const trackParcel = useCallback(async (searchId) => {
    const trimmedId = searchId.trim();
    if (!trimmedId) return;

    // Abort existing request if one is already in progress
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(false);
    setParcelData(null);
    
    try {
      // 🛡️ UNIFIED API CLIENT: Query canonical tracking endpoint
      const data = await api.get(`/api/v1/tracking/${trimmedId.toUpperCase()}`, {
        signal: controller.signal
      });
      
      setParcelData(data);

    } catch (err) {
      // Don't flag an error if we intentionally aborted it
      if (err.name !== 'AbortError' && err.code !== 'REQUEST_TIMEOUT') {
        console.error("Tracking connection error:", err);
        setError(true);
      }
    } finally {
      // Only clear loading state if this is still the active request
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, []);

  // Cleanup pending requests on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { parcelData, error, loading, trackParcel };
}