import React from 'react';
import { motion /*, useReducedMotion */ } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, noScale = false, className = "w-full", style }) {
  // const shouldReduceMotion = useReducedMotion(); 
  // TIP: If you want to go the extra mile for a11y, 
  // you can use this hook to disable animations for users with motion sensitivity.

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 60, 
        scale: noScale ? 1 : 0.98 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        scale: 1 
      }}
      viewport={{ 
        once: true, 
        margin: "-150px 0px -50px 0px", // Trigger slightly before the element enters the frame
        amount: 0.15 
      }}
      transition={{ 
        duration: 1.1, 
        delay: delay,
        ease: [0.16, 1, 0.3, 1] 
      }}
      /* 
         🚀 DEVELOPER NOTE: 'w-full' ensures the wrapper doesn't shrink, 
         but if this breaks your layout, override className or use 'display: contents' in the style prop.
      */
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}