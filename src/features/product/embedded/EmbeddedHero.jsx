import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../../components/layout/ScrollReveal';

export default function EmbeddedHero() {
  return (
    <>
      <nav className="fixed top-8 left-8 z-50">
        <Link 
          to="/product" 
          className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-ink/5 rounded-full shadow-2xl hover:bg-ink hover:text-white transition-all duration-500"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Systems</span>
        </Link>
      </nav>

      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ink/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-ink/5 blur-[120px] rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10 text-center">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 bg-ink/5 rounded-full border border-ink/5">
                IoT Node v3.0
              </span>
              <h1 className="mb-8 text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
                Embedded <br /> Intelligence.
              </h1>
              <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed text-ink/70 md:text-xl">
                Harnessing the ESP32-WROOM-32 for real-time actuation, low-latency cloud sync, and industrial-grade hardware isolation.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
