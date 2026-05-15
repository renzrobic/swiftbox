import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';
import FAQ from '../features/landing/FAQ';

export default function HelpCenter() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-10">
      <Helmet>
        <title>Help Center | Swiftbox Tech</title>
      </Helmet>
      
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="text-ink mb-6">How can we help?</h1>
            <p className="text-lg md:text-xl font-medium text-ink/60 leading-relaxed">
              Find answers to common questions about parcel retrieval, security, and system usage.
            </p>
          </div>
        </ScrollReveal>

        {/* Reuse the FAQ component but in a dedicated context */}
        <div className="-mx-6 md:-mx-10">
          <FAQ />
        </div>

        <section className="mt-20 p-10 rounded-3xl bg-ink text-white">
          <h3 className="mb-4 text-white">Still have questions?</h3>
          <p className="mb-8 text-white/50 font-medium leading-relaxed">
            Our technical support team is available for facility managers and administrators.
          </p>
          <button className="px-8 py-3 bg-white text-ink rounded-full font-semibold text-sm transition-all hover:bg-pearl active:scale-95">
            Contact Support
          </button>
        </section>
      </div>
    </div>
  );
}
