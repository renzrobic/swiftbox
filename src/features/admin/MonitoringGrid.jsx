import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LockerCard from '../../components/ui/LockerCard'; // Make sure this path points to your UI folder!

const RECENT_LOGS = [
  { id: 'SBX-7721', node: 'L01', merchant: 'AMAZON', status: 'CLAIMED' },
  { id: 'SBX-9012', node: 'L03', merchant: 'LAZADA', status: 'IN_TERMINAL' },
  { id: 'SBX-4432', node: 'L02', merchant: 'ZALORA', status: 'COMPLETED' },
];

export default function MonitoringGrid({ lockers }) {
  // Safe fallback to prevent crashes if Firebase returns null
  const lockerEntries = Object.entries(lockers || {});

  return (
    <section className="w-full max-w-full space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {lockerEntries.map(([id, data]) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <LockerCard id={id} data={data} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:rounded-2xl">
        <div className="space-y-2">
          <div className="grid grid-cols-4 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
            <span>ID</span>
            <span>Node</span>
            <span>Merchant</span>
            <span className="text-right">Status</span>
          </div>
          
          {RECENT_LOGS.map((log) => (
            <div 
              key={log.id} 
              className="grid grid-cols-4 border-t border-slate-50 px-4 py-3 text-[11px] font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              <span className="font-mono text-royal-blue">{log.id}</span>
              <span>{log.node}</span>
              <span className="truncate">{log.merchant}</span>
              <span className={`text-right ${log.status === 'CLAIMED' ? 'text-green-500' : 'text-royal-blue'}`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}