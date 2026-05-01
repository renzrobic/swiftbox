import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

export default function TrackerSearch({ searchId, setSearchId, onTrack, loading }) {
  return (
    <div className="group mb-16 max-w-2xl md:mb-24">
      <div className="flex items-center border-b-2 border-royal-blue/30 pb-4 transition-all duration-500 focus-within:border-royal-blue">
        <input 
          className="min-w-0 flex-1 border-none bg-transparent text-xl font-semibold tracking-tight text-royal-blue outline-none placeholder:text-royal-blue/50 md:text-2xl"
          placeholder="Enter Tracking ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onTrack()}
        />
        <button 
          onClick={onTrack}
          disabled={loading || !searchId.trim()}
          className="ml-4 shrink-0 rounded-full bg-royal-blue p-3 transition-all duration-300 text-white hover:bg-black disabled:opacity-30 md:p-4"
        >
          {loading ? <Loader2 className="animate-spin" size={24} /> : <ArrowRight size={24} />}
        </button>
      </div>
      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-royal-blue/70">
        Secure encrypted Search Protocol
      </p>
    </div>
  );
}