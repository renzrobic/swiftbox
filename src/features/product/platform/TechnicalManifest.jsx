import React from 'react';
import ScrollReveal from '../../../components/layout/ScrollReveal';
import { TECH_SPECS } from './constants';

export default function TechnicalManifest() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-32 md:py-48">
      <ScrollReveal textCenter>
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Hardware Specifications.
          </h2>
          <p className="text-lg font-medium text-ink/50">
            The precise engineering standards that define the SwiftBox node logic.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="overflow-hidden rounded-[2.5rem] border border-ink/5 bg-white shadow-2xl mb-16">
          <table className="w-full text-left">
            <thead className="bg-ink/5 border-b border-ink/5">
              <tr>
                <th className="px-8 py-6 font-bold text-ink/40 uppercase tracking-widest text-[10px]">Architecture Component</th>
                <th className="px-8 py-6 font-bold text-ink/40 uppercase tracking-widest text-[10px] border-l border-ink/5">Certified Spec</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {TECH_SPECS.map(([label, spec]) => (
                <tr key={label} className="group hover:bg-ink/5 transition-colors">
                  <td className="px-8 py-6 font-semibold text-ink/80">{label}</td>
                  <td className="px-8 py-6 text-ink/50 font-medium border-l border-ink/5">{spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button className="rounded-full bg-ink px-10 py-3 text-base font-semibold text-white shadow-2xl hover:bg-matte-charcoal transition-all btn-ai-glow">
            Download Tech Sheet
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}
