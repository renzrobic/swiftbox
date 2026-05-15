import React from 'react';
import ScrollReveal from '../../../components/layout/ScrollReveal';

export default function DeploymentPortal() {
  return (
    <section className="bg-pearl py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        <div>
           <ScrollReveal>
              <span className="inline-block px-4 py-1.5 mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-ink/40 bg-ink/5 rounded-full border border-ink/5">
                Institutional Access
              </span>
              <h2 className="mb-8 text-5xl font-semibold tracking-tight text-ink md:text-7xl">
                Deploy <br /> SwiftBox.
              </h2>
              <p className="text-xl font-medium leading-relaxed text-ink/60">
                Join the waiting list for our next phase of campus integrations. We're scaling our logistics network to selected institutions.
              </p>
           </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2}>
          <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-ink/5">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-ink/40">First Name</label>
                  <input type="text" placeholder="John" className="w-full rounded-2xl border border-ink/5 bg-ink/5 px-6 py-4 text-base font-medium focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all" />
                </div>
                <div>
                  <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-ink/40">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full rounded-2xl border border-ink/5 bg-ink/5 px-6 py-4 text-base font-medium focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all" />
                </div>
              </div>
              
              <div>
                <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-ink/40">Email Address</label>
                <input type="email" placeholder="john@university.edu" className="w-full rounded-2xl border border-ink/5 bg-ink/5 px-6 py-4 text-base font-medium focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all" />
              </div>

              <div>
                <label className="mb-3 block text-[10px] font-bold uppercase tracking-widest text-ink/40">Institution</label>
                <input type="text" placeholder="Campus or Company Name" className="w-full rounded-2xl border border-ink/5 bg-ink/5 px-6 py-4 text-base font-medium focus:bg-white focus:border-ink/20 focus:outline-none focus:ring-4 focus:ring-ink/5 transition-all" />
              </div>

              <button type="button" className="w-full rounded-full bg-ink py-4 text-base font-semibold text-white shadow-2xl hover:bg-matte-charcoal transition-all active:scale-95 btn-ai-glow">
                Request Integration
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
