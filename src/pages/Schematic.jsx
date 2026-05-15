import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';
import { Cpu, Zap, Radio, ShieldCheck } from 'lucide-react';

export default function Schematic() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-10">
      <Helmet>
        <title>IoT Schematic | Swiftbox Tech</title>
      </Helmet>
      
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="text-ink mb-6">IoT Schematic</h1>
            <p className="text-lg md:text-xl font-medium text-ink/60 leading-relaxed">
              Technical overview of the SwiftBox hardware node, including actuation circuitry and synchronization logic.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-pearl border border-ink/5 flex items-center justify-center">
                <Cpu size={24} className="text-ink/40" />
              </div>
              <div>
                <h4 className="text-ink mb-1">ESP32-WROOM-32</h4>
                <p className="text-sm text-ink/50 font-medium">Dual-core processing node with integrated Wi-Fi stack for real-time Firebase handshakes.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-pearl border border-ink/5 flex items-center justify-center">
                <Zap size={24} className="text-ink/40" />
              </div>
              <div>
                <h4 className="text-ink mb-1">12V Solenoid Actuator</h4>
                <p className="text-sm text-ink/50 font-medium">Fail-secure electromagnetic locking mechanism with flyback diode protection.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-pearl border border-ink/5 flex items-center justify-center">
                <ShieldCheck size={24} className="text-ink/40" />
              </div>
              <div>
                <h4 className="text-ink mb-1">Encrypted Bus</h4>
                <p className="text-sm text-ink/50 font-medium">Secure local communication between the kiosk terminal and actuation nodes.</p>
              </div>
            </div>
          </div>

          <div className="aspect-square rounded-3xl bg-pearl border border-ink/5 flex items-center justify-center relative overflow-hidden">
             {/* Abstract Schematic Art */}
             <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <Radio size={300} strokeWidth={0.5} />
             </div>
             <div className="relative z-10 text-center p-8">
                <div className="w-48 h-px bg-ink/10 mx-auto" />
                <p className="mt-4 text-xs font-bold text-ink/40">Schematic PDF available to <br />authorized facility managers.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
