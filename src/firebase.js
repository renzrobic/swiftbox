import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbTppmdXPr8Dc0G1oBaSxmiblKdMcR-x4",
  authDomain: "swiftbox-project.firebaseapp.com",
  databaseURL: "https://swiftbox-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "swiftbox-project",
  storageBucket: "swiftbox-project.firebasestorage.app",
  messagingSenderId: "919571833097",
  appId: "1:919571833097:web:a3b926c420415cb2bd33d8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database instance so other pages can use it
export const db = getDatabase(app);