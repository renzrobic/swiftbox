import React from 'react';
import AdminForm from './AdminForm';
import MonitoringGrid from './MonitoringGrid'; 

const QUICK_METRICS = [
  { label: 'Total Volume', val: '1,284' },
  { label: 'Network Load', val: '72%' },
  { label: 'Active Users', val: '432' },
  { label: 'System Status', val: 'Stable' },
];

export default function LogisticsDashboard() {
  return (
    <div className="w-full space-y-8 overflow-hidden pb-12 text-left">
      
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="System Quick Metrics">
        {QUICK_METRICS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md lg:rounded-2xl">
            <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-slate-400">
              {stat.label}
            </p>
            <p className="text-2xl font-bold leading-none tracking-tighter text-royal-blue">
              {stat.val}
            </p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Registration Sidebar (Formerly RegistrationColumn.jsx) */}
        <aside className="order-2 lg:col-span-4 lg:order-1" aria-label="Registration Form Container">
          <div className="lg:sticky lg:top-32">
            
            <div className="mb-8 border-b-2 border-royal-blue/30 pb-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-blue">
                Registration
              </h3>
            </div>
            
            <AdminForm />
            
            <p role="status" className="mt-6 text-center text-[9px] font-bold uppercase tracking-widest text-royal-blue/30">
              Terminal Session: Secured
            </p>
          </div>
        </aside>

        {/* Real-time Monitoring Grid */}
        <main className="order-1 lg:col-span-8 lg:order-2">
          <MonitoringGrid lockers={{}} /> 
        </main>
      </div>
    </div>
  );
}