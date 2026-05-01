import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 400;
      setIsVisible(window.scrollY <= threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black">
      
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="h-full w-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* CONTENT */}
      <div className={`
        relative z-20 flex h-full flex-col justify-end px-8 pb-10 
        transition-all duration-700 ease-in-out
        ${isVisible ? 'visible opacity-100' : 'invisible opacity-0'}
      `}>
        <div className="flex w-full flex-col items-start justify-between gap-5 md:flex-row md:items-end md:gap-12">
          
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tighter text-white drop-shadow-2xl leading-[1.2] sm:text-4xl md:text-5xl">
              Secure delivery with <br className="hidden sm:block" /> 
              our smart locker
            </h1>
          </div>
          
          <div className="mb-4 flex-shrink-0">
            <button className="group flex items-center gap-4 rounded-full bg-white px-6 py-3 text-lg font-semibold text-royal-blue shadow-2xl transition-all duration-300 hover:bg-royal-blue hover:text-white">
              Track Parcel
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}