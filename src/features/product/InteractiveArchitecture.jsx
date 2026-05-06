import React, { useRef, useState, useEffect } from 'react';
import { Activity, Database, Cpu, Lock } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const ARCH_STEPS = [
  {
    id: 'kiosk',
    label: 'Kiosk App',
    icon: Activity,
    title: 'Customer Terminal Interface',
    desc: 'The centralized authentication node. The iPad terminal orchestrates the sub-second protocol sequence, handling optical QR validation and communicating directly with the Firebase synchronization layer to authorize hardware actuation.'
  },
  {
    id: 'firebase',
    label: 'Firebase',
    icon: Database,
    title: 'Cloud Synchronization Logic',
    desc: 'The backbone of our sub-second real-time synchronization. Firebase provides an ultra-low latency data pipe that ensures authorization tokens, compartment status, and audit logs are perfectly synchronized between the cloud and hardware nodes, preventing replay attacks and ensuring system-wide data integrity at scale.'
  },
  {
    id: 'esp32',
    label: 'ESP32 Node',
    icon: Cpu,
    title: 'Hardware Actuation Controller',
    desc: 'The critical bridge between digital logic and physical actuation. Each locker bank is powered by industrial-grade ESP32 microcontrollers that utilize secure WebSocket protocols to receive encrypted commands from the cloud and trigger electromagnetic locks with millisecond precision, even in intermittent connectivity environments.'
  },
  {
    id: 'solenoid',
    label: '12V Solenoid',
    icon: Lock,
    title: 'Electromagnetic Locking',
    desc: 'The final layer of physical security. Our 12V electromagnetic solenoids are rated for 500,000+ duty cycles, providing industrial-grade locking strength. They feature fail-secure logic to ensure compartments remain locked during power failures while remaining immediately responsive to valid authentication triggers.'
  }
];

export default function InteractiveArchitecture() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const activeIndex = useTransform(smoothProgress, [0, 0.1, 0.35, 0.6, 0.85, 0.95], [-1, 0, 1, 2, 3, 3]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* STICKY CONTENT */}
      <section className="sticky top-24 h-screen flex flex-col justify-start pt-16 bg-white overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 text-center">
          
          <div className="mb-6 md:mb-8">
            <h2 className="mb-2 text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              System Architecture
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-medium leading-tight text-ink/70 md:text-lg">
              Protocol Sequence Analysis
            </p>
          </div>

          {/* 🛠️ ICON STRIP */}
          <div className="relative mx-auto flex max-w-4xl flex-row items-center justify-between gap-4 rounded-3xl border border-ink/10 bg-ink/5 p-6 md:p-8">
            <div className="absolute top-[48px] md:top-[68px] left-12 right-12 h-[3px] bg-ink/5 -translate-y-1/2 rounded-full" />
            
            <motion.div 
              style={{ scaleX: smoothProgress }}
              className="absolute top-[48px] md:top-[68px] left-12 right-12 h-[4px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left -translate-y-1/2 rounded-full blur-[1px] opacity-100"
            />

            {/* ── MAGIC PIXEL DUST TIP ── */}
            <motion.div
              style={{ 
                left: useTransform(smoothProgress, [0, 1], ["48px", "calc(100% - 48px)"]),
                opacity: useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
              }}
              className="absolute top-[48px] md:top-[68px] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
            >
              <div className="relative">
                <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 5)],
                      y: [0, (i < 2 ? 1 : -1) * (8 + i * 4)],
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ duration: 0.8 + i * 0.2, repeat: Infinity, ease: "easeOut", delay: i * 0.1 }}
                    className="absolute top-1/2 left-1/2 h-1 w-1 rounded-full bg-white"
                  />
                ))}
              </div>
            </motion.div>

            {ARCH_STEPS.map((step, index) => (
              <NodeIcon 
                key={step.id} 
                step={step} 
                index={index} 
                activeIndex={activeIndex} 
              />
            ))}
          </div>

          {/* ── DETAIL DRAWER ── */}
          <div className="relative mx-auto mt-6 max-w-4xl min-h-[400px] flex items-start justify-center overflow-visible">
            <AnimatePresence mode="wait">
              {ARCH_STEPS.map((step, index) => (
                <NodeDetail 
                  key={step.id} 
                  step={step} 
                  index={index} 
                  activeIndex={activeIndex} 
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

function NodeIcon({ step, index, activeIndex }) {
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    return activeIndex.on("change", (val) => {
      const active = Math.round(val) === index;
      if (active !== isActive) setIsActive(active);
    });
  }, [activeIndex, index, isActive]);

  return (
    <div className="relative flex flex-col items-center gap-3 z-10">
      <motion.div className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-1000 md:h-16 md:w-16 border border-ink/5 ${
        isActive ? 'bg-ink text-white scale-110 shadow-xl border-transparent' : 'bg-white text-ink/40 shadow-sm'
      }`}>
        <step.icon size={24} />
      </motion.div>
      <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-colors duration-1000 ${
        isActive ? 'text-ink' : 'text-ink/30'
      }`}>
        {step.label}
      </span>
    </div>
  );
}

function NodeDetail({ step, index, activeIndex }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    return activeIndex.on("change", (val) => {
      const visible = Math.round(val) === index;
      if (visible !== isVisible) setIsVisible(visible);
    });
  }, [activeIndex, index, isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-0 flex flex-col rounded-3xl border border-ink/5 bg-white p-8 text-left shadow-2xl md:p-10"
        >
          <h3 className="mb-4 text-2xl md:text-4xl font-semibold tracking-tight text-ink leading-tight">
            {step.title}
          </h3>
          <p className="text-sm md:text-base font-medium leading-relaxed text-ink/60">
            {step.desc}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
