import React from 'react';
import { Shield, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductShowcase() {
  const tags = ["Latency Metrics", "Hardware Profiling", "Encrypted Handshake", "User Interface Flow"];

  return (
    <section id="about" className="relative my-10 overflow-hidden bg-royal-blue px-8 py-20 text-cool-white shadow-2xl md:px-10 md:py-24">
      {/* 🟢 Inner Motion Div: This prevents the blue background from moving and showing white */}
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-16 md:mb-20"> 
          <h2 className="mb-6 max-w-4xl text-4xl font-semibold tracking-tight leading-tight md:mb-8 md:text-5xl">
            Research
          </h2>
          <p className="max-w-2xl text-lg font-medium leading-tight text-cool-white/90 md:text-xl">
            We focus on systems engineering to build the foundational infrastructure for secure, autonomous parcel exchange.
          </p>
        </div>

        <div className="space-y-8 md:space-y-10">
          <div className="group relative flex h-[320px] items-end overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 md:h-[400px] md:p-12">
            <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <h3 className="max-w-md text-2xl font-medium tracking-tight md:text-3xl">
                Kinetic Locking Architecture
              </h3>
              <button className="w-full rounded-full bg-white px-8 py-3 text-base font-semibold text-royal-blue shadow-lg transition hover:bg-cool-white md:w-auto">
                Learn more
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {[
              { title: "Embedded System Logic", id: "iot" },
              { title: "Encrypted Access", id: "cloud" }
            ].map((card) => (
              <div key={card.id} className="group relative flex h-[280px] flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 md:h-[300px] md:flex-row md:items-end md:p-10">
                <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{card.title}</h3>
                <button className="w-full rounded-full bg-white px-8 py-3 text-base font-semibold text-royal-blue shadow-lg md:w-auto">
                  Learn more
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {tags.map((tag) => (
              <div key={tag} className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-5 transition hover:bg-white/10">
                <span className="text-lg font-normal md:text-xl">{tag}</span>
                <ArrowRight size={18} className="opacity-40 transition-opacity md:opacity-0 group-hover:opacity-100" />
              </div>
            ))}
            
            <div className="group col-span-1 flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-5 transition hover:bg-white/10 sm:col-span-2">
              <Shield size={24} className="shrink-0 text-white/50" />
              <span className="text-lg font-normal md:text-xl">Hardened Access Layer</span>
              <ArrowRight size={18} className="ml-auto opacity-40 transition-opacity md:opacity-0 group-hover:opacity-100" />
            </div>
            
            <div className="group col-span-1 flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-5 transition hover:bg-white/10 sm:col-span-2">
              <Cpu size={24} className="shrink-0 text-white/50" />
              <span className="text-lg font-normal md:text-xl">Real-time Logistics Logic</span>
              <ArrowRight size={18} className="ml-auto opacity-40 transition-opacity md:opacity-0 group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}