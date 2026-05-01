import React from 'react';

export default function ProductAndPlatform() {
  return (
    <section className="overflow-hidden px-8 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        {/* --- TOP HEADER --- */}
        <div className="mb-10 md:mb-12">
          <h2 className="text-4xl font-semibold tracking-tight text-royal-blue leading-tight md:text-5xl">
            Product & Platform
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-tight text-royal-blue/70 md:text-xl">
            Scalable foundations for a new era of automated logistics.
          </p>
        </div>

        {/* --- MAIN VIDEO CONTAINER --- */}
        <div className="group relative h-[250px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[400px] md:h-[550px]">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* --- BOTTOM CONTENT --- */}
        <div className="mt-8 flex flex-col items-start justify-between gap-8 md:mt-10 md:flex-row">
          
          <div className="max-w-2xl">
            <h3 className="mb-4 text-2xl font-semibold text-royal-blue md:text-3xl">
              Swiftbox
            </h3>
            <p className="text-base font-normal leading-tight text-royal-blue/70 md:text-lg">
              Streamline logistics from arrival to pickup with systems that authenticate, actuate, and sync assets across hardware, cloud, and digital keys.
            </p>
          </div>

          <div className="w-full flex-shrink-0 md:w-auto">
            <button className="w-full rounded-full bg-royal-blue px-8 py-3 text-base font-semibold text-cool-white shadow-lg transition-all duration-300 hover:bg-matte-charcoal md:w-auto">
              Learn more
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}