import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import ScrollReveal from '../layout/ScrollReveal';

export default function Accordion({ items, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isActive = openItems.includes(index);

        return (
          <ScrollReveal key={index} noScale delay={index * 0.05}>
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              onClick={() => toggleItem(index)}
              className={`group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ease-in-out ${
                isActive
                  ? 'border-ink bg-ink shadow-lg scale-[1.01]'
                  : 'border-ink/5 bg-white hover:border-ink/20 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-4 p-6 md:p-8 text-left">
                <h3 className={`text-base md:text-lg font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-ink'}`}>
                  {item.q || item.title || item.question}
                </h3>
                <div className={`shrink-0 transition-all duration-500 ${isActive ? 'rotate-180 text-white' : 'text-ink'}`}>
                  {isActive ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8 text-left">
                      <div className="mb-6 h-[1px] w-full bg-white/20" />
                      <p className="text-sm md:text-base font-medium leading-relaxed text-white/80">
                        {item.a || item.content || item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
