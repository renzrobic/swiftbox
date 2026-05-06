import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'Introduction' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'research', label: 'Research' },
];

export default function SubNavbar() {
  const [activeId, setActiveId] = useState('hero');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 768 ? 100 : 130; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        rootMargin: "-130px 0px -80% 0px",
        threshold: 0 
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    /* 🛠️ RESPONSIVE STICKY TOP: Handles 50px mobile / 60px desktop */
    <div className="sticky top-[80px] md:top-[60px] z-[100] w-full bg-white border-b border-ink/10">
      <div className="no-scrollbar w-full overflow-x-auto">
        <div className="flex min-w-max items-center px-6 py-3 md:justify-center md:px-10">
          <nav className="flex items-center gap-1 rounded-full bg-ink/5 p-1" aria-label="Page Sections">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={activeId === item.id ? 'true' : 'false'}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-5 py-2 text-xs md:text-sm font-medium tracking-tight transition-colors duration-300 whitespace-nowrap ${
                  activeId === item.id ? 'text-white' : 'text-ink/60 hover:text-ink'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeId === item.id && (
                  <motion.div
                    layoutId="subActivePill"
                    className="absolute inset-0 z-0 rounded-full bg-ink active-glow"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}