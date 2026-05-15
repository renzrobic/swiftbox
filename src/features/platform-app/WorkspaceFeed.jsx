import React from 'react';
import { Box, Activity } from 'lucide-react';

export default function WorkspaceFeed() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="mx-auto max-w-5xl pb-32 pt-12 md:pt-24">
        
        {/* Empty State / Welcome */}
        <div className="flex flex-col items-center justify-center text-center animate-fade-in-up">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#141414] border border-[#222] shadow-sm">
            <Box size={36} className="text-white/80" />
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-[#f3f3f3] md:text-6xl lg:text-7xl">
            What will we automate?
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[#888]">
            Deploy firmware, generate analytics, or monitor real-time node telemetry across your campus infrastructure.
          </p>
        </div>

        {/* Mock Generation Feed */}
        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
           
           {/* Telemetry Card */}
           <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#141414] border border-[#222] cursor-pointer hover:border-[#444] transition-colors shadow-sm">
             <div className="absolute inset-0 flex items-center justify-center">
                <Activity size={48} className="text-[#333] group-hover:text-ink transition-colors duration-500" />
             </div>
             <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
               <div>
                 <p className="text-xs font-medium text-white">Telemetry Sync</p>
                 <p className="text-[10px] text-[#888]">Node Alpha • 2m ago</p>
               </div>
               <div className="h-2 w-2 rounded-full bg-electric-lime" />
             </div>
           </div>

           {/* Video Stream Card */}
           <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#141414] border border-[#222] cursor-pointer hover:border-[#444] transition-colors md:col-span-2 shadow-sm">
             <img src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&w=1200&q=80" alt="Locker" className="h-full w-full object-cover opacity-30 grayscale transition-all duration-[2s] ease-out group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
             <div className="absolute bottom-5 left-5 right-5">
               <p className="text-xs font-medium text-white">Live Camera Feed</p>
               <p className="text-[10px] text-[#888]">Lobby Unit 02 • Actuating...</p>
             </div>
           </div>

        </div>

      </div>
    </main>
  );
}
