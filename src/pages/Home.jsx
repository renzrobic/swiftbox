import React from 'react';

// Layout Components
import ScrollReveal from '../components/layout/ScrollReveal';

// Feature: Landing
import Hero from '../features/landing/Hero';
import Mission from '../features/landing/Mission';
import Services from '../features/landing/Services';
import SystemInfrastructure from '../features/landing/SystemInfrastructure'; // Formerly StoryCanvas
import SuccessStories from '../features/landing/SuccessStories';
import TeamAccordion from '../features/landing/TeamAccordion';
import FAQ from '../features/landing/FAQ';

// Feature: Product
import SystemOverview from '../features/product/SystemOverview'; // Formerly ProductAndPlatform
import TechnicalArchitecture from '../features/product/TechnicalArchitecture'; // Formerly ProductShowcase

// Feature: News
import RecentNews from '../features/news/RecentNews';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Hero renders immediately for LCP performance */}
      <Hero />

      <ScrollReveal>
        <Mission />
      </ScrollReveal>

      <ScrollReveal>
        <Services />
      </ScrollReveal>

      <ScrollReveal>
        <SystemOverview />
      </ScrollReveal>
      
      {/* Architecture is typically large; keeping its internal reveal logic */}
      <TechnicalArchitecture />
      
      <ScrollReveal>
        <SystemInfrastructure />
      </ScrollReveal>

      {/* 📰 RECENT NEWS: The bridge to success stories */}
      <ScrollReveal>
        <RecentNews />
      </ScrollReveal>

      {/* Simplified boolean props for cleaner Section wrappers */}
      <ScrollReveal noScale>
        <SuccessStories />
      </ScrollReveal>

      <ScrollReveal noScale>
        <TeamAccordion />
      </ScrollReveal>

      <ScrollReveal noScale>
        <FAQ />
      </ScrollReveal>
    </div>
  );
}