import React from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%',
        // 🟢 Makes the loader non-interactable the moment it moves
        pointerEvents: 'none', 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-royal-blue pointer-events-auto"
    >
      <div className="relative flex items-center justify-center">
        {/* Modern Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 rounded-full border-2 border-white/10 border-t-white"
        />
        {/* Glow behind spinner */}
        <div className="absolute h-16 w-16 animate-pulse rounded-full bg-white/5 blur-xl" />
      </div>
    </motion.div>
  );
}