import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Hooks
import { useParcelTracking } from '../hooks/useParcelTracking';

// Features
import TrackerHeader from '../features/tracker/TrackerHeader';
import TrackerSearch from '../features/tracker/TrackerSearch';
import TrackerResult from '../features/tracker/TrackerResult';
import TrackerSkeleton from '../components/skeletons/TrackerSkeleton';

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
      className="section-container section-spacing min-h-screen text-center"
    >
      <TrackerHeader />

      <TrackerSearch
        searchId={searchId}
        setSearchId={setSearchId}
        onTrack={() => trackParcel(searchId)}
        loading={loading}
      />

      <section aria-live="polite" className="relative mt-12 md:mt-16 min-h-[400px]">
        {/* LOADING STATE - Professional Skeleton */}
        {loading && <TrackerSkeleton />}


        {/* RESULTS STATE */}
        <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}>
          {!loading && (parcelData || error) ? (
            <TrackerResult
              parcelData={parcelData}
              error={error}
            />
          ) : !loading && searchId && (
            <div className="py-20 text-center opacity-40">
              <p className="text-sm font-semibold tracking-wider text-ink/80">Ready for Search</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes highBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </motion.main>
  );
}