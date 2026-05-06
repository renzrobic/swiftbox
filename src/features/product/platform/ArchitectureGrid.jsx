import React from 'react';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../../../components/layout/ScrollReveal';
import { PLATFORM_FEATURES } from './constants';

export default function ArchitectureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PLATFORM_FEATURES.map((feature, idx) => (
          <ScrollReveal key={feature.id} delay={idx * 0.1}>
            <div className="group h-full flex flex-col overflow-hidden rounded-[2.5rem] bg-ink/5 border border-ink/5 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-ink/5 hover:-translate-y-2">
              {/* Image Header */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="h-full w-full object-cover transition-transform duration-[4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Content Body */}
              <div className="flex-1 p-10 flex flex-col">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-ink/5 text-ink shadow-sm">
                    <feature.icon size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">
                    {feature.label}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-semibold tracking-tight text-ink">
                  {feature.title}
                </h3>
                
                <p className="mb-8 text-base font-medium leading-relaxed text-ink/50">
                  {feature.description}
                </p>

                <div className="mt-auto pt-8 border-t border-ink/5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink/20 group-hover:text-ink transition-colors">
                  <span>Explore Component</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
