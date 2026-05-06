import React from 'react';
import { Shield, Cpu, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // 🛠️ Import Link for navigation

const TAGS = ["Modular Scalability", "Institutional Security", "Cloud-Native Sync", "Low-Latency Logic"];

// 🛠️ Updated CARDS to include destination paths
const CARDS = [
  {
    title: "Embedded System Logic",
    id: "iot",
    path: "/product/iot"
  },
  {
    title: "Encrypted Access",
    id: "cloud",
    path: "/product/security"
  }
];

export default function TechnicalArchitecture() {
  return (
    <section id="architecture" className="relative my-6 md:my-10 overflow-hidden bg-ink px-6 py-16 text-pearl shadow-2xl md:px-10 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <h2 className="mb-4 md:mb-6 text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Development Focus
          </h2>
          <p className="max-w-2xl mx-auto md:mx-0 text-base md:text-xl font-medium leading-tight text-pearl/90">
            Our engineering roadmap is built on industrial-grade hardware, secure cloud synchronization, and sub-second physical response times.
          </p>
        </div>

        <div className="space-y-6 md:space-y-10">
          {/* Main Feature Card: Kinetic Locking */}
          <div className="group relative flex h-[350px] md:h-[400px] items-end overflow-hidden rounded-2xl md:rounded-3xl border border-white/20 bg-white/10 p-6 md:p-12">
            <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <h3 className="max-w-md text-xl md:text-3xl font-medium tracking-tight">
                Kinetic Locking Architecture
              </h3>
              <Link
                to="/product/kinetic"
                className="w-full md:w-auto text-center rounded-full bg-white px-6 py-2.5 text-sm md:text-base font-semibold text-ink shadow-lg transition hover:bg-pearl active:scale-95 btn-ai-glow"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Secondary Cards: IoT and Security */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            {CARDS.map((card) => (
              <div key={card.id} className="group relative flex h-[280px] md:h-[300px] flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl md:rounded-3xl border border-white/20 bg-white/10 p-6 md:p-10 md:flex-row md:items-end">
                <h3 className="text-xl md:text-3xl font-medium tracking-tight">{card.title}</h3>
                {/* 🛠️ Updated to Link with dynamic path */}
                <Link
                  to={card.path}
                  className="w-full md:w-auto text-center rounded-full bg-white px-6 py-2.5 text-sm md:text-base font-semibold text-ink shadow-lg transition hover:bg-pearl active:scale-95 btn-ai-glow"
                >
                  Learn more
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom Grid Tags */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {TAGS.map((tag) => (
              <div key={tag} className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10">
                <span className="text-sm md:text-lg font-normal">{tag}</span>
                <ArrowRight size={16} className="opacity-40 transition-opacity md:opacity-0 group-hover:opacity-100" />
              </div>
            ))}

            {/* 🛠️ Linking Hardened Access Layer to Security Page */}
            <Link
              to="/product/security"
              className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10 sm:col-span-2"
            >
              <Shield size={20} className="shrink-0 text-white/50" />
              <span className="text-sm md:text-lg font-normal">Hardened Access Layer</span>
              <ArrowRight size={16} className="ml-auto opacity-40 transition-opacity md:opacity-0 group-hover:opacity-100" />
            </Link>

            {/* 🛠️ Linking Real-time Logic to IoT Page */}
            <Link
              to="/product/iot"
              className="group flex cursor-pointer items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 transition hover:bg-white/10 sm:col-span-2"
            >
              <Cpu size={20} className="shrink-0 text-white/50" />
              <span className="text-sm md:text-lg font-normal">Real-time Logistics Logic</span>
              <ArrowRight size={16} className="ml-auto opacity-40 transition-opacity md:opacity-0 group-hover:opacity-100" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}