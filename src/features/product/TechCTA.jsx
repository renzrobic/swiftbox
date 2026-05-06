import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/layout/ScrollReveal';

export default function TechCTA({ title = "Ready to deploy?", buttonText = "Launch System Tracker", linkTo = "/track" }) {
  return (
    <section className="bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-12 text-center text-white">
        <ScrollReveal>
           <h2 className="mb-10 text-3xl font-semibold md:text-5xl tracking-tight">
             {title}
           </h2>
           <Link 
             to={linkTo} 
             className="inline-block rounded-full bg-white px-8 py-2.5 text-base font-semibold text-ink shadow-lg transition-all duration-300 hover:bg-pearl btn-ai-glow"
           >
             {buttonText}
           </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
