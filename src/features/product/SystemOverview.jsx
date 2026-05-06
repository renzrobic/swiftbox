import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/layout/ScrollReveal';

export default function SystemOverview() {
  return (
    <section id="product-platform" className="overflow-hidden px-8 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        <ScrollReveal>
          <div className="mb-10 md:mb-12">
            <h2 className="text-4xl font-semibold tracking-tight text-ink leading-tight md:text-5xl">
              Product & Platform
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium leading-tight text-ink/70 md:text-xl">
              Scalable foundations for a new era of automated logistics.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="group relative h-[250px] w-full overflow-hidden rounded-xl lg:rounded-2xl shadow-2xl sm:h-[400px] md:h-[550px] bg-ink/10">
            {/* <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src={null} type="video/mp4" />
            </video> */}
            <div className="absolute inset-0 flex items-center justify-center text-ink/30">
              Video coming soon...
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-col items-start justify-between gap-8 md:mt-10 md:flex-row">
            <div className="max-w-2xl">
              <h3 className="mb-4 text-2xl font-semibold text-ink md:text-3xl">
                Swiftbox
              </h3>
              <p className="text-base font-normal leading-tight text-ink/70 md:text-lg">
                Streamline logistics from arrival to pickup with systems that authenticate, actuate, and sync assets across hardware, cloud, and digital keys.
              </p>
            </div>
  
            <div className="w-full flex-shrink-0 md:w-auto">
              <Link 
                to="/product" 
                className="inline-block w-full rounded-full bg-ink px-8 py-3 text-center text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-matte-charcoal md:w-auto btn-ai-glow"
              >
                Learn more
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}