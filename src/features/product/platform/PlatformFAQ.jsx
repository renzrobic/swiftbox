import React from 'react';
import ScrollReveal from '../../../components/layout/ScrollReveal';
import Accordion from '../../../components/ui/Accordion';
import { FAQS } from './constants';

export default function PlatformFAQ() {
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-32 md:py-48 text-center overflow-hidden">
      {/* Strategic Subtle Glow - Monochromatic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-ink/5 blur-[160px] rounded-full" />
      </div>

      <div className="relative z-10">
        <ScrollReveal textCenter>
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              System FAQ
            </h2>
            <p className="text-lg font-medium text-ink/50">
              Technical insights for administrators and logistics partners.
            </p>
          </div>
        </ScrollReveal>

        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
