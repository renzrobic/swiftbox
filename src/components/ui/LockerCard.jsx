import React from 'react';
import { motion } from 'framer-motion';

export default function LockerCard({ id, data }) {
  // 🚀 OPTIMIZATION: Added optional chaining (?) to prevent fatal crashes if data is missing
  const isOccupied = data?.status === 'OCCUPIED';

  return (
    <motion.div 
      layout 
      className={`p-6 flex flex-col justify-between h-[260px] rounded-xl lg:rounded-2xl transition-all border-2 ${
        isOccupied ? 'bg-royal-blue border-royal-blue text-white shadow-lg' : 'bg-white border-slate-100 text-royal-blue'
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-10">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
            Node_{id}
          </span>
          {/* Added aria-hidden to decorative dot */}
          <div 
            aria-hidden="true" 
            className={`h-2 w-2 rounded-full ${isOccupied ? 'bg-white animate-pulse' : 'bg-royal-blue/20'}`} 
          />
        </div>
        
        {/* Added aria-live so screen readers announce real-time status changes */}
        <h3 
          aria-live="polite" 
          className="text-3xl font-bold tracking-tighter uppercase leading-none"
        >
          {isOccupied ? 'Occupied' : 'Vacant'}
        </h3>
      </div>
      
      {isOccupied ? (
        <div className="bg-white/10 p-4 rounded-xl border border-white/10">
           <span className="text-[8px] font-black uppercase tracking-widest opacity-60 block mb-1">
             Authorization
           </span>
           <span className="text-2xl font-bold tracking-[0.2em] leading-none">
             {data?.claim_pin || '---'}
           </span>
        </div>
      ) : (
        <span className="text-[9px] font-black uppercase tracking-widest opacity-30">
          Standby
        </span>
      )}
    </motion.div>
  );
}