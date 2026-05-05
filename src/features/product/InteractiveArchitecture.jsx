import React from 'react';
import { Activity, Database, Cpu, Lock } from 'lucide-react';

export default function InteractiveArchitecture() {
  return (
    <section className="bg-white py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10 text-center">
        <h2 className="mb-4 text-3xl font-semibold leading-tight tracking-tight text-royal-blue md:mb-6 md:text-5xl">
          System Architecture
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-base font-medium leading-tight text-royal-blue/70 md:mb-16 md:text-xl">
          A high-level overview of our asynchronous end-to-end delivery protocol.
        </p>

        {/* 🛠️ RESPONSIVE GRID: flex-col (Mobile) -> md:flex-row (Desktop) */}
        <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-3xl border border-royal-blue/10 bg-royal-blue/5 p-8 md:flex-row md:p-12 md:gap-8">
          
          {/* STEP 1 */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg md:h-16 md:w-16">
              <Activity className="text-royal-blue" size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-royal-blue">Kiosk App</span>
          </div>

          {/* CONNECTOR 1: Vertical on mobile, Horizontal on desktop */}
          <div className="h-8 w-0.5 border-l-2 border-dashed border-royal-blue/30 md:h-0.5 md:w-24 md:border-t-2 md:border-l-0" />

          {/* STEP 2 */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-royal-blue text-white shadow-xl md:h-16 md:w-16">
              <Database size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-royal-blue">Firebase</span>
          </div>

          {/* CONNECTOR 2 */}
          <div className="h-8 w-0.5 border-l-2 border-dashed border-royal-blue/30 md:h-0.5 md:w-24 md:border-t-2 md:border-l-0" />

          {/* STEP 3 */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg md:h-16 md:w-16">
              <Cpu className="text-royal-blue" size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-royal-blue">ESP32 Node</span>
          </div>

          {/* CONNECTOR 3 */}
          <div className="h-8 w-0.5 border-l-2 border-dashed border-royal-blue/30 md:h-0.5 md:w-24 md:border-t-2 md:border-l-0" />

          {/* STEP 4 */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg md:h-16 md:w-16">
              <Lock className="text-royal-blue" size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-royal-blue">12V Solenoid</span>
          </div>

        </div>
      </div>
    </section>
  );
}