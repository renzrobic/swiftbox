import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Smartphone, Layout, Truck, Zap, Shield, Globe } from 'lucide-react';
import ScrollReveal from '../../components/layout/ScrollReveal';

const ECOSYSTEM_ITEMS = [
  {
    id: 'user-app',
    title: 'User Mobile Interface',
    desc: 'The primary gateway of the SwiftBox ecosystem. Our iPad-based terminal is engineered for high-frequency academic and corporate environments, featuring dynamic QR generation, secure multi-factor authentication, and a zero-friction user interface that reduces total parcel retrieval time to under 10 seconds per user.',
    icon: Smartphone,
    color: 'from-ink/10 to-ink/5',
    tags: ['iOS/Android', 'Real-time', 'Biometric']
  },
  {
    id: 'admin-portal',
    title: 'Cloud Admin Command',
    desc: 'The centralized dashboard for facility managers. Monitor node health, manage compartment allocation, and access full audit logs with sub-second data synchronization.',
    icon: Layout,
    color: 'from-ink/15 to-ink/10',
    tags: ['Web Dashboard', 'Fleet Analytics', 'Audit Logs']
  },
  {
    id: 'courier-logic',
    title: 'Courier Logistics Hub',
    desc: 'Optimized for high-speed delivery. A dedicated kiosk interface for logistics partners to batch-drop parcels without needing recipient presence, solving the last-mile wait problem.',
    icon: Truck,
    color: 'from-ink/10 to-ink/5',
    tags: ['Drop & Go', 'Batch Entry', 'Fleet Sync']
  }
];

// ── SUB-COMPONENT: ANIMATED COUNTER ──
function Counter({ value, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (latest) => 
    `${prefix}${latest % 1 === 0 ? Math.floor(latest) : latest.toFixed(1)}${suffix}`
  );

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}

export default function PlatformEcosystem() {
  return (
    <section className="bg-pearl py-24 md:py-32 mt-64 overflow-hidden border-t border-ink/5">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        
        <ScrollReveal>
          <div className="mb-10 md:mb-12">
            <h2 className="text-4xl font-semibold tracking-tight text-ink leading-tight md:text-5xl">
              A Unified Ecosystem
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-tight text-ink/70 md:text-xl">
              SwiftBox connects recipients, couriers, and administrators in a single data-driven circuit.
            </p>
          </div>
        </ScrollReveal>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* USER APP - PRIMARY BENTO */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-white border border-ink/5 p-10 md:p-16 md:pb-24 shadow-2xl transition-all duration-700 hover:shadow-ink/5 min-h-[500px]">
            <div className={`absolute inset-0 bg-gradient-to-br ${ECOSYSTEM_ITEMS[0].color} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl group-hover:active-glow transition-all duration-700">
                  <Smartphone className="text-ink" size={32} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold text-ink md:text-5xl">
                  {ECOSYSTEM_ITEMS[0].title}
                </h3>
                <p className="text-base md:text-xl text-ink/50 font-medium leading-relaxed">
                  {ECOSYSTEM_ITEMS[0].desc}
                </p>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                {ECOSYSTEM_ITEMS[0].tags.map(tag => (
                  <span key={tag} className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-ink/60 bg-ink/5 rounded-full border border-ink/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ABSTRACT DECOR - Minified to prevent distraction */}
            <div className="absolute top-1/2 -right-32 hidden md:block w-48 aspect-[9/19] bg-pearl rounded-[2.5rem] border-4 border-white shadow-xl rotate-12 transition-all duration-1000 group-hover:-translate-x-8 group-hover:rotate-6 opacity-40 group-hover:opacity-60 overflow-hidden pointer-events-none">
               <div className="w-full h-full bg-gradient-to-b from-white via-pearl to-ink/5 p-6">
                  <div className="w-1/2 h-3 bg-ink/10 rounded-full mb-6" />
                  <div className="w-full aspect-square bg-white rounded-2xl shadow-sm border border-ink/5 flex items-center justify-center">
                    <Zap className="text-ink active-glow opacity-30" size={24} />
                  </div>
                  <div className="mt-8 space-y-3">
                    <div className="w-full h-1.5 bg-ink/5 rounded-full" />
                    <div className="w-3/4 h-1.5 bg-ink/5 rounded-full" />
                  </div>
               </div>
            </div>
          </div>

          {/* ADMIN PORTAL - SECONDARY BENTO */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-3xl bg-white border border-ink/5 p-10 md:pb-24 shadow-2xl transition-all duration-700 hover:shadow-ink/5 min-h-[500px]">
            <div className={`absolute inset-0 bg-gradient-to-br ${ECOSYSTEM_ITEMS[1].color} opacity-0 transition-opacity duration-700 group-hover:opacity-100`} />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg group-hover:active-glow transition-all duration-700">
                  <Layout className="text-ink" size={28} />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-ink">
                  {ECOSYSTEM_ITEMS[1].title}
                </h3>
                <p className="text-base text-ink/50 font-medium leading-relaxed">
                  {ECOSYSTEM_ITEMS[1].desc}
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm">
                  <Shield size={18} className="text-ink/40" />
                  <span className="text-[10px] font-bold tracking-tight text-ink/60">Encrypted Tunnelling Active</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-sm">
                  <Globe size={18} className="text-ink/40" />
                  <span className="text-[10px] font-bold tracking-tight text-ink/60">Multi-Node Distribution</span>
                </div>
              </div>
            </div>
          </div>

          {/* COURIER TERMINAL - FULL WIDTH BOTTOM */}
          <div className="md:col-span-12 group relative overflow-hidden rounded-3xl bg-ink text-white p-10 md:p-16 md:pb-24 shadow-2xl transition-all duration-700 min-h-[400px]">
            <div className={`absolute inset-0 bg-gradient-to-r ${ECOSYSTEM_ITEMS[2].color} opacity-10 transition-opacity duration-700 group-hover:opacity-20`} />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 h-full">
              <div className="max-w-2xl text-left">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 group-hover:active-glow transition-all duration-700">
                  <Truck className="text-white" size={32} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold md:text-5xl">
                  {ECOSYSTEM_ITEMS[2].title}
                </h3>
                <p className="text-base md:text-xl text-white/60 font-medium leading-relaxed">
                  {ECOSYSTEM_ITEMS[2].desc}
                </p>
                <div className="mt-12 flex flex-wrap gap-4">
                   {ECOSYSTEM_ITEMS[2].tags.map(tag => (
                    <span key={tag} className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white/80 bg-white/5 rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* STATS DECOR */}
              <div className="flex flex-col gap-8 w-full md:w-auto">
                 <div className="p-8 md:p-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center md:min-w-[280px]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Efficiency Gain</p>
                    <p className="text-5xl md:text-6xl font-black text-white">
                      <Counter value={300} prefix="+" suffix="%" />
                    </p>
                 </div>
                 <div className="p-8 md:p-10 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-center md:min-w-[280px]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Success Rate</p>
                    <p className="text-5xl md:text-6xl font-black text-white">
                      <Counter value={99.9} suffix="%" />
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
