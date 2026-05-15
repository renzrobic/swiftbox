import React from 'react';
import { Send } from 'lucide-react';

export default function CommandInput({ prompt, setPrompt }) {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent pt-32 pb-8 px-6 z-30">
      <div className="mx-auto max-w-3xl relative flex items-center">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Deploy update or search telemetry..." 
          className="w-full rounded-[2.5rem] bg-[#1a1a1a] border border-[#333] py-5 pl-8 pr-16 text-base text-white placeholder-[#666] focus:border-[#555] focus:bg-[#222] focus:outline-none transition-all shadow-xl"
        />
        <button className={`absolute right-3 flex h-11 w-11 items-center justify-center rounded-full transition-all ${prompt.length > 0 ? 'bg-white text-black hover:scale-105' : 'bg-[#333] text-[#888] cursor-not-allowed'}`}>
          <Send size={18} className={prompt.length > 0 ? 'ml-0.5' : ''} />
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#555]">
        <span className="cursor-pointer hover:text-white transition-colors">/deploy</span>
        <span className="cursor-pointer hover:text-white transition-colors">/logs</span>
        <span className="cursor-pointer hover:text-white transition-colors">/ping</span>
      </div>
    </div>
  );
}
