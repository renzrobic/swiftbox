import React from 'react';
import { Lock, Zap, Shield } from 'lucide-react';
import ScrollReveal from '../../../components/layout/ScrollReveal';

export default function KineticManifest() {
  return (
    <section className="mt-24 md:mt-40 py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-12">
          
          {/* Sidebar Label */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20 mb-8">
                Technical Specifications
              </h2>
              <div className="space-y-6">
                 {["Actuation Latency", "Stress Threshold", "Duty Cycle Rating"].map((item) => (
                   <div key={item} className="flex items-center gap-4 group">
                      <div className="h-px w-8 bg-ink/10 group-hover:w-12 group-hover:bg-ink transition-all" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 group-hover:text-ink transition-colors">{item}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Content Blocks */}
          <div className="lg:col-span-8 space-y-32 md:space-y-48">
            <ScrollReveal>
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 shadow-xl border border-ink/5">
                  <Lock className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  12V Electromagnetic Solenoid Systems.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  Our units utilize industrial-grade hardware with a <span className="text-ink">75kg axial stress limit</span>. This ensures physical security in high-traffic campus environments, effectively eliminating the risk profile associated with traditional gate-drop delivery methods.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 shadow-xl border border-ink/5">
                  <Zap className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  The 'Drop and Go' Protocol.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  By uncoupling the recipient from the physical delivery timeline, we solve the <span className="text-ink">Attendance Problem</span>. Riders save an average of 12 minutes per transaction by utilizing our asynchronous handshake architecture.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 shadow-xl border border-ink/5">
                  <Shield className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  Networked Actuation Safety.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  Actuation commands are only executed upon successful multi-node validation. The solenoid fires only when the <span className="text-ink">ESP32 Gateway</span> confirms an encrypted signature broadcasted from the authorized iPad kiosk.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
