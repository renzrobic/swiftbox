import React, { memo } from 'react';
import { Battery, Wifi, Thermometer, Wrench, AlertCircle } from 'lucide-react';

// Hoisted to prevent re-allocation on every render
const NODES = [
  { name: "Node_PAG_01", location: "City Commercial Center (C3)", status: "Healthy", battery: "94%", wifi: "Strong", temp: "26°C" },
  { name: "Node_PAG_02", location: "Gaisano Capital Pagadian", status: "Healthy", battery: "88%", wifi: "Stable", temp: "25°C" },
  { name: "Node_PAG_03", location: "Integrated Bus Terminal", status: "Maintenance", battery: "15%", wifi: "Weak", temp: "29°C" }
];

const MAINTENANCE_LOGS = [
  { task: "Battery Swap", target: "Node_PAG_03", time: "En Route" },
  { task: "Seal Inspection", target: "Node_PAG_01", time: "Routine" },
  { task: "Solar Cleaning", target: "Node_PAG_02", time: "Complete" },
];

// Minimalist Stat Component - Memoized for performance
const StatItem = memo(({ icon: Icon, value, label }) => {
  return (
    <div className="flex items-center gap-1.5" aria-label={`${label}: ${value}`}>
      <Icon size={12} className="text-ink/20" aria-hidden="true" />
      <span className="text-[9px] font-bold text-ink">{value}</span>
    </div>
  );
});

export default function AdminInfrastructure() {
  return (
    <section className="space-y-6 md:space-y-10 text-left w-full overflow-hidden">
      <div>
        <h2 className="text-2xl font-bold text-ink uppercase">Infrastructure</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Active Node Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NODES.map((node) => (
              <div key={node.name} className="bg-white border border-ink/10 p-6 rounded-xl lg:rounded-2xl shadow-sm hover:border-ink/20 transition-all">
                <div className="flex justify-between items-center mb-8">
                  <span 
                    className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${
                      node.status === 'Healthy' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                    }`}
                  >
                    {node.status}
                  </span>
                  
                  <div className="flex gap-3">
                    <StatItem icon={Battery} value={node.battery} label="Battery" />
                    <StatItem icon={Wifi} value={node.wifi} label="WiFi" />
                    <StatItem icon={Thermometer} value={node.temp} label="Temperature" />
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-ink leading-none uppercase tracking-tight">
                  {node.name}
                </h4>
                <p className="text-[9px] font-black text-ink/30 uppercase mt-2">
                  {node.location}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Log Sidebar */}
        <aside className="lg:col-span-4 bg-white border border-ink/10 rounded-xl lg:rounded-2xl p-6 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-8">
            <Wrench size={14} className="text-ink opacity-30" aria-hidden="true" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-ink">Queue</h3>
          </div>
          
          <div className="space-y-6">
            {MAINTENANCE_LOGS.map((log) => (
              <div key={`${log.target}-${log.task}`} className="border-l-2 border-ink/5 pl-4 py-0.5">
                <p className="text-xs font-bold text-ink leading-tight">{log.task}</p>
                <p className="text-[9px] font-black text-ink/30 uppercase mt-1">
                  {log.target} • {log.time}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Critical System Alert */}
      <div 
        role="alert"
        className="bg-amber-50 border border-amber-100 p-5 rounded-xl lg:rounded-2xl flex items-center gap-4"
      >
        <AlertCircle size={18} className="text-amber-500 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest leading-none">
            Power Critical: Node_PAG_03
          </p>
          <p className="text-[9px] font-bold text-amber-600/70 uppercase mt-1">
            Critical battery level at Bus Terminal terminal.
          </p>
        </div>
      </div>
    </section>
  );
}