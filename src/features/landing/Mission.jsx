import React from 'react';
import { motion } from 'framer-motion';

export default function Mission() {
  return (
    <section id="mission" className="mission-aurora mt-12 px-6 py-20 md:mt-32 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }} 
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl font-semibold leading-[1.3] tracking-tight text-ink sm:text-3xl md:text-5xl md:leading-[1.2]"
        >
          Our Mission is to offer secure, automated locker systems that streamline parcel delivery and solve last-mile logistics.
        </motion.h2>
      </div>
    </section>
  );
}