import React from 'react';
import { Cpu, Zap, Radio } from 'lucide-react';
import ScrollReveal from '../../../components/layout/ScrollReveal';

export default function EmbeddedManifest() {
  return (
    <section className="mt-24 md:mt-40 py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-12">
          
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/20 mb-8">
                Embedded Stack
              </h2>
              <div className="space-y-6">
                 {["Dual-Core Processing", "RTOS Synchronization", "OTA Firmware Updates"].map((item) => (
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
                  <Cpu className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  ESP32 Core Orchestration.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  At the heart of every SwiftBox node is the <span className="text-ink">ESP32-WROOM-32</span>. Its dual-core architecture allows us to separate time-critical actuation logic from network-bound cloud communication, ensuring that physical access remains responsive even during high network congestion.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 shadow-xl border border-ink/5">
                  <Radio className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  Sub-200ms Cloud Handshake.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  We utilize a proprietary <span className="text-ink">MQTT/Websocket bridge</span> via Firebase to achieve near-instantaneous sync. When a user scans their QR code at the kiosk, the actuation signal reaches the physical locker node in less than 200 milliseconds globally.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="max-w-2xl">
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/5 shadow-xl border border-ink/5">
                  <Zap className="text-ink" size={28} />
                </div>
                <h3 className="mb-6 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                  Industrial Relay Isolation.
                </h3>
                <p className="text-xl leading-relaxed text-ink/50 font-medium">
                  Physical security is managed via <span className="text-ink">optocoupled relay modules</span>. This provides total electrical isolation between the low-voltage logic of the ESP32 and the high-current 12V solenoid circuits, protecting the system from power surges and EMI interference.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
