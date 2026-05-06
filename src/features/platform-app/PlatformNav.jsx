import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

export default function PlatformNav() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-6 z-20">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-lg font-black tracking-[0.2em] text-white transition-opacity hover:opacity-70">
          SWIFTBOX<span className="text-ink">.</span>
        </Link>
        <nav className="hidden gap-8 md:flex">
          <span className="text-xs font-bold uppercase tracking-widest text-white cursor-pointer">Workspace</span>
          <span className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white cursor-pointer transition-colors">Nodes</span>
          <span className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-white cursor-pointer transition-colors">API Docs</span>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-full bg-white px-5 py-2 text-[10px] font-black uppercase tracking-widest text-black hover:bg-white/90 transition-colors">
          Upgrade
        </button>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
          <User size={14} />
        </div>
      </div>
    </header>
  );
}
