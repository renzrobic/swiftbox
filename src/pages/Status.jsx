import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';
import { Activity, Server, Globe, Database } from 'lucide-react';

export default function Status() {
  const SERVICES = [
    { name: "Cloud Infrastructure", status: "Operational", icon: Server },
    { name: "Real-time Sync (Firebase)", status: "Operational", icon: Database },
    { name: "Public API", status: "Operational", icon: Globe },
    { name: "IoT Node Network", status: "Operational", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-10">
      <Helmet>
        <title>System Status | Swiftbox Tech</title>
      </Helmet>
      
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="text-ink mb-6">Status</h1>
            <p className="text-lg md:text-xl font-medium text-ink/60 leading-relaxed">
              Real-time monitoring of the SwiftBox global infrastructure and node network.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6">
          {SERVICES.map((service) => (
            <div key={service.name} className="flex items-center justify-between p-6 rounded-2xl border border-ink/5 bg-pearl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <service.icon size={20} className="text-ink/40" />
                </div>
                <span className="font-semibold text-ink">{service.name}</span>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-green-600 bg-green-50 px-4 py-1.5 rounded-full">
                {service.status}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-12 text-[10px] font-bold uppercase tracking-widest text-ink/20 text-center">
          Uptime: 99.98% over last 30 days
        </p>
      </div>
    </div>
  );
}
