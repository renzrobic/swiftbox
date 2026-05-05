import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export default function Error({ 
  code = "404", 
  title = "Lost in Transit?", 
  message = "We can't seem to find the page you're looking for. It might have been moved or deleted." 
}) {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center"
    >
      {/* Visual Error Display */}
      <div className="relative mb-4 md:mb-6">
        {/* Large Header: font-semibold & royal-blue/5 */}
        <h1 className="text-[6rem] sm:text-[10rem] md:text-[15rem] font-semibold leading-none text-royal-blue/5 select-none">
          {code}
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <AlertTriangle className="text-royal-blue w-10 h-10 md:w-16 md:h-16" />
        </div>
      </div>

      {/* Content */}
      <h2 className="mb-2 text-xl md:text-4xl font-semibold uppercase tracking-tighter text-royal-blue">
        {title}
      </h2>
      <p className="mb-8 md:mb-10 max-w-[280px] sm:max-w-sm text-xs md:text-sm font-bold leading-relaxed text-royal-blue/60">
        {message}
      </p>

      {/* Navigation Options */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 rounded-full border border-royal-blue/20 px-8 py-4 sm:py-3 text-[10px] font-bold uppercase tracking-widest text-royal-blue transition-all hover:bg-royal-blue hover:text-white active:scale-95"
        >
          <ArrowLeft size={14} />
          Go Back
        </button>
        
        <Link
          to="/"
          className="flex items-center justify-center gap-2 rounded-full bg-royal-blue px-8 py-4 sm:py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 shadow-xl shadow-royal-blue/20 active:scale-95"
        >
          <Home size={14} />
          Home Base
        </Link>
      </div>
    </motion.div>
  );
}