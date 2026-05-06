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
          <div class="absolute -inset-4 bg-ink/30 rounded-full animate-ping"></div>
          <div class="absolute -inset-8 bg-ink/10 rounded-full animate-pulse"></div>
          <div class="relative bg-ink p-2.5 rounded-full border-2 border-white shadow-2xl text-white flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-2.035-2.54A1 1 0 0 0 17.02 10H15v8"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
          </div>
        </div>`,
  className: 'custom-icon',
  iconSize: [40, 40],
});

// --- LOGIC PRESERVED: MapController ---
function MapController({ coords, isNewSearch, setLocked, mapLocked }) {
  const map = useMap();
  
  // Handle Map Interaction States
  useEffect(() => {
    if (mapLocked) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
    }
  }, [map, mapLocked]);

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
    <div className="mt-12 flex flex-col lg:flex-row gap-0 overflow-hidden rounded-3xl border border-ink/10 bg-white min-h-[700px]">
      
      {/* ── LEFT: IMMERSIVE MAP VIEWPORT ── */}
      <div className="relative flex-1 h-[400px] lg:h-auto border-b lg:border-b-0 lg:border-r border-ink/5 overflow-hidden bg-pearl">
        <MapContainer 
          center={currentCoords} 
          zoom={5} 
          style={{ height: '100%', width: '100%' }} 
          zoomControl={false}
          dragging={!mapLocked} 
          scrollWheelZoom={!mapLocked}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          <Marker position={currentCoords} icon={truckIcon} />
          <MapController coords={currentCoords} isNewSearch={isNewSearch} setLocked={setMapLocked} mapLocked={mapLocked} />
        </MapContainer>

        {/* Map Locked Overlay: Light themed */}
        <AnimatePresence>
          {mapLocked && (
            <motion.div 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-[1001] bg-white/40 backdrop-blur-[2px] flex items-center justify-center group transition-colors"
            >
              <button 
                type="button"
                onClick={() => setMapLocked(false)}
                className="bg-ink px-6 py-3 rounded-full shadow-lg flex items-center gap-3 border border-ink/20 btn-ai-glow text-white active:scale-95 transition-transform"
              >
                <MousePointer2 aria-hidden="true" size={18} className="animate-bounce" />
                <span className="text-xs font-semibold uppercase tracking-widest">Unlock Live Map</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Location HUD: Scaled down for better balance */}
        <div className="absolute bottom-6 left-6 z-[1000] hidden md:block">
          <div className="bg-white/90 backdrop-blur-xl p-4 px-6 rounded-2xl border border-ink/5 shadow-xl">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-ink/30 mb-1">Live Node Positioning</p>
            <h4 className="text-xl font-semibold text-ink tracking-tight uppercase">{parcelData.location}</h4>
          </div>
        </div>
      </div>

      {/* ── RIGHT: TECHNICAL COMMAND SIDEBAR (LIGHT THEME) ── */}
      <aside className="w-full lg:w-[350px] flex flex-col bg-white overflow-hidden">
        
        {/* Sidebar Header: Auth & Locker */}
        <div className="p-6 border-b border-ink/5">
          <div className="flex items-center justify-between mb-6">
            <div className="h-9 w-9 rounded-xl bg-ink/5 flex items-center justify-center border border-ink/10">
              <Truck size={18} className="text-ink" />
            </div>
            <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest ${isAtSchool ? 'bg-ink text-white' : 'bg-ink/5 text-ink/30'}`}>
              {isAtSchool ? 'Armed' : 'Active'}
            </span>
          </div>
          
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-ink/50 mb-1.5">Locker Authorization</p>
          <h4 className="text-4xl font-semibold tracking-tighter text-ink uppercase leading-none">
            {isAtSchool ? (parcelData.lockerId || 'N/A') : 'TRNST'}
          </h4>
        </div>

        {/* Sidebar Content: Live Event Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <div className="flex items-center justify-between">
            <h5 className="text-[9px] font-bold uppercase text-ink/50 tracking-[0.3em]">Event Stream</h5>
            <div className="flex gap-1">
              <div className="h-1 w-1 rounded-full bg-ink/40 animate-pulse" />
              <div className="h-1 w-1 rounded-full bg-ink/40 animate-pulse delay-75" />
            </div>
          </div>

          <div className="space-y-6 relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-ink/10" />
            
            {history.map((step, i) => (
              <div key={i} className="flex gap-5 relative group/step">
                <div className={`h-6 w-6 rounded-full border-2 z-10 transition-all duration-500 
                  ${step.current 
                    ? 'bg-ink border-white shadow-md scale-110' 
                    : 'bg-white border-ink/20'}`} 
                />
                <div className="flex flex-col">
                  <p className={`text-xs font-semibold uppercase tracking-tight ${step.current ? 'text-ink' : 'text-ink/40'}`}>
                    {step.status}
                  </p>
                  <p className={`text-[9px] font-bold uppercase mt-1 tracking-widest ${step.current ? 'text-ink/60' : 'text-ink/20'}`}>
                    {step.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Footer: Origin Info */}
        <div className="p-6 bg-pearl border-t border-ink/5 mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/50">Origin Source</span>
            <span className="text-[11px] font-semibold text-ink uppercase">{parcelData.sender}</span>
          </div>
        </div>
      </aside>

    </div>

  );
}