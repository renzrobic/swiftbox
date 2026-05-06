import React from 'react';
import { Link } from 'react-router-dom';

import ScrollReveal from '../../components/layout/ScrollReveal';

const INFRASTRUCTURE_STEPS = [
  {
    label: "Hardware Infrastructure",
    title: "ESP32 Powered Smart Nodes",
    description: "Deploy resilient locker units across campus. Each node manages physical security through 12V solenoid-driven access control, eliminating insecure Gate Drops.",
    videoSrc: "",
    reversed: false,
  },
  {
    label: "Asynchronous Protocol",
    title: "Solve the Attendance Problem",
    description: "SwiftBox removes the necessity for simultaneous physical presence. Couriers secure parcels instantly using the 'Drop and Go' protocol via the iPad kiosk.",
    videoSrc: "", 
    reversed: true,
  },
  {
    label: "Cloud Security",
    title: "Dynamic QR Validation",
    description: "Maintain end-to-end data integrity as the Firebase backend handles encrypted Time-Based One-Time Password (TOTP) generation and audit logs.",
    videoSrc: "", 
    reversed: false,
  }
];

export default function SystemInfrastructure() {
  return (
    <section id="infrastructure" className="overflow-hidden px-8 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        <ScrollReveal>
          <div className="mb-16 flex flex-col items-start justify-between gap-10 md:mb-24 md:flex-row md:gap-12">
            <div className="max-w-2xl">
              <h2 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-ink md:mb-8 md:text-5xl">
                Intelligent Nodes That <br className="hidden sm:block" /> Streamline Logistics
              </h2>
              <p className="max-w-xl text-lg font-medium leading-tight text-ink/70 md:text-xl">
                SwiftBox integrates an iPad-based central kiosk and ESP32 hardware to automate physical exchange, actively developed for academic institutions like Pagadian Capitol College.
              </p>            </div>
            <Link 
              to="/platform"
              className="rounded-full bg-ink px-6 py-2 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-matte-charcoal md:w-auto btn-ai-glow"
            >
              Explore System
            </Link>
          </div>
        </ScrollReveal>

        <div className="space-y-32 md:space-y-64">
          {INFRASTRUCTURE_STEPS.map((step, index) => (
            <ScrollReveal key={step.title} delay={0.1}>
              <div 
                className={`flex flex-col items-center gap-12 lg:flex-row md:gap-24 ${step.reversed ? 'lg:flex-row-reverse' : ''}`}
              >
                
                {/* VIDEO CANVAS */}
                <div className="relative aspect-[16/10] w-full lg:w-7/12" aria-hidden="true">
                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-ink/10 shadow-xl lg:rounded-2xl">
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink/5">
                      <span className="text-sm font-medium uppercase tracking-widest text-ink/40">
                        Video coming soon...
                      </span>
                    </div>
  
                    {/* Only render video if src exists to prevent console errors */}
                    {step.videoSrc && (
                      <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline 
                        className="h-full w-full object-cover"
                      >
                        <source src={step.videoSrc} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </div>
  
                {/* TEXT CONTENT */}
                <div className="w-full lg:w-5/12">
                  <span className="inline-block rounded-full bg-ink px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-pearl">
                    {step.label}
                  </span>
                  
                  <h3 className="mb-6 mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
                    {step.title}
                  </h3>
  
                  <p className="text-base font-normal leading-tight text-ink/70 md:text-lg">
                    {step.description}
                  </p>
                </div>
  
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}