import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';
import lockImage from '../assets/tech/kinetic_lock_render.png';

// Modular Feature Components
import KineticHero from '../features/product/kinetic/KineticHero';
import KineticManifest from '../features/product/kinetic/KineticManifest';
import TechCTA from '../features/product/TechCTA';

export default function KineticTech() {
  return (
    <div className="min-h-screen bg-white selection:bg-ink/10 overflow-hidden">
      <Helmet>
        <title>Kinetic Architecture | Swiftbox Smart Logistics</title>
      </Helmet>
      
      <KineticHero />

      {/* ── CINEMATIC VISUAL ── */}
      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal delay={0.2}>
            <div className="group relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl transition-all duration-1000 hover:shadow-ink/5">
              <img
                src={lockImage}
                alt="3D render of futuristic locking mechanism"
                className="h-full w-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <KineticManifest />

      {/* ── CTA FOOTER ── */}
      <TechCTA title="Ready to deploy?" buttonText="Launch System Tracker" />
    </div>
  );
}