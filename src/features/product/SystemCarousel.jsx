import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// 1. REPLACED LOCAL LOGIC: We moved the scroll listener to this hook 
// so this file stays clean and readable.
import { useScrollVisibility } from '../../hooks/useScrollVisibility'; 

import img1 from '../../assets/logistics_delivery.png';
import img2 from '../../assets/hardware_actuation.png';
import img3 from '../../assets/qr_verification.png';
import img4 from '../../assets/cloud_sync.png';
import img5 from '../../assets/high_speed_logistics.png';
import img6 from '../../assets/digital_divide.png';

const SYSTEM_SLIDES = [
  { 
    id: "logistics", 
    title: <>Drop and <br />Go Protocol.</>, 
    desc: "Shifting the delivery paradigm from synchronous to asynchronous, eliminating the 15-minute courier wait time for recipients.", 
    image: img1 
  },
  { 
    id: "hardware", 
    title: <>Hardware <br />Meets Actuation.</>, 
    desc: "Integrated iPad kiosks scan credentials while ESP32 microcontrollers trigger 12V electromagnetic solenoid locks.", 
    image: img2 
  },
  { 
    id: "security", 
    title: <>Dynamic <br />QR Verification.</>, 
    desc: "One-Time Use dynamic QR codes valid for a single transaction to prevent replay attacks and secure personal assets.", 
    image: img3 
  },
  { 
    id: "infrastructure", 
    title: <>Cloud <br />Sync Logic.</>, 
    desc: "Real-time synchronization with Firebase Realtime Database ensures authentication tokens are specific to both recipient and compartment.", 
    image: img4 
  },
  { 
    id: "efficiency", 
    title: <>Sub-Second <br />End-to-End Latency.</>, 
    desc: "Engineered for high-speed logistics, optimizing daily delivery quotas by solving last-mile delivery bottlenecks for couriers.", 
    image: img5 
  },
  { 
    id: "future", 
    title: <>Bridging <br />The Digital Divide.</>, 
    desc: "Bringing metropolitan-grade smart locker infrastructure to provincial academic and corporate sectors.", 
    image: img6 
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
      <AnimatePresence>
        <motion.div 
          key={current} 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          transition={{ duration: 0.45, ease: "circOut" }} 
          className="absolute inset-0"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full w-full"
            >
              {SYSTEM_SLIDES[current].image ? (
                <img 
                  alt={SYSTEM_SLIDES[current].id}
                  className="h-full w-full object-cover grayscale-[0.2]" 
                  src={SYSTEM_SLIDES[current].image} 
                />
              ) : (
                <div className="h-full w-full bg-[#0a0a0a]" />
              )}
            </motion.div>
          </div>

          <div className={`relative z-20 flex h-full flex-col justify-end px-6 pb-20 transition-all duration-700 ease-in-out md:px-10 md:pb-24 ${
            isVisible ? 'visible' : 'invisible'
          }`}>
            <div className="max-w-4xl text-left">
              <motion.h1 
                key={`title-${current}`}
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.5, ease: "circOut", delay: 0.1 }}
                className="mb-4 text-3xl font-semibold leading-[1.1] tracking-tighter sm:text-5xl md:mb-8 md:text-6xl"
              >
                {SYSTEM_SLIDES[current].title}
              </motion.h1>

              <motion.p 
                key={`desc-${current}`}
                initial={{ opacity: 0, x: -15 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.5, ease: "circOut", delay: 0.2 }}
                className="mb-8 max-w-xl text-sm font-medium leading-relaxed text-white/80 sm:text-lg md:mb-12 md:text-xl"
              >
                {SYSTEM_SLIDES[current].desc}
              </motion.p>


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