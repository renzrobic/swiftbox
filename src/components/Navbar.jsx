import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleScroll = useCallback(() => {
    if (!isHomePage) return;
    const threshold = window.innerHeight * 0.8;
    setIsTransparent(window.scrollY <= threshold);
  }, [isHomePage]);

  useEffect(() => {
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    } else {
      setIsTransparent(false);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, handleScroll]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const activeTransparent = isHomePage && isTransparent && !isMenuOpen;

  return (
    <nav className={`
      fixed top-0 left-0 z-[100] w-full transition-all duration-300 ease-out
      ${activeTransparent 
        ? 'bg-transparent border-transparent' 
        : 'bg-cool-white border-b border-black/5 shadow-sm'}
    `}>
      <div className="mx-auto flex w-full items-center justify-between px-8 py-3 md:px-10">
        
        {/* LOGO */}
        <Link to="/" className="z-[110] flex items-center gap-3">
          <img 
            src={logo} 
            alt="SwiftBox Logo" 
            className={`h-4 w-auto object-contain transition-all duration-300
              ${activeTransparent ? 'brightness-0 invert' : 'brightness-100'}`} 
          />
        </Link>
        
        {/* DESKTOP MENU - Admin Link Removed */}
        <div className={`
          hidden items-center gap-6 text-[13px] font-semibold tracking-wide transition-colors md:flex
          ${activeTransparent ? 'text-cool-white' : 'text-royal-blue'}
        `}>
          <Link to="/" className="uppercase transition-opacity hover:opacity-50">Home</Link>
          <Link to="/track" className="uppercase transition-opacity hover:opacity-50">Tracker</Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`z-[110] transition-colors md:hidden
            ${activeTransparent || isMenuOpen ? 'text-white' : 'text-royal-blue'}`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* MOBILE OVERLAY MENU - Admin Link Removed */}
        <div className={`
          fixed inset-0 z-[105] flex flex-col items-center justify-center gap-8 bg-royal-blue transition-transform duration-500 md:hidden
          ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}>
          <Link to="/" className="text-3xl font-bold uppercase tracking-tighter text-white">Home</Link>
          <Link to="/track" className="text-3xl font-bold uppercase tracking-tighter text-white">Tracker</Link>
        </div>

      </div>
    </nav>
  );
}