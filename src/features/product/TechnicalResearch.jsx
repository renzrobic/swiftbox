import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TechnicalResearch() {
  return (
    <section className="bg-royal-blue py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="mb-10 md:mb-12 text-3xl md:text-4xl font-semibold text-center md:text-left">
          Technical Research
        </h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {["Latency Metrics", "Hardware Profiling", "Encrypted Handshake", "User Interface Flow"].map((tag) => (
            <div key={tag} className="flex items-center justify-between rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 transition hover:bg-white/10 cursor-pointer group">
              <span className="text-base md:text-lg font-medium">{tag}</span>
              <ArrowRight size={18} className="opacity-40 group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}