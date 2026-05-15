import React from 'react';
import { ShieldCheck, Fingerprint, Key } from 'lucide-react';
import ScrollReveal from '../../../components/layout/ScrollReveal';

export default function SecurityManifest() {
  return (
    <section className="mt-24 md:mt-40 py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-12">
          
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20 mb-8">
                Security Protocol
              </h2>
              <div className="space-y-6">
                 {["TOTP Generation", "Handshake Validation", "Audit Trail Logging"].map((item) => (
                   <div key={item} className="flex items-center gap-4 group">
                      <div className="h-px w-8 bg-ink/10 group-hover:w-12 group-hover:bg-ink transition-all" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40 group-hover:text-ink transition-colors">{item}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-32 md:space-y-48">
            <ScrollReveal>
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 shadow-xl border border-ink/5">
                  <Fingerprint className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  Dynamic QR Handshake.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  We leverage <span className="text-ink">Time-Based One-Time Password (TOTP)</span> algorithms to generate unique, short-lived QR codes. This prevents replay attacks and ensures that access is only granted to authorized users during a specific time window.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 shadow-xl border border-ink/5">
                  <ShieldCheck className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  Centralized Node Orchestration.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  All lock/unlock commands are orchestrated via a centralized <span className="text-ink">iPadOS Kiosk</span>. This kiosk communicates over an encrypted channel to the Firebase cloud, which then broadcasts the signed actuation command to the specific locker node.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 shadow-xl border border-ink/5">
                  <Key className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  End-to-End Audit Logs.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  Every interaction—from courier drop-off to recipient pick-up—is logged with a unique session ID. This creates an <span className="text-ink">immutable audit trail</span>, providing administrators with full visibility into the lifecycle of every parcel.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
