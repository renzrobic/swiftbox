import React from 'react';
import { motion } from 'framer-motion';

export default function Mission() {
  return (
    <section className="mt-20 overflow-hidden px-8 py-24 md:mt-32 md:px-10 md:py-32">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl font-semibold tracking-tight text-royal-blue leading-tight sm:text-4xl md:text-5xl md:leading-[1.2]"
        >
          Our Mission is to offer secure, automated locker systems that streamline parcel delivery and solve last-mile logistics.
        </motion.h2>
      </div>
    </section>
  );
}