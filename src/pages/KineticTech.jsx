import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';

// Modular Feature Components
import KineticHero from '../features/product/kinetic/KineticHero';
import KineticManifest from '../features/product/kinetic/KineticManifest';


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
            <div className="group relative w-full overflow-hidden rounded-3xl bg-ink/5 shadow-2xl transition-all duration-1000 hover:shadow-ink/5 aspect-video">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="h-full w-full object-cover transition-transform duration-[4s] group-hover:scale-105"
              >
                <source src="https://videos.pexels.com/video-files/10241357/10241357-uhd_2560_1440_24fps.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <KineticManifest />


    </div>
  );
}