import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase';
import AdminForm from './AdminForm';
import MonitoringGrid from './MonitoringGrid'; 

export default function LogisticsDashboard() {
  const [metrics, setMetrics] = useState({
    parcels: 0,
    activeLockers: 0,
    teamSize: 0,
    loading: true
  });

  const [lockers, setLockers] = useState({});

  useEffect(() => {
    let isMounted = true;

    const parcelsRef = ref(db, 'parcels');
    const lockersRef = ref(db, 'lockers');
    const teamRef = ref(db, 'team');

    const unsubParcels = onValue(parcelsRef, (snap) => {
      if (!isMounted) return;
      const data = snap.val() || {};
      // Filter out dummy initialization records if any
      const count = Object.keys(data).filter(k => k !== '_init').length;
      setMetrics(prev => ({ ...prev, parcels: count, loading: false }));
    }, (error) => console.error("Error fetching parcels:", error));

    const unsubLockers = onValue(lockersRef, (snap) => {
      if (!isMounted) return;
      const data = snap.val() || {};
      const active = Object.values(data).filter(l => l.status === 'OCCUPIED').length;
      setLockers(data);
      setMetrics(prev => ({ ...prev, activeLockers: active, loading: false }));
    }, (error) => console.error("Error fetching lockers:", error));

    const unsubTeam = onValue(teamRef, (snap) => {
      if (!isMounted) return;
      const data = snap.val() || {};
      setMetrics(prev => ({ ...prev, teamSize: Object.keys(data).filter(k => k !== '_init').length, loading: false }));
    }, (error) => console.error("Error fetching team:", error));

    return () => {
      isMounted = false;
      unsubParcels();
      unsubLockers();
      unsubTeam();
    };
  }, []);

  const QUICK_METRICS = [
    { label: 'Total Volume', val: metrics.loading ? '...' : metrics.parcels.toLocaleString() },
    { label: 'Locker Load', val: metrics.loading ? '...' : `${metrics.activeLockers} / 4` },
    { label: 'Active Team', val: metrics.loading ? '...' : metrics.teamSize },
    { label: 'System Status', val: 'Secure' },
  ];

  return (
    <div className="w-full space-y-8 overflow-hidden pb-12 text-left">
      
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="System Quick Metrics">
        {QUICK_METRICS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-ink/10 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <p className="mb-1 text-[9px] font-semibold tracking-wider text-ink/80">
              {stat.label}
            </p>
            <p className="text-2xl font-semibold leading-none tracking-tighter text-ink">
              {stat.val}
            </p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* Registration Sidebar */}
        <aside className="order-2 lg:col-span-4 lg:order-1" aria-label="Registration Form Container">
          <div className="lg:sticky lg:top-32">
            
            <div className="mb-8 border-b-2 border-ink/10 pb-4">
              <h3 className="text-xs font-semibold tracking-wider text-ink">
                Registration
              </h3>
            </div>
            
            <AdminForm />
            
            <p role="status" className="mt-6 text-center text-[9px] font-semibold tracking-wider text-ink/80">
              Terminal Session: Secured
            </p>
          </div>
        </aside>

        {/* Real-time Monitoring Grid */}
        <main className="order-1 lg:col-span-8 lg:order-2">
          <MonitoringGrid lockers={lockers} loading={metrics.loading} /> 
        </main>
      </div>
    </div>
  );
}