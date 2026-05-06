import React from 'react';
import ScrollReveal from '../../components/layout/ScrollReveal';

export default function TrackerHeader() {
  return (
    <header className="mb-12 flex flex-col items-center justify-center text-center md:mb-16">
      <ScrollReveal>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-ink leading-tight md:text-5xl">
            Universal Node Tracking.
          </h2>
        </div>
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <div className="flex flex-col items-center text-center">
          <p className="mt-4 max-w-2xl text-lg font-medium leading-tight text-ink/70 md:text-xl">
            Verify the real-time status of your parcel across our 
            decentralized autonomous locker network.
          </p>
        </div>
      </ScrollReveal>
    </header>
  );
}