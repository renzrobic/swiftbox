import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import L from 'leaflet';
import { Truck, Clock, CheckCircle2, MousePointer2, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// --- LOGIC PRESERVED: Constants ---
const PHILIPPINES_CENTER = [12.8797, 121.7740];
const DEFAULT_COORDS = [7.8285, 123.4355];

const truckIcon = L.divIcon({
  html: `<div class="relative">
          <div class="absolute -inset-4 bg-royal-blue/30 rounded-full animate-ping"></div>
          <div class="absolute -inset-8 bg-royal-blue/10 rounded-full animate-pulse"></div>
          <div class="relative bg-royal-blue p-2.5 rounded-full border-2 border-white shadow-2xl text-white flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-2.035-2.54A1 1 0 0 0 17.02 10H15v8"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
          </div>
        </div>`,
  className: 'custom-icon', 
  iconSize: [40, 40],
});

// --- LOGIC PRESERVED: MapController ---
function MapController({ coords, isNewSearch, setLocked }) {
  const map = useMap();
  useEffect(() => {
    let timer1, timer2;
    if (coords && isNewSearch) {
      map.setView(PHILIPPINES_CENTER, 5);
      timer1 = setTimeout(() => {
        map.flyTo(coords, 16, { duration: 3.5 });
        timer2 = setTimeout(() => setLocked(false), 4000);
      }, 500);
    } else if (coords) {
      map.setView(coords, 16);
      setLocked(false);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [coords, map, isNewSearch, setLocked]);
  return null;
}

export default function TrackerResult({ parcelData, error }) {
  const [mapLocked, setMapLocked] = useState(true);
  const lastId = useRef(null);
  
  // --- LOGIC PRESERVED: New Search detection ---
  const isNewSearch = lastId.current !== parcelData?.parcel_id;
  useEffect(() => { 
    if (parcelData) lastId.current = parcelData.parcel_id; 
  }, [parcelData]);

  if (error || !parcelData) return null;

  const currentCoords = parcelData.coords || DEFAULT_COORDS;
  const isAtSchool = parcelData.status === "IN_TERMINAL";
  const history = parcelData.history || [];

  return (
    <div className="space-y-6 mt-12 text-left">
      
      {/* ── MAP VIEWPORT ── */}
      <motion.div 
        aria-label="Interactive package tracking map"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="group relative h-[450px] md:h-[550px] w-full rounded-xl lg:rounded-2xl border border-royal-blue/10 overflow-hidden shadow-2xl z-0 bg-cool-white"
        onClick={() => setMapLocked(false)}
      >
        <MapContainer 
          center={currentCoords} 
          zoom={5} 
          style={{ height: '100%', width: '100%' }} 
          zoomControl={false} // UX: Keep controls hidden until unlocked
          dragging={!mapLocked} 
          scrollWheelZoom={!mapLocked}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <Marker position={currentCoords} icon={truckIcon} />
          <MapController coords={currentCoords} isNewSearch={isNewSearch} setLocked={setMapLocked} />
        </MapContainer>

        {/* Unlocked Map Controls Tooltip */}
        <AnimatePresence>
          {mapLocked && (
            <motion.div 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-[1001] bg-royal-blue/5 backdrop-blur-[2px] flex items-center justify-center cursor-pointer group-hover:bg-royal-blue/10 transition-colors"
            >
              {/* Changed to button for accessibility */}
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMapLocked(false);
                }}
                className="bg-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-royal-blue/20"
              >
                <MousePointer2 aria-hidden="true" size={18} className="text-royal-blue animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-widest text-royal-blue">Click to interact with map</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Status Island: Optimized Location Label */}
        <div className="absolute top-6 left-6 right-6 md:right-auto z-[1000]">
          <div className="bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-xl lg:rounded-2xl shadow-2xl border border-royal-blue/10 flex items-center gap-5">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl lg:rounded-2xl ${isAtSchool ? 'bg-green-50' : 'bg-royal-blue/5'}`}>
               <Navigation aria-hidden="true" size={22} className={isAtSchool ? 'text-green-600' : 'text-royal-blue'} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                 <div className={`h-2 w-2 rounded-full ${isAtSchool ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                 <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-royal-blue/40">
                    {isAtSchool ? 'Secure at Terminal' : 'In Transit (Live)'}
                 </p>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-royal-blue uppercase tracking-tight leading-none">
                {parcelData.location}
              </h4>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── DATA GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Traceability Module */}
        <div className="lg:col-span-8 rounded-xl lg:rounded-2xl bg-white p-8 md:p-12 border border-royal-blue/10 shadow-sm">
          <div className="mb-10 flex items-center justify-between">
            <h4 className="text-[10px] font-bold uppercase text-royal-blue/30 tracking-[0.2em] flex items-center gap-2">
              <Clock aria-hidden="true" size={16}/> Node Traceability
            </h4>
            <span className="text-[10px] font-bold uppercase text-royal-blue/20 tracking-widest">
              Updated: Just Now
            </span>
          </div>

          <div className="space-y-10 relative">
            <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-royal-blue/5" />
            {history.map((step, i) => (
              <div key={i} className="flex gap-8 relative group/step">
                <div className={`h-12 w-12 rounded-xl lg:rounded-2xl border-4 border-white flex items-center justify-center shadow-md z-10 transition-all duration-500 
                  ${step.current 
                    ? 'bg-royal-blue text-white ring-4 ring-royal-blue/10 scale-110' 
                    : 'bg-royal-blue/5 text-royal-blue/30 group-hover/step:bg-royal-blue/10'}`}>
                  {step.current ? <CheckCircle2 aria-hidden="true" size={24} /> : <div className="h-2 w-2 rounded-full bg-current" />}
                </div>
                <div className="flex flex-col justify-center">
                  <p className={`text-lg font-bold uppercase leading-none tracking-tight ${step.current ? 'text-royal-blue' : 'text-royal-blue/30'}`}>
                    {step.status}
                  </p>
                  <p className="text-[11px] font-bold text-royal-blue/40 uppercase mt-1.5 tracking-wider">
                    {step.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Identifier Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex-1 rounded-xl lg:rounded-2xl bg-royal-blue bg-gradient-to-br from-royal-blue to-blue-800 p-10 text-white shadow-xl flex flex-col justify-between overflow-hidden relative">
            {/* Subtle bg icon */}
            <Truck aria-hidden="true" size={140} className="absolute -bottom-10 -right-10 opacity-10 -rotate-12 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="bg-white/10 w-12 h-12 flex items-center justify-center rounded-xl lg:rounded-2xl mb-8">
                <Truck aria-hidden="true" size={24} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-3">Locker Assignment</p>
              <h4 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase leading-none">
                {isAtSchool ? (parcelData.lockerId || 'N/A') : 'TRANSIT'}
              </h4>
            </div>

            <div className="relative z-10 pt-10 mt-10 border-t border-white/10 space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Courier</span>
                <span className="text-xs font-bold uppercase">{parcelData.sender}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Security Status</span>
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${isAtSchool ? 'bg-green-500 text-white' : 'bg-white/10 text-white'}`}>
                  {isAtSchool ? 'Armed & Locked' : 'Pre-Authorized'}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}