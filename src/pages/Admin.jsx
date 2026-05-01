import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { motion } from 'framer-motion';

// Component Imports
import AdminHeader from '../components/AdminHeader';
import LoginGateway from '../components/LoginGateway';
import RegistrationColumn from '../components/RegistrationColumn';
import MonitoringGrid from '../components/MonitoringGrid';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [lockers, setLockers] = useState({});

  // Real-time listener for locker nodes
  useEffect(() => {
    if (!isAuthenticated) return;
    const lockersRef = ref(db, 'lockers');
    const unsubscribe = onValue(lockersRef, (snapshot) => {
      setLockers(snapshot.val() || {});
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  // Authorization logic
  const handleAuthorize = () => {
    if (passInput === 'SWIFT2026') {
      setIsAuthenticated(true);
    } else {
      alert('Access Denied: Invalid Terminal Key');
    }
  };

  // 1. Guard Clause: Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginGateway 
        passInput={passInput} 
        setPassInput={setPassInput} 
        onAuthorize={handleAuthorize} 
      />
    );
  }

  // 2. Main Dashboard Layout
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full overflow-x-hidden bg-white min-h-screen"
    >
      <AdminHeader onTerminate={() => setIsAuthenticated(false)} />

      <main className="mx-auto max-w-7xl px-8 pb-24 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <RegistrationColumn />
          <MonitoringGrid lockers={lockers} />
        </div>
      </main>
    </motion.div>
  );
}