import React from 'react';
import { AnimatePresence } from 'framer-motion';
import LockerCard from './LockerCard';

export default function MonitoringGrid({ lockers }) {
  return (
    <section className="lg:col-span-8 order-1 lg:order-2">
      <div className="mb-8 border-b-2 border-royal-blue/30 pb-4">
        <h3 className="text-xs font-semibold text-royal-blue/70 uppercase tracking-[0.2em]">
          Node Intelligence Grid
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {Object.entries(lockers).map(([id, data]) => (
            <LockerCard key={id} id={id} data={data} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}