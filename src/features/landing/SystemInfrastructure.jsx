import React from 'react';

const INFRASTRUCTURE_STEPS = [
  {
    label: "Hardware Infrastructure",
    title: "IoT Powered Smart Nodes",
    description: "Deploy resilient, ESP32-based locker units across campus. Each node manages physical security through solenoid-driven access control and real-time environment monitoring.",
    videoSrc: "",
    reversed: false,
  },
  {
    label: "Asynchronous Protocol",
    title: "Eliminate Delivery Friction",
    description: "SwiftBox removes the necessity for real-time handoffs. Couriers secure parcels in seconds using the 'Drop and Go' protocol, ending lobby clutter and student delivery missed-calls.",
    videoSrc: "", 
    reversed: true,
  },
  {
    label: "Cloud Security",
    title: "Scale Logistics with Security",
    description: "Maintain end-to-end data integrity as Firebase handles encrypted PIN generation and audit logs, ensuring every parcel is accounted for from drop-off to final retrieval.",
    videoSrc: "", 
    reversed: false,
  }
];

export default function SystemInfrastructure() {
  return (
    <section id="infrastructure" className="overflow-hidden px-8 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-16 flex flex-col items-start justify-between gap-10 md:mb-24 md:flex-row md:gap-12">
          <div className="max-w-2xl">
            <h2 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-royal-blue md:mb-8 md:text-5xl">
              Intelligent Nodes That <br className="hidden sm:block" /> Streamline Logistics
            </h2>
            <p className="max-w-xl text-lg font-medium leading-tight text-royal-blue/70 md:text-xl">
              SwiftBox integrates precision hardware and cloud protocols to automate physical exchange, turning traditional storage into a secure, responsive delivery network.
            </p>
          </div>
          <button 
            type="button"
            className="rounded-full bg-royal-blue px-6 py-2 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-matte-charcoal md:w-auto"
          >
            Explore System
          </button>
        </div>

        <div className="space-y-32 md:space-y-64">
          {INFRASTRUCTURE_STEPS.map((step) => (
            <div 
              key={step.title} 
              className={`flex flex-col items-center gap-12 lg:flex-row md:gap-24 ${step.reversed ? 'lg:flex-row-reverse' : ''}`}
            >
              
              {/* VIDEO CANVAS */}
              <div className="relative aspect-[16/10] w-full lg:w-7/12" aria-hidden="true">
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-royal-blue/10 shadow-xl lg:rounded-2xl">
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-royal-blue/5">
                    <span className="text-sm font-medium uppercase tracking-widest text-royal-blue/40">
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
                <span className="inline-block rounded-full bg-royal-blue px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-cool-white">
                  {step.label}
                </span>
                
                <h3 className="mb-6 mt-4 text-3xl font-semibold leading-tight tracking-tight text-royal-blue md:text-4xl">
                  {step.title}
                </h3>

                <p className="text-base font-normal leading-tight text-royal-blue/70 md:text-lg">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}