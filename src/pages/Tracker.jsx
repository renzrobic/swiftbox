import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hooks
import { useParcelTracking } from '../hooks/useParcelTracking';

// Features
import TrackerHeader from '../features/tracker/TrackerHeader';
import TrackerSearch from '../features/tracker/TrackerSearch';
import TrackerResult from '../features/tracker/TrackerResult';

export default function Tracker() {
  // UI State
  const [searchId, setSearchId] = useState('');
  
  // API Logic extracted to custom hook
  const { parcelData, error, loading, trackParcel } = useParcelTracking();

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      // Removed the redundant onKeyDown here!
      className={`mx-auto min-h-screen max-w-7xl px-8 pb-24 pt-32 text-center md:px-10 md:pt-48 ${
        loading ? 'pointer-events-none' : ''
      }`}
    >
      <TrackerHeader />
      
      <TrackerSearch 
        searchId={searchId} 
        setSearchId={setSearchId} 
        onTrack={() => trackParcel(searchId)} 
        loading={loading} 
      />

      <section aria-live="polite" className="mt-12 md:mt-16">
        <AnimatePresence mode="wait">
          {/* Conditional rendering managed cleanly via AnimatePresence */}
          <TrackerResult 
            key={parcelData?.parcel_id || 'no-data'} 
            parcelData={parcelData} 
            error={error} 
          />
        </AnimatePresence>
      </section>
    </motion.main>
  );
}