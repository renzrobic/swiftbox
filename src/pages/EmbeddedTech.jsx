import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';
import hardwareImg from '../assets/tech/embedded_tech_hardware.png';

// Modular Feature Components
import EmbeddedHero from '../features/product/embedded/EmbeddedHero';
import EmbeddedManifest from '../features/product/embedded/EmbeddedManifest';
import TechCTA from '../features/product/TechCTA';

export default function EmbeddedTech() {
  return (
    <div className="min-h-screen bg-white selection:bg-ink/10 overflow-hidden">
      <Helmet>
        <title>Embedded Systems | Swiftbox Smart Logistics</title>
      </Helmet>
      
      <EmbeddedHero />

      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal delay={0.2}>
            <div className="group relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl transition-all duration-1000 hover:shadow-ink/5">
              <img
                src={hardwareImg}
                alt="Hardware logic board closeup"
                className="h-full w-full object-cover transition-transform duration-[4s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <EmbeddedManifest />

      <TechCTA title="Build with SwiftBox." buttonText="Access Developer API" />
    </div>
  );
}