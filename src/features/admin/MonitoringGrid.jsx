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

      <div className="rounded-xl border border-ink/10 bg-white p-4 md:p-6 shadow-sm lg:rounded-2xl">
        <div className="space-y-4">
          <h3 className="px-2 text-[9px] font-black uppercase tracking-[0.3em] text-ink/40">Live Traffic Logs</h3>
          
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 px-4 py-2 text-[9px] font-black uppercase tracking-widest text-ink/40">
              <span>ID</span>
              <span>Node</span>
              <span>Merchant</span>
              <span className="text-right">Status</span>
            </div>
            {RECENT_LOGS.map((log) => (
              <div 
                key={log.id} 
                className="grid grid-cols-4 border-t border-ink/5 px-4 py-3 text-[11px] font-bold text-ink transition-colors hover:bg-ink/5"
              >
                <span className="font-mono text-ink">{log.id}</span>
                <span>{log.node}</span>
                <span className="truncate">{log.merchant}</span>
                <span className={`text-right ${log.status === 'CLAIMED' ? 'text-green-500' : 'text-ink'}`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile Card View */}
          <div className="flex flex-col gap-3 md:hidden">
            {RECENT_LOGS.map((log) => (
              <div key={log.id} className="flex flex-col gap-2 rounded-xl border border-ink/10 bg-ink/5 p-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] font-bold text-ink">{log.id}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${log.status === 'CLAIMED' ? 'text-green-600' : 'text-ink/60'}`}>
                    {log.status}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase tracking-widest text-ink/40">Merchant</span>
                    <span className="text-xs font-bold text-ink">{log.merchant}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black uppercase tracking-widest text-ink/40">Node</span>
                    <span className="text-xs font-bold text-ink">{log.node}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}