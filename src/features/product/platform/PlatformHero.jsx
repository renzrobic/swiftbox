import React from 'react';
import ScrollReveal from '../../../components/layout/ScrollReveal';

export default function PlatformHero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-ink/5 blur-[120px] rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10 text-center">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 bg-ink/5 rounded-full border border-ink/5">
              Technical Blueprint
            </span>
            <h1 className="mb-8 text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
              Platform Architecture.
            </h1>
            <p className="max-w-2xl mx-auto text-lg font-medium leading-relaxed text-ink/70 md:text-xl">
              An in-depth look at the technology stack that powers SwiftBox. Designed for high availability, low latency, and zero-trust security.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
