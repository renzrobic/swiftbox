import React from 'react';
import { Loader2, ArrowRight, X } from 'lucide-react';

export default function TrackerSearch({ searchId, setSearchId, onTrack, loading }) {
  return (
    <div className="mx-auto mb-16 max-w-2xl md:mb-24">
      <div className={`flex items-center gap-3 rounded-full border border-ink/10 bg-white p-2 pl-8 transition-all duration-500 focus-within:scale-[1.02] focus-within:border-ink/20 focus-within:active-glow hover:active-glow ${searchId ? 'active-glow' : ''}`}>
        
        {/* Interactive Input: Glow triggers on typing or hover state */}
        <input 
          type="text"
          aria-label="Search Parcel ID"
          className="min-w-0 flex-1 border-none bg-transparent py-4 text-xl font-semibold tracking-tight text-ink outline-none placeholder:text-ink/20 placeholder:not-italic md:text-2xl"
          placeholder="Enter Parcel ID (SBX-7721)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && onTrack()}
        />

        <div className="flex items-center gap-2 pr-2">
          {searchId && !loading && (
            <button 
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchId('')} 
              className="p-2 text-ink/20 hover:text-ink transition-colors"
            >
              <X aria-hidden="true" size={20} />
            </button>
          )}

          <button 
            type="button"
            aria-label="Track parcel"
            onClick={onTrack}
            disabled={loading || !searchId.trim()}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-all duration-300 hover:bg-black hover:-translate-y-0.5 active:scale-95 disabled:opacity-30 btn-ai-glow"
          >
            {loading ? (
              <Loader2 aria-hidden="true" className="animate-spin" size={24} />
            ) : (
              <ArrowRight aria-hidden="true" size={24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}