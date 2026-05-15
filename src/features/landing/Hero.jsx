import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollVisibility } from '../../hooks/useScrollVisibility';
import OptimizedMedia from '../../components/ui/OptimizedMedia';


export default function Hero() {
  // Use our new custom hook, passing the 400px threshold
  const isVisible = useScrollVisibility(400);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black md:h-[90vh]">
      
      {/* VIDEO/IMAGE BACKGROUND */}
      <div className="absolute inset-0 bg-matte-charcoal" aria-hidden="true">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        <OptimizedMedia 
          type="video"
          src="https://videos.pexels.com/video-files/15439973/15439973-hd_1920_1080_30fps.mp4"
          fallbackSrc="https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          priority={true}
          aspectRatio="h-full w-full"
          className="h-full w-full"
        />

        {/* Fallback color for very slow connections */}
        <div className="absolute inset-0 -z-10 bg-matte-charcoal" />
      </div>


      {/* CONTENT */}
      <div 
        className={`relative z-20 flex h-full flex-col justify-end px-6 pb-20 transition-all duration-700 ease-in-out md:px-10 md:pb-24 ${
          isVisible ? 'translate-y-0 opacity-100 visible' : 'invisible translate-y-4 opacity-0'
        }`}
      >
        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-12">
          
          <div className="flex-1">
            <h1 className="leading-[1.1] tracking-tighter text-white drop-shadow-2xl text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-semibold">
              Secure last-mile logistics with <br className="hidden sm:block" /> 
              our smart locker system
            </h1>
          </div>
          
          <div className="mb-4 flex-shrink-0 md:w-auto">
            <Link 
              to="/track"
              className="group flex items-center justify-center gap-4 rounded-full bg-white px-8 py-3 text-base font-semibold text-ink shadow-apple-lg transition-all duration-300 hover:bg-ink hover:text-white active:scale-95 md:px-8 md:py-3 md:text-lg btn-ai-glow"
            >
              Track Parcel
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}