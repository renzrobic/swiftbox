import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function LoginGateway({ passInput, setPassInput, onAuthorize }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white p-8 md:p-12 shadow-2xl shadow-royal-blue/5 border border-royal-blue/5"
      >
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-royal-blue tracking-tighter leading-none">
            Security Gateway
          </h2>
          <p className="mt-4 text-[10px] md:text-base text-royal-blue/70 font-semibold uppercase tracking-wide">
            Swiftbox encrypted terminal access
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 border-b-2 border-royal-blue/30 focus-within:border-royal-blue transition-colors pb-4">
          <input 
            type="password" 
            placeholder="ACCESS KEY"
            className="w-full sm:flex-1 bg-transparent outline-none text-xl md:text-2xl font-bold text-royal-blue placeholder:text-royal-blue/70 tracking-widest"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onAuthorize()}
          />
          <button 
            onClick={onAuthorize}
            className="w-full sm:w-auto py-4 px-10 bg-royal-blue text-white font-semibold text-base rounded-full hover:bg-black transition-all flex items-center justify-center gap-3 whitespace-nowrap shrink-0"
          >
            Authorize <ArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}