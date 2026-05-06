import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. REPLACED LOCAL LOGIC: We moved the scroll listener to this hook 
// so this file stays clean and readable.
import { useScrollVisibility } from '../../hooks/useScrollVisibility'; 

const SYSTEM_SLIDES = [
  { 
    id: "logistics", 
    title: <>Drop and <br />Go Protocol.</>, 
    desc: "Shifting the delivery paradigm from synchronous to asynchronous, eliminating the 15-minute courier wait time for recipients.", 
    video: "" 
  },
  { 
    id: "hardware", 
    title: <>Hardware <br />Meets Actuation.</>, 
    desc: "Integrated iPad kiosks scan credentials while ESP32 microcontrollers trigger 12V electromagnetic solenoid locks.", 
    video: "" 
  },
  { 
    id: "security", 
    title: <>Dynamic <br />QR Verification.</>, 
    desc: "One-Time Use dynamic QR codes valid for a single transaction to prevent replay attacks and secure personal assets.", 
    video: "" 
  },
  { 
    id: "infrastructure", 
    title: <>Cloud <br />Sync Logic.</>, 
    desc: "Real-time synchronization with Firebase Realtime Database ensures authentication tokens are specific to both recipient and compartment.", 
    video: "" 
  },
  { 
    id: "efficiency", 
    title: <>Sub-Second <br />End-to-End Latency.</>, 
    desc: "Engineered for high-speed logistics, optimizing daily delivery quotas by removing the 'Attendance Problem' for couriers.", 
    video: "" 
  },
  { 
    id: "future", 
    title: <>Bridging <br />The Digital Divide.</>, 
    desc: "Bringing metropolitan-grade smart locker infrastructure to provincial academic and corporate sectors.", 
    video: "" 
  }
];

export default function SystemCarousel() {
  const [current, setCurrent] = useState(0);
  
  // 2. THIS IS THE HOOK: It handles the scroll visibility for you.
  const isVisible = useScrollVisibility(400);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % SYSTEM_SLIDES.length), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        <motion.div 
          key={current} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 1.2, ease: "easeInOut" }} 
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <motion.div 
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="h-full w-full"
            >
              {SYSTEM_SLIDES[current].video ? (
                <video 
                  autoPlay muted loop playsInline 
                  className="h-full w-full object-cover grayscale-[0.2]" 
                  src={SYSTEM_SLIDES[current].video} 
                />
              ) : (
                <div className="h-full w-full bg-[#0a0a0a]" />
              )}
            </motion.div>
          </div>

          <div className={`relative z-20 flex h-full flex-col justify-end px-6 pb-20 transition-all duration-700 ease-in-out md:px-16 md:pb-24 lg:px-24 ${
            isVisible ? 'visible' : 'invisible'
          }`}>
            <div className="max-w-4xl text-left">
              <motion.h1 
                key={`title-${current}`}
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="mb-4 text-3xl font-black leading-[1.1] tracking-tighter sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl"
              >
                {SYSTEM_SLIDES[current].title}
              </motion.h1>

              <motion.p 
                key={`desc-${current}`}
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="mb-8 max-w-xl text-sm font-medium leading-relaxed text-white/50 sm:text-lg md:mb-12 md:text-xl"
              >
                {SYSTEM_SLIDES[current].desc}
              </motion.p>

              {/* 5. STACKING BUTTONS: flex-col for mobile, sm:flex-row for desktop */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <button type="button" className="w-full rounded-full bg-white px-8 py-3 text-sm font-semibold text-ink shadow-2xl transition-all hover:bg-ink hover:text-white active:scale-95 sm:w-auto md:text-base btn-ai-glow">
                  Try Protocol
                </button>

                <button type="button" className="w-full rounded-full border border-white/70 bg-transparent px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-ink active:scale-95 sm:w-auto md:text-base btn-ai-glow">
                  Technical Report
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 6. RESPONSIVE DOTS: Adjusted position for mobile screens */}
      <div className="absolute bottom-8 right-6 z-30 flex items-center gap-3 md:bottom-12 md:right-12">
        {SYSTEM_SLIDES.map((_, i) => (
          <button 
            key={i} 
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)} 
            className="group flex h-4 items-center justify-center"
          >
            <div className={`h-1.5 rounded-full transition-all duration-700 ease-out ${
              i === current 
                ? 'w-6 bg-white md:w-8 active-glow' 
                : 'w-1.5 bg-white/30 group-hover:bg-white/60'
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}