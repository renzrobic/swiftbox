import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../../components/layout/ScrollReveal';

export default function TechnicalResearch() {
  const RESEARCH_DATA = [
    {
      tag: "Latency Metrics",
      finding: "94ms Average Response",
      desc: "Sub-100ms latency achieved between iPad Kiosk triggers and ESP32 physical actuation across encrypted Firebase channels.",
    },
    {
      tag: "Hardware Profiling",
      finding: "500k+ Duty Cycles",
      desc: "Extensive stress testing of 12V electromagnetic solenoids ensures multi-year reliability in high-traffic campus environments.",
    },
    {
      tag: "Encrypted Handshake",
      finding: "AES-256 Protocol",
      desc: "Zero-knowledge proofs and rolling TOTP dynamic QR codes prevent replay attacks and unauthorized access attempts.",
    },
    {
      tag: "User Interface Flow",
      finding: "< 10s Retrieval",
      desc: "Heuristic evaluation of the kiosk interface demonstrates a 70% reduction in total parcel handover time vs manual methods.",
    }
  ];

  return (
    <section className="relative bg-ink py-24 md:py-32 text-white overflow-hidden">
      {/* Strategic Subtle Glow - Monochromatic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Technical Research & Benchmarking
            </h2>
            <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/50 md:text-xl">
              Empirical data and performance analysis derived from field testing and architectural auditing of the SwiftBox platform.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {RESEARCH_DATA.map((item, index) => (
            <ScrollReveal key={item.tag} delay={index * 0.1}>
              <div className="group h-full flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:bg-white hover:border-white hover:shadow-2xl hover:shadow-ink/5 hover:-translate-y-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4 block group-hover:text-ink/40 transition-colors">
                    {item.tag}
                  </span>
                  <p className="text-2xl font-semibold mb-3 text-white group-hover:text-ink transition-colors">
                    {item.finding}
                  </p>
                  <p className="text-sm font-medium leading-relaxed text-white/40 group-hover:text-ink/50 transition-colors">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-ink/60 transition-colors">
                  <span>Full Report</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}