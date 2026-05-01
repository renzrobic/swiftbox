import React from 'react';
import { motion } from 'framer-motion';

import Hero from '../components/Hero';
import Mission from '../components/Mission';
import Services from '../components/Services';
import ProductAndPlatform from '../components/ProductAndPlatform';
import ProductShowcase from '../components/ProductShowcase';
import StoryCanvas from '../components/StoryCanvas';
import SuccessStories from '../components/SuccessStories';
import TeamAccordion from '../components/TeamAccordion';
import FAQ from '../components/FAQ';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="bg-transparent w-full overflow-x-hidden"
    >
      <Hero />

      <ScrollReveal>
        <Mission />
      </ScrollReveal>

      <ScrollReveal>
        <Services />
      </ScrollReveal>

      <ScrollReveal>
        <ProductAndPlatform />
      </ScrollReveal>

      {/* 🟢 Removed ScrollReveal from here because it's now inside the component to prevent background glitching */}
      <ProductShowcase />

      <ScrollReveal>
        <StoryCanvas />
      </ScrollReveal>

      <ScrollReveal noScale={true}>
        <SuccessStories />
      </ScrollReveal>

      {/* 🟢 TeamAccordion and FAQ use noScale={true} to stop the side-to-side jitter */}
      <ScrollReveal noScale={true}>
        <TeamAccordion />
      </ScrollReveal>

      <ScrollReveal noScale={true}>
        <FAQ />
      </ScrollReveal>
    </motion.div>
  );
}