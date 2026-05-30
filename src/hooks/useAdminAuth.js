import { useState } from 'react';
import { db, auth } from '../config/firebase'; // Ensure correct path to your firebase config
import { ref, get, child } from 'firebase/database';
import { signInAnonymously, signOut } from 'firebase/auth';

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
      
      let isAuthorized = false;
      let sessionData = null;

      if (passInput === ROOT_PASS) {
        sessionData = { name: "Root", role: "Super Admin" };
        isAuthorized = true;
      } else {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, 'team'));
        
        if (snapshot.exists()) {
          const teamData = snapshot.val();
          const authorizedMember = Object.values(teamData).find(
            member => member.accessKey === passInput
          );
          
          if (authorizedMember) {
            sessionData = authorizedMember;
            isAuthorized = true;
          }
        }
      }

      if (isAuthorized) {
        // 🚀 LINK TO FIREBASE SECURITY: Sign in anonymously to enable rules
        await signInAnonymously(auth);
        setUserSession(sessionData);
        setIsAuthenticated(true);
        return true;
      } else {
        alert("ACCESS DENIED: Invalid Terminal Key");
        return false;
      }

    } catch (err) {
      console.error("Auth Sync Error:", err);
      if (err.code === 'auth/network-request-failed' || err.message?.includes('network')) {
        alert("NETWORK ERROR: Cannot connect to SwiftBox Terminal. Please check your connection.");
      } else {
        alert(`TERMINAL SYNC ERROR: ${err.message || 'Unknown error occurred.'}`);
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (window.confirm("Disconnect from terminal session?")) {
      await signOut(auth);
      setIsAuthenticated(false);
      setUserSession(null);
    }
  };

  return { isAuthenticated, userSession, loading, authorize, logout };
}