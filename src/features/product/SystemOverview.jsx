import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../../components/layout/ScrollReveal';
import prototypeImg from '../../assets/Swiftbox Prototype.png';
import OptimizedMedia from '../../components/ui/OptimizedMedia';


export default function SystemOverview() {
  return (
    <section id="product-platform" className="overflow-hidden px-8 py-24 md:px-10 md:py-40 bg-pearl/30">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <ScrollReveal>
            <div className="flex flex-col items-start">
              <h2 className="text-4xl font-semibold tracking-tight text-ink leading-[1.1] md:text-6xl mb-8">
                Product & <br /> Platform.
              </h2>
              <p className="text-lg font-medium leading-relaxed text-ink/70 md:text-xl mb-10 max-w-lg">
                Scalable foundations for a new era of automated logistics. Streamline from arrival to pickup with systems that authenticate, actuate, and sync across hardware and cloud.
              </p>
              <Link
                to="/product"
                className="inline-block rounded-full bg-ink px-10 py-4 text-center text-base font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 btn-ai-glow"
              >
                Explore Platform
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl lg:rounded-[3rem] bg-white shadow-2xl flex items-center justify-center border border-ink/5">
               <OptimizedMedia 
                 src={prototypeImg} 
                 alt="SwiftBox Prototype" 
                 className="h-full w-full"
                 aspectRatio="h-full w-full"
                 imageProps={{
                   className: "h-full w-full object-contain p-8 transition-transform duration-700 hover:scale-105"
                 }}
               />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}