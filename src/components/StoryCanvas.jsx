import React from 'react';

const LOGISTICS_STEPS = [
  {
    label: "Hardware Infrastructure",
    title: "IoT Powered Smart Nodes",
    description: "Deploy resilient, ESP32-based locker units across campus. Each node manages physical security through solenoid-driven access control and real-time environment monitoring.",
    videoSrc: "/hero-video.mp4", 
    reversed: false,
  },
  {
    label: "Asynchronous Protocol",
    title: "Eliminate Delivery Friction",
    description: "SwiftBox removes the necessity for real-time handoffs. Couriers secure parcels in seconds using the 'Drop and Go' protocol, ending lobby clutter and student delivery missed-calls.",
    videoSrc: "/hero-video.mp4",
    reversed: true,
  },
  {
    label: "Cloud Security",
    title: "Scale Logistics with Security",
    description: "Maintain end-to-end data integrity as Firebase handles encrypted PIN generation and audit logs, ensuring every parcel is accounted for from drop-off to final retrieval.",
    videoSrc: "/hero-video.mp4",
    reversed: false,
  }
];

export default function StoryCanvas() {
  return (
    <section className="overflow-hidden px-8 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* --- MAIN HEADER --- */}
        <div className="mb-16 flex flex-col items-start justify-between gap-10 md:mb-24 md:flex-row md:gap-12">
          <div className="max-w-2xl">
            <h2 className="mb-6 text-4xl font-semibold tracking-tight text-royal-blue leading-tight md:mb-8 md:text-5xl">
              Intelligent Nodes That <br className="hidden sm:block" /> Streamline Logistics
            </h2>
            <p className="max-w-xl text-lg font-medium leading-tight text-royal-blue/70 md:text-xl">
              SwiftBox integrates precision hardware and cloud protocols to automate physical exchange, turning traditional storage into a secure, responsive delivery network.
            </p>
          </div>
          <button className="w-full rounded-full bg-royal-blue px-8 py-3 text-base font-semibold text-cool-white shadow-2xl transition-transform hover:scale-105 md:w-auto">
            Explore System
          </button>
        </div>

        {/* --- ALTERNATING SECTIONS --- */}
        <div className="space-y-32 md:space-y-64">
          {LOGISTICS_STEPS.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center gap-12 lg:flex-row md:gap-24 ${step.reversed ? 'lg:flex-row-reverse' : ''}`}
            >
              
              {/* --- VIDEO CANVAS --- */}
              <div className="relative aspect-[16/10] w-full lg:w-7/12">
                <div className="h-full w-full overflow-hidden rounded-3xl shadow-xl">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="h-full w-full object-cover"
                  >
                    <source src={step.videoSrc} type="video/mp4" />
                  </video>
                </div>
              </div>

              {/* --- TEXT CONTENT --- */}
              <div className="w-full lg:w-5/12">
                <span className="inline-block rounded-full bg-royal-blue px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-cool-white">
                  {step.label}
                </span>
                
                <h3 className="mb-6 mt-4 text-3xl font-semibold tracking-tight text-royal-blue leading-tight md:text-4xl">
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