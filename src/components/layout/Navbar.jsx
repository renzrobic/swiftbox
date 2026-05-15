import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHeroPage = location.pathname === "/" || location.pathname === "/product";

  const handleScroll = useCallback(() => {
    if (!isHeroPage) return;

    // 🎯 ADJUSTED LOGIC: Product page is 100vh, so we use a higher factor (0.92) 
    // Home is shorter, so we stay with 0.8
    const factor = location.pathname === "/product" ? 0.92 : 0.8;
    const threshold = window.innerHeight * factor;

    setIsTransparent(window.scrollY <= threshold);
  }, [isHeroPage, location.pathname]);

  useEffect(() => {
    if (isHeroPage) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    } else {
      setIsTransparent(false);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeroPage, handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const isSolid = !isHeroPage || !isTransparent || isMenuOpen;

  const topVariants = { closed: { rotate: 0, y: -4 }, open: { rotate: 45, y: 0 } };
  const bottomVariants = { closed: { rotate: 0, y: 4 }, open: { rotate: -45, y: 0 } };

  return (
    <nav className={`
      fixed top-0 left-0 w-full z-[120]
      ${isSolid ? 'bg-white border-b border-black/5 shadow-sm' : 'bg-transparent border-transparent'}
    `}>
      <div className="relative z-[130] mx-auto flex w-full items-center justify-between px-6 py-5 md:px-10">

        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="SwiftBox Logo"
            className={`h-4.5 w-auto object-contain ${!isSolid ? 'brightness-0 invert' : 'brightness-100'}`}
          />
        </Link>

        <div className={`
          hidden items-center gap-10 text-sm font-semibold tracking-tight md:flex transition-colors duration-500
          ${!isSolid ? 'text-white' : 'text-ink'}
        `}>
          <Link to="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <Link to="/product" className="hover:opacity-60 transition-opacity">Product</Link>
          <Link to="/news" className="hover:opacity-60 transition-opacity">News</Link>
          <Link to="/track" className="hover:opacity-60 transition-opacity">Tracker</Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative h-10 w-10 md:hidden flex items-center justify-center group outline-none"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative h-5 w-[22px] flex flex-col items-center justify-center"
          >
            <motion.span
              variants={topVariants}
              animate={isMenuOpen ? "open" : "closed"}
              className={`absolute h-[2px] w-[22px] rounded-full transition-colors duration-500 ${!isSolid ? 'bg-white' : 'bg-ink'}`}
            />
            <motion.span
              variants={bottomVariants}
              animate={isMenuOpen ? "open" : "closed"}
              className={`absolute h-[2px] w-[22px] rounded-full transition-colors duration-500 ${!isSolid ? 'bg-white' : 'bg-ink'}`}
            />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 top-0 z-[110] bg-white h-screen flex flex-col items-start justify-start px-10 pt-32 gap-8"
          >
            <nav className="flex flex-col gap-8 w-full">
              <button onClick={() => handleNavClick('/')} className="text-3xl font-semibold tracking-tight text-ink w-full text-left">Home</button>
              <button onClick={() => handleNavClick('/product')} className="text-3xl font-semibold tracking-tight text-ink w-full text-left">Product</button>
              <button onClick={() => handleNavClick('/news')} className="text-3xl font-semibold tracking-tight text-ink w-full text-left">News</button>
              <button onClick={() => handleNavClick('/track')} className="text-3xl font-semibold tracking-tight text-ink w-full text-left">Tracker</button>
            </nav>
            <p className="absolute bottom-32 text-[10px] font-semibold tracking-widest text-ink/20">
              SwiftBox Terminal v1.02
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}