import React from 'react';
import { Link } from 'react-router-dom';

export default function SystemOverview() {
  return (
    <section id="product-platform" className="overflow-hidden px-8 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        
        <div className="mb-10 md:mb-12">
          <h2 className="text-4xl font-semibold tracking-tight text-royal-blue leading-tight md:text-5xl">
            Product & Platform
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-tight text-royal-blue/70 md:text-xl">
            Scalable foundations for a new era of automated logistics.
          </p>
        </div>

        <div className="group relative h-[250px] w-full overflow-hidden rounded-xl lg:rounded-2xl shadow-2xl sm:h-[400px] md:h-[550px] bg-royal-blue/10">
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center text-royal-blue/30">
            Video coming soon...
          </div>
        </div>

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
            {/* 📍 to="/product" is the URL address, not the file location! */}
            <Link 
              to="/product" 
              className="inline-block w-full rounded-full bg-royal-blue px-8 py-3 text-center text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-matte-charcoal md:w-auto"
            >
              Learn more
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}