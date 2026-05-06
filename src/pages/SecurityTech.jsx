import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';
import securityImg from '../assets/tech/security_encryption_abstract.png';

// Modular Feature Components
import SecurityHero from '../features/product/security/SecurityHero';
import SecurityManifest from '../features/product/security/SecurityManifest';


export default function SecurityTech() {
  return (
    <div className="min-h-screen bg-white selection:bg-ink/10 overflow-hidden">
      <Helmet>
        <title>Security Architecture | Swiftbox Smart Logistics</title>
      </Helmet>
      
      <SecurityHero />

      <section className="px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal delay={0.2}>
            <div className="group relative w-full overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-1000 hover:shadow-ink/5">
              <img
                src={securityImg}
                alt="Abstract representation of encryption"
                className="h-full w-full object-cover transition-transform duration-[4s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SecurityManifest />


    </div>
  );
}