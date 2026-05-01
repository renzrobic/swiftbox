import React from 'react';
import { motion } from 'framer-motion';
import { Box, Smartphone, Activity } from 'lucide-react';

export default function LockerCard({ id, data }) {
  const isOccupied = data.status === 'OCCUPIED';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`p-8 md:p-10 flex flex-col justify-between h-[300px] md:h-[320px] rounded-3xl transition-colors duration-500 border-2 ${
        isOccupied ? 'bg-royal-blue border-royal-blue text-white' : 'bg-white border-royal-blue/30 text-royal-blue shadow-sm'
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-10">
          <div className={`p-4 rounded-xl ${isOccupied ? 'bg-white/10' : 'bg-royal-blue/5'}`}>
            <Box size={24} strokeWidth={isOccupied ? 2.5 : 2} />
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isOccupied ? 'text-white/70' : 'text-royal-blue/70'}`}>
            Node_{id}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tighter uppercase leading-none">
          {isOccupied ? 'Occupied' : 'Vacant'}
        </h3>
      </div>

      {isOccupied ? (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-xs font-bold opacity-80 tracking-tight">
            <Smartphone size={14} /> {data.recipient_phone}
          </div>
          <div className="bg-white/10 p-4 border-2 border-white/20 flex justify-between items-center rounded-xl">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Auth_PIN</span>
            <span className="text-xl font-bold tracking-widest">{data.claim_pin}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest opacity-70">
          <Activity size={12} /> Standby Mode
        </div>
      )}
    </motion.div>
  );
}