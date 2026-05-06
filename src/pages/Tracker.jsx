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
      className="mx-auto min-h-screen max-w-7xl px-8 pb-24 pt-32 text-center md:px-10 md:pt-48"
    >
      <TrackerHeader />

      <TrackerSearch
        searchId={searchId}
        setSearchId={setSearchId}
        onTrack={() => trackParcel(searchId)}
        loading={loading}
      />

      <section aria-live="polite" className="relative mt-12 md:mt-16 min-h-[400px]">
        {/* LOADING STATE - Dedicated Overlay */}
        <AnimatePresence>
          {loading && (
            <motion.div
              key="loading-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/40 backdrop-blur-xl py-20"
            >
              <div className="relative flex items-center justify-center py-5">
                {/* 1. Ultra-High Frequency Aura */}
                <div className="absolute h-[250px] w-[250px] rounded-full bg-blue-500/10 blur-[100px] animate-[pulse_1.5s_easeInOut_infinite]" />

                {/* 2. Hyper-Speed Solar Flare Spin */}
                <div className="absolute h-24 w-24 animate-[spin_4s_linear_infinite] opacity-60 saturate-[2.5]">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 h-1 w-24 -translate-y-1/2 origin-left blur-[20px]"
                      style={{
                        transform: `rotate(${i * 30}deg)`,
                        background: `linear-gradient(to right, ${['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4'][i % 6]}, transparent)`
                      }}
                    />
                  ))}
                </div>

                {/* 3. THE RAINBOW STAR BODY - Organic Non-Circular Energy */}
                <div className="relative h-16 w-16 flex items-center justify-center saturate-[3] brightness-[1.2]">

                  {/* Shifting Iridescent Blobs (Non-Circular) */}
                  {[1.5, 2, 3].map((duration, layer) => (
                    <div
                      key={duration}
                      className="absolute inset-0 opacity-90 blur-[20px] animate-[spin_linear_infinite]"
                      style={{
                        animationDuration: `${duration}s`,
                        animationDirection: layer % 2 === 0 ? 'normal' : 'reverse',
                        borderRadius: layer === 0 ? '40% 60% 70% 30% / 50% 40% 60% 50%' : '60% 40% 30% 70% / 60% 30% 70% 40%',
                        background: 'conic-gradient(from 0deg, #2563EB, #7C3AED, #DB2777, #EA580C, #059669, #2563EB)'
                      }}
                    />
                  ))}

                  {/* Surface Corona - Shifting Shape */}
                  <div className="absolute inset-[-10px] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-white/20 blur-[25px] animate-[spin_3s_linear_infinite]" />

                  {/* Core Energy Bloom - Diamond Shape Pulsing Heartbeat */}
                  <motion.div 
                    animate={{
                      scale: [0.85, 1.1, 0.85],
                      rotate: [45, 135, 45],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-3 rounded-[15%] bg-white blur-[12px] shadow-[0_0_40px_rgba(255,255,255,0.8)]" 
                  />
                  
                  {/* The Shifting Singularity - Small Diamond */}
                  <motion.div 
                    animate={{ rotate: [45, 405] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute h-2.5 w-2.5 rounded-[10%] bg-white/60 rotate-45 blur-[1px] shadow-[0_0_10px_white]" 
                  />
                </div>
              </div>

              <div className="mt-16 flex justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="h-2 w-2 rounded-full bg-ink"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULTS STATE */}
        <div className={`transition-opacity duration-700 ${loading ? 'opacity-0 blur-md scale-95' : 'opacity-100 blur-0 scale-100'}`}>
          {!loading && (parcelData || error) ? (
            <TrackerResult
              parcelData={parcelData}
              error={error}
            />
          ) : !loading && searchId && (
            <div className="py-20 text-center opacity-40">
              <p className="text-sm font-medium uppercase tracking-widest text-ink/40">Ready for Search</p>
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