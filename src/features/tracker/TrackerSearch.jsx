import React from 'react';
import { Loader2, ArrowRight, X } from 'lucide-react';

export default function TrackerSearch({ searchId, setSearchId, onTrack, loading }) {
  return (
    <div className="group mx-auto mb-16 max-w-2xl md:mb-24">
      <div className="flex items-center border-b-2 border-royal-blue/30 pb-4 transition-all duration-500 focus-within:border-royal-blue">
        
        {/* Main Input: font-semibold (Semi-Bold) and non-italic */}
        <input 
          type="text"
          aria-label="Search Parcel ID"
          className="min-w-0 flex-1 border-none bg-transparent text-xl font-semibold tracking-tight text-royal-blue outline-none placeholder:text-royal-blue/50 placeholder:not-italic md:text-2xl"
          placeholder="Enter Parcel ID (e.g. SBX-7721)"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && onTrack()}
        />

        {searchId && !loading && (
          <button 
            type="button"
            aria-label="Clear search"
            onClick={() => setSearchId('')} 
            className="mx-2 text-royal-blue/30 hover:text-royal-blue"
          >
            <X aria-hidden="true" size={18} />
          </button>
        )}

        <button 
          type="button"
          aria-label="Track parcel"
          onClick={onTrack}
          disabled={loading || !searchId.trim()}
          /* Logic identical; rounded-full maintained for circular button design */
          className="ml-4 shrink-0 rounded-full bg-royal-blue p-3 transition-all duration-300 text-white hover:bg-black disabled:opacity-30 md:p-3 shadow-lg hover:shadow-royal-blue/20"
        >
          {loading ? (
            <Loader2 aria-hidden="true" className="animate-spin" size={24} />
          ) : (
            <ArrowRight aria-hidden="true" size={16} />
          )}
        </button>
      </div>
    </div>
  );
}