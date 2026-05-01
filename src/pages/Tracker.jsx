import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, get, child } from 'firebase/database';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import TrackerHeader from '../components/TrackerHeader';
import TrackerSearch from '../components/TrackerSearch';
import TrackerResult from '../components/TrackerResult';

export default function Tracker() {
  const [searchId, setSearchId] = useState('');
  const [parcelData, setParcelData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    const trimmedId = searchId.trim();
    if (!trimmedId) return;

    setLoading(true);
    setError(false);
    setParcelData(null);
    
    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, 'lockers'));
      
      if (snapshot.exists()) {
        const lockers = snapshot.val();
        // Search through all locker nodes for the matching parcel ID
        const foundEntry = Object.entries(lockers).find(
          ([_, data]) => data.parcel_id?.toUpperCase() === trimmedId.toUpperCase()
        );

        if (foundEntry) {
          setParcelData({ lockerId: foundEntry[0], ...foundEntry[1] });
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Critical tracking error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="mx-auto min-h-screen max-w-7xl px-8 pb-24 pt-32 md:px-10 md:pt-48"
    >
      <TrackerHeader />
      
      <TrackerSearch 
        searchId={searchId} 
        setSearchId={setSearchId} 
        onTrack={handleTrack} 
        loading={loading} 
      />

      <AnimatePresence mode="wait">
        {/* TrackerResult handles both the success display and error state internally */}
        <TrackerResult parcelData={parcelData} error={error} />
      </AnimatePresence>
    </motion.div>
  );
}