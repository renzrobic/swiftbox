import React from 'react';
import { motion } from 'framer-motion';

export default function LockerCard({ id, data }) {
  // 🚀 OPTIMIZATION: Added optional chaining (?) to prevent fatal crashes if data is missing
  const isOccupied = data?.status === 'OCCUPIED';

  return (
    <motion.div 
      layout 
      className={`p-6 flex flex-col justify-between h-[260px] rounded-[1.5rem] transition-all border-2 ${
        isOccupied ? 'bg-ink border-ink text-white shadow-lg' : 'bg-white border-ink/10 text-ink'
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-10">
          <span className="text-[10px] font-semibold tracking-wider opacity-80">
            Node_{id}
          </span>
          {/* Added aria-hidden to decorative dot */}
          <div 
            aria-hidden="true" 
            className={`h-2 w-2 rounded-full ${isOccupied ? 'bg-white animate-pulse' : 'bg-ink/20'}`} 
          />
        </div>
        
        {/* Added aria-live so screen readers announce real-time status changes */}
        <h3 
          aria-live="polite" 
          className="text-3xl font-semibold tracking-tighter leading-none"
        >
          {isOccupied ? 'Occupied' : 'Vacant'}
        </h3>
      </div>
      
      {isOccupied ? (
        <div className="bg-white/10 p-4 rounded-xl border border-white/10">
           <span className="text-[9px] font-semibold tracking-wider opacity-80 block mb-1">
             Authorization
           </span>
           <span className="text-2xl font-semibold tracking-tight leading-none">
             {data?.claim_pin || '---'}
           </span>
        </div>
      ) : (
        <span className="text-[9px] font-semibold tracking-wider opacity-40">
          Standby
        </span>
      )}
    </motion.div>
  );
}