import React from 'react';
import { ChevronRight, Terminal } from 'lucide-react';

export default function HistorySidebar() {
  return (
    <aside className="hidden w-[320px] shrink-0 flex-col border-l border-[#222] bg-[#0f0f0f] lg:flex">
      <div className="flex h-16 items-center justify-between px-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#888]">Operations</span>
        <Terminal size={14} className="text-[#888]" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Section: Today */}
        <div className="mb-4">
          <h4 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-[#444]">Today</h4>
          {[
            "Pinged all nodes (12ms avg)",
            "Deployed firmware v2.5.0",
            "Checked lobby latency",
            "Generated weekly access report"
          ].map((log, i) => (
            <div key={i} className="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-[#888] hover:bg-[#1a1a1a] hover:text-white transition-all">
              <span className="truncate">{log}</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#555]" />
            </div>
          ))}
        </div>

        {/* Section: Yesterday */}
        <div className="mb-4">
          <h4 className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-widest text-[#444]">Yesterday</h4>
          {[
            "Restarted Node Beta",
            "Revoked static API keys",
            "Simulated high-traffic load"
          ].map((log, i) => (
            <div key={i} className="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-[#666] hover:bg-[#1a1a1a] hover:text-white transition-all">
              <span className="truncate">{log}</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#555]" />
            </div>
          ))}
        </div>
      </div>

      {/* User Workspace Info */}
      <div className="border-t border-[#222] p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-ink to-[#f5f5f5]" />
          <div>
            <p className="text-xs font-bold text-white">Admin Workspace</p>
            <p className="text-[10px] font-medium text-[#888]">Pro Plan • 3 Nodes Active</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
