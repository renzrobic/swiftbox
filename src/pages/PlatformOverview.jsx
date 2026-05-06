import React from 'react';
import { Helmet } from 'react-helmet-async';

// Modular Feature Components
import PlatformHero from '../features/product/platform/PlatformHero';
import ArchitectureGrid from '../features/product/platform/ArchitectureGrid';
import SystemBenchmarks from '../features/product/platform/SystemBenchmarks';
import TechnicalManifest from '../features/product/platform/TechnicalManifest';
import DeploymentPortal from '../features/product/platform/DeploymentPortal';
import PlatformFAQ from '../features/product/platform/PlatformFAQ';

/**
 * PlatformOverview Page
 * Modularized architecture following the project's minimalist and high-fidelity standards.
 */
export default function PlatformOverview() {
  return (
    <div className="min-h-screen bg-white selection:bg-ink/10 overflow-hidden">
      <Helmet>
        <title>Platform Architecture | Swiftbox Smart Logistics</title>
        <meta name="description" content="In-depth technical blueprint of the SwiftBox hardware and cloud ecosystem." />
      </Helmet>
      
      {/* ── HERO SECTION: Technical Blueprint ── */}
      <PlatformHero />

      {/* ── ARCHITECTURAL GRID: 3-Column Component Layout ── */}
      <ArchitectureGrid />

      {/* ── BENCHMARKING: Performance Analytics ── */}
      <SystemBenchmarks />

      {/* ── TECHNICAL MANIFEST: Certified Hardware Specs ── */}
      <TechnicalManifest />

      {/* ── DEPLOYMENT PORTAL: Institutional Access Form ── */}
      <DeploymentPortal />

      {/* ── SYSTEM FAQ: Administrator Insights ── */}
      <PlatformFAQ />

    </div>
  );
}
