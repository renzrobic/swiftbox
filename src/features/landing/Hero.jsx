import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';

export default function Hero() {
  // Use our new custom hook, passing the 400px threshold
  const isVisible = useScrollVisibility(400);
  const videoSrc = ""; // Populate this when your video is ready

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black md:h-[90vh]">
      
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 bg-matte-charcoal" aria-hidden="true">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {videoSrc && (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="h-full w-full object-cover opacity-0 transition-opacity duration-1000" 
            onCanPlay={(e) => e.target.classList.remove('opacity-0')}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>

      {/* CONTENT */}
      <div 
        className={`relative z-20 flex h-full flex-col justify-end px-6 pb-10 transition-all duration-700 ease-in-out md:px-8 md:pb-16 ${
          isVisible ? 'translate-y-0 opacity-100 visible' : 'invisible translate-y-4 opacity-0'
        }`}
      >
        <div className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-12">
          
          <div className="flex-1">
            <h1 className="font-semibold leading-[1.1] tracking-tighter text-white drop-shadow-2xl text-3xl sm:text-4xl md:text-5xl md:leading-[1.2] lg:text-6xl">
              Secure delivery with <br className="hidden sm:block" /> 
              our smart locker
            </h1>
          </div>
          
          <div className="mb-4 flex-shrink-0 md:w-auto">
            <Link 
              to="/track"
              className="group flex items-center justify-center gap-4 rounded-full bg-white px-6 py-2 text-base font-semibold text-ink shadow-2xl transition-all duration-300 hover:bg-ink hover:text-white active:scale-95 md:px-6 md:py-2 md:text-lg btn-ai-glow"
            >
              Track Parcel
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}