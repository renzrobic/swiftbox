import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

/**
 * 🔐 SECURE CONFIGURATION
 * Pulling from .env via Vite.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// 🚀 PRODUCTION SAFETY: Ensure all environment variables are loaded
if (Object.values(firebaseConfig).some(v => v === undefined)) {
  console.error(
    "⚠️ SWIFTBOX CRITICAL: One or more Firebase environment variables are missing! " +
    "Check your .env file and ensure keys start with VITE_"
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * Export the database instance.
 * Used in: AdminForm, Tracker, Newsroom, and Team Management.
 */
export const db = getDatabase(app);