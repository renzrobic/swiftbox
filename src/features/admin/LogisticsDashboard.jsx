import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
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

    // 🛡️ Authoritative Backend Fetch: Retrieves lockers, parcels, and team metrics
    const fetchDashboardMetrics = async () => {
      try {
        const [lockersData, parcelsData, teamData] = await Promise.allSettled([
          api.get('/api/v1/lockers'),
          api.get('/api/v1/parcels'),
          api.get('/api/v1/team')
        ]);

        if (!isMounted) return;

        let activeCount = 0;
        if (lockersData.status === 'fulfilled' && lockersData.value && typeof lockersData.value === 'object') {
          const lockersObj = lockersData.value;
          activeCount = Object.values(lockersObj).filter(l => l.status === 'OCCUPIED').length;
          setLockers(lockersObj);
        }

        let parcelCount = 0;
        if (parcelsData.status === 'fulfilled' && parcelsData.value && typeof parcelsData.value === 'object') {
          parcelCount = Object.keys(parcelsData.value).length;
        }

        let memberCount = 0;
        if (teamData.status === 'fulfilled' && Array.isArray(teamData.value)) {
          memberCount = teamData.value.length;
        }

        setMetrics({
          parcels: parcelCount,
          activeLockers: activeCount,
          teamSize: memberCount,
          loading: false
        });
      } catch (err) {
        console.warn("Backend metrics fetch notice:", err.message);
        if (isMounted) {
          setMetrics(prev => ({ ...prev, loading: false }));
        }
      }
    };

    fetchDashboardMetrics();
    // Poll backend every 10 seconds for fresh authoritative telemetry
    const intervalId = setInterval(fetchDashboardMetrics, 10000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
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