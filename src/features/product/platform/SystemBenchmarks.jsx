import React from 'react';
import ScrollReveal from '../../../components/layout/ScrollReveal';

export default function SystemBenchmarks() {
  return (
    <section className="bg-pearl py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12 text-center">
        <ScrollReveal>
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            System Evaluations
          </h2>
          <p className="mb-20 text-lg font-medium text-ink/70 max-w-2xl mx-auto">
            SwiftBox ranks first in latency reduction and deployment efficiency compared to traditional university locker systems.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] lg:rounded-[3rem] bg-white border border-ink/5 shadow-2xl p-8 md:p-12 flex flex-col justify-end gap-12 overflow-hidden relative">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="text-center font-semibold text-ink/80 tracking-wider text-[11px] mb-12">System Latency Delta (ms)</h3>
              
              <div className="flex items-end justify-around flex-1 border-b border-ink/5 pb-8">
                  <div className="flex flex-col items-center gap-4 w-full">
                    <div className="w-12 md:w-24 bg-ink/40 rounded-2xl transition-all duration-1000 hover:scale-x-110" style={{ height: '80%' }} />
                    <span className="text-[10px] font-semibold text-ink/80 tracking-wider">v2 Node</span>
                  </div>
                  <div className="flex flex-col items-center gap-4 w-full">
                    <div className="w-12 md:w-24 bg-ink rounded-2xl transition-all duration-1000 hover:scale-x-110" style={{ height: '40%' }} />
                    <span className="text-[10px] font-semibold text-ink/80 tracking-wider">SwiftBox Optimized</span>
                  </div>
                 <div className="flex flex-col items-center gap-4 w-full">
                    <div className="w-12 md:w-24 bg-ink/20 rounded-2xl transition-all duration-1000 hover:scale-x-110" style={{ height: '90%' }} />
                    <span className="text-[10px] font-semibold text-ink/80 tracking-wider">Legacy Systems</span>
                 </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] font-semibold tracking-wider text-ink/80">
              <span className="flex items-center gap-3"><div className="w-2 h-2 bg-ink rounded-full"/> Current Sprint</span>
              <span className="flex items-center gap-3"><div className="w-2 h-2 bg-ink/20 rounded-full"/> Industry Mean</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
