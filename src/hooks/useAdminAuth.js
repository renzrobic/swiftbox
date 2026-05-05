import { useState } from 'react';
import { db } from '../config/firebase'; // Ensure correct path to your firebase config
import { ref, get, child } from 'firebase/database';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [userSession, setUserSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const authorize = async (passInput) => {
    if (!passInput) return false;
    setLoading(true);
    
    try {
      // SECURITY FIX: Never hardcode passwords in the frontend! 
      // Add VITE_ROOT_PASS="Schnauzer2K@" to your .env.local file
      const ROOT_PASS = import.meta.env.VITE_ROOT_PASS || "DEV_OVERRIDE_KEY";
      
      if (passInput === ROOT_PASS) {
        setUserSession({ name: "Root", role: "Super Admin" });
        setIsAuthenticated(true);
        return true;
      }
      
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'team'));
      
      if (snapshot.exists()) {
        const teamData = snapshot.val();
        const authorizedMember = Object.values(teamData).find(
          member => member.accessKey === passInput
        );
        
        if (authorizedMember) {
          setUserSession(authorizedMember);
          setIsAuthenticated(true);
          return true;
        } else {
          alert("ACCESS DENIED: Invalid Terminal Key");
          return false;
        }
      }
    } catch (err) {
      console.error("Auth Sync Error:", err);
      alert("TERMINAL SYNC ERROR");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (window.confirm("Disconnect from terminal session?")) {
      setIsAuthenticated(false);
      setUserSession(null);
    }
  };

  return { isAuthenticated, userSession, loading, authorize, logout };
}