import React from 'react';
import { Zap, Shield, Globe } from 'lucide-react';

const SERVICE_LIST = [
  { icon: Zap, title: "Drop & Go", desc: "Our 'Zero-Contact' protocol allows couriers to drop parcels in under 15 seconds." },
  { icon: Shield, title: "Solenoid Security", desc: "Industrial-grade 12V Solenoid locks controlled by encrypted Firebase signals." },
  { icon: Globe, title: "Cloud Sync", desc: "Real-time synchronization across iPad Kiosks, Web Portals, and ESP32 nodes." }
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-8 py-24 md:px-10 md:py-32">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-semibold leading-tight tracking-tight text-royal-blue md:text-5xl">
          Our Services
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {SERVICE_LIST.map(({ icon: Icon, title, desc }) => (
          <div 
            key={title} 
            className="group rounded-xl border border-royal-blue/10 bg-cool-white p-8 transition-all hover:border-royal-blue/30 lg:rounded-2xl md:p-10"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-royal-blue text-cool-white transition-transform group-hover:scale-110 lg:rounded-2xl md:h-14 md:w-14">
              <Icon aria-hidden="true" className="h-5 w-5 md:h-6 md:w-6" />
            </div>

            <h3 className="mb-4 text-xl font-semibold text-royal-blue md:text-2xl">
              {title}
            </h3>

            <p className="text-base font-normal leading-tight text-royal-blue/70 md:text-lg">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}