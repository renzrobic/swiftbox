import React from 'react';
import { LogOut } from 'lucide-react';

export default function AdminHeader({ onTerminate }) {
  return (
    <header className="mx-auto max-w-7xl px-8 pt-32 pb-16 md:px-10 md:pb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
      <div>
        <h2 className="text-5xl md:text-8xl font-semibold text-royal-blue tracking-tighter leading-[0.85] uppercase">
          Logistics <br /> Control.
        </h2>
        <div className="flex items-center gap-3 mt-6">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-[10px] font-semibold text-royal-blue/70 tracking-[0.2em] uppercase">
            System Core: Active
          </p>
        </div>
      </div>
      <button 
        onClick={onTerminate}
        className="group flex items-center gap-3 text-royal-blue font-semibold tracking-widest text-[10px] uppercase border-b-2 border-transparent hover:border-royal-blue pb-1 transition-all"
      >
        <LogOut size={14} /> Terminate Session
      </button>
    </header>
  );
}