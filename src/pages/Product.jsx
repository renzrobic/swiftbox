import React from 'react';
import { Helmet } from 'react-helmet-async';

// Layout Components
import ScrollReveal from '../components/layout/ScrollReveal';
import SubNavbar from '../components/layout/SubNavbar';

// Feature: Product
import SystemCarousel from '../features/product/SystemCarousel';
import InteractiveArchitecture from '../features/product/InteractiveArchitecture';
import PlatformEcosystem from '../features/product/PlatformEcosystem';
import TechnicalResearch from '../features/product/TechnicalResearch';

export default function Product() {
  return (
    <div className="relative min-h-screen bg-white">
      <Helmet>
        <title>System Overview | Swiftbox Smart Logistics</title>
      </Helmet>

      {/* Intro Carousel */}
      <div id="hero" className="scroll-mt-32">
        <SystemCarousel />
      </div>

      <SubNavbar />

      {/* 🛠️ ARCHITECTURE SECTION: Interactive Simulation */}
      <div id="architecture" className="scroll-mt-32">
        <InteractiveArchitecture />
      </div>

      {/* 🔬 RESEARCH SECTION */}
      <div id="research" className="scroll-mt-32">
        <TechnicalResearch />
      </div>

      {/* 🌐 ECOSYSTEM SECTION: Bento Grid */}
      <div id="ecosystem" className="scroll-mt-32">
        <PlatformEcosystem />
      </div>
    </div>
  );
}