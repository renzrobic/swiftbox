import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '../components/layout/ScrollReveal';

export default function Documentation() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-6 md:px-10">
      <Helmet>
        <title>Documentation | Swiftbox Tech</title>
      </Helmet>
      
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="mb-16">
            <h1 className="text-ink mb-6">Documentation</h1>
            <p className="text-lg md:text-xl font-medium text-ink/60 leading-relaxed">
              Comprehensive technical guides for the SwiftBox ecosystem, from hardware integration to cloud synchronization.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-16">
          {/* SECTION 1: INTRODUCTION */}
          <section>
            <h3 className="text-ink mb-6 text-2xl font-semibold">1. Introduction</h3>
            <div className="space-y-4 text-ink/60 leading-relaxed font-medium">
              <p>
                The global economy is currently undergoing a profound metamorphosis driven by the Fourth Industrial Revolution, a period defined by the convergence of digital, physical, and biological systems. Central to this transformation is the Internet of Things (IoT), which has fundamentally redefined the logistics landscape.
              </p>
              <p>
                SwiftBox is positioned at the intersection of this revolution, providing an IoT-enabled secure smart locker system designed to optimize last-mile logistics. By integrating advanced microcontrollers with cloud-based synchronization, we eliminate the bottlenecks associated with traditional parcel delivery methods in academic and corporate environments.
              </p>
            </div>
          </section>

          {/* SECTION 2: THE PROBLEM */}
          <section className="pt-12 border-t border-ink/5">
            <h3 className="text-ink mb-6 text-2xl font-semibold">2. Problem Statement</h3>
            <div className="space-y-4 text-ink/60 leading-relaxed font-medium">
              <p>
                The 'last-mile' of delivery remains the most expensive and inefficient part of the logistics chain. SwiftBox addresses three critical failures in the current system:
              </p>
              <ul className="space-y-4 mt-6">
                <li className="flex gap-4 items-start bg-pearl/50 p-4 rounded-2xl border border-ink/5">
                  <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-ink/5 text-[10px] font-bold text-ink">01</div>
                  <div>
                    <p className="font-semibold text-ink">Failed Delivery Attempts</p>
                    <p className="text-sm opacity-80">Recipients are often unavailable during courier windows, leading to repeat attempts, increased operational costs, and higher carbon emissions.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-pearl/50 p-4 rounded-2xl border border-ink/5">
                  <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-ink/5 text-[10px] font-bold text-ink">02</div>
                  <div>
                    <p className="font-semibold text-ink">Security & Gate-Drops</p>
                    <p className="text-sm opacity-80">Unattended packages or those left with unauthorized personnel (Gate-Drops) are highly vulnerable to theft, misplacement, and damage.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start bg-pearl/50 p-4 rounded-2xl border border-ink/5">
                  <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-ink/5 text-[10px] font-bold text-ink">03</div>
                  <div>
                    <p className="font-semibold text-ink">Courier Dwell Time</p>
                    <p className="text-sm opacity-80">Couriers spend excessive time navigating institutional checkpoints or waiting for recipient handovers, reducing fleet efficiency.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* SECTION 3: CORE PROTOCOLS */}
          <section className="p-8 md:p-12 rounded-[2.5rem] bg-ink text-white shadow-2xl">
            <h3 className="text-white mb-8 text-sm uppercase tracking-widest font-semibold opacity-50">3. Technical Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-lg text-white">Hardware Actuation</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-2">Industrial-grade 12V electromagnetic solenoids (fail-secure) are triggered via an optocoupled relay system driven by an ESP32 microcontroller.</p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-white">Cloud Sync Logic</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-2">Real-time database triggers provide sub-200ms latency between the iPad Kiosk and physical locker nodes.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="font-semibold text-lg text-white">Authentication (TOTP)</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-2">Time-based One-Time Passwords (TOTP) ensure that QR codes generated for parcel claims expire after 60 seconds.</p>
                </div>
                <div>
                  <p className="font-semibold text-lg text-white">Audit Integrity</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-2">Every physical transaction (actuation, compartment door state) is timestamped and logged for absolute accountability.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: RESEARCH INFO */}
          <section className="pt-12 border-t border-ink/5">
            <h3 className="text-ink mb-6 text-2xl font-semibold">4. Research & Authorship</h3>
            <div className="space-y-4 text-ink/60 font-medium leading-relaxed">
              <p className="text-ink font-bold uppercase tracking-tight">SWIFTBOX: AN IOT-ENABLED SECURE SMART LOCKER SYSTEM WITH QR CODE VERIFICATION FOR LAST-MILE LOGISTICS</p>
              <p>A Capstone Project Proposal Presented to the Faculty of the College of Computer Studies, Pagadian Capitol College, Inc.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink/30 mb-4">Project Authors</p>
                  <ul className="text-sm space-y-2 border-l border-ink/10 pl-6">
                    <li>BERNAL, RENZ ROBIC L.</li>
                    <li>VILLAR, JARWIN D.</li>
                    <li>RAMOS, KIM PHILIP C.</li>
                    <li>CARPIO, ARMAN GREY C.</li>
                    <li>PADAYHAG, JAPHER G.</li>
                  </ul>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-ink/30 mb-2">Timeline</p>
                    <p className="text-sm font-semibold text-ink">April 2026</p>
                  </div>
                  <div className="mt-6">
                    <p className="text-[10px] uppercase tracking-wider text-ink/30 mb-2">Institution</p>
                    <p className="text-sm font-semibold text-ink">Pagadian Capitol College, Inc.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: TECHNICAL STATUS */}
          <section className="pt-12 border-t border-ink/5">
            <h3 className="text-ink mb-6 text-sm uppercase tracking-widest font-semibold opacity-40">System Disclosure</h3>
            <p className="text-sm text-ink/40 font-medium leading-relaxed italic">
              SwiftBox is currently in an advanced experimental prototyping phase. The integrated hardware ecosystem is a functional unit developed for institutional research. To facilitate evaluation, logistics data is currently managed within a localized testing environment, simulating future handshake architecture for commercial carrier integration.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
