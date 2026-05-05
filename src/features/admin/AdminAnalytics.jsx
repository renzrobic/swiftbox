import React from 'react';
import { Activity } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div 
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center rounded-xl lg:rounded-2xl border-2 border-dashed border-slate-100 p-20 w-full bg-white/50"
    >
      <Activity 
        aria-hidden="true"
        className="mb-4 text-slate-200 animate-pulse" 
        size={48}
      />
      <h3 className="text-xl font-bold uppercase tracking-tighter text-slate-300">
        Observability
      </h3>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-200 mt-2">
        Awaiting Telemetry
      </p>
    </div>
  );
}