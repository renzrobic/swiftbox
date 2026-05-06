import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/logo.png";

const proponents = ["Bernal", "Villar", "Ramos", "Carpio", "Padayhag"];

const resources = [
  { name: 'Latest News', path: '/news' },
  { name: 'Documentation', path: '#' },
  { name: 'IoT Schematic', path: '#' },
  { name: 'Firebase Console', path: '#' }
];

export default function Footer() {
  const location = useLocation();

  const handleLinkClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white px-6 md:px-10 pb-12 md:pb-16 isolate">
      <div className="mx-auto mt-16 md:mt-32 max-w-7xl border-t border-ink/20 pt-12 md:pt-16">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-16">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="inline-flex items-center">
              <img 
                src={logo} 
                alt="SwiftBox Logo" 
                loading="lazy" /* 🚀 OPTIMIZATION: Lazy load footer assets */
                className="h-6 md:h-7 w-auto object-contain" 
              />
            </Link>
            <p className="mt-6 md:mt-8 max-w-md text-sm md:text-base font-medium leading-relaxed text-ink/70">
              Revolutionizing last-mile delivery in Pagadian City through innovative 
              IoT engineering and secure asynchronous protocols.
            </p>
          </div>

          <div className="md:justify-self-center">
            <h4 className="mb-4 md:mb-8 text-[11px] md:text-sm font-bold uppercase tracking-widest text-ink">
              Contact
            </h4>
            <ul className="flex flex-col gap-1 text-sm md:text-base font-medium text-ink/70">
              <li>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex min-h-[40px] items-center transition-colors hover:text-ink"
                >
                  Pagadian Capitol College
                </a>
              </li>
              <li>
                <a 
                  href="mailto:renzrobiclucillabernal@gmail.com" 
                  className="flex min-h-[40px] items-center break-all transition-colors hover:text-ink"
                >
                  renzrobiclucillabernal@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* RESOURCES COLUMN */}
          <div className="md:justify-self-end">
            <h4 className="mb-4 md:mb-8 text-[11px] md:text-sm font-bold uppercase tracking-widest text-ink">
              Resources
            </h4>
            <ul className="flex flex-col gap-1 text-sm md:text-base font-medium text-ink/70">
              {resources.map((item) => (
                <li key={item.name} className="relative">
                  {item.path.startsWith('/') ? (
                    <Link 
                      to={item.path} 
                      onClick={(e) => handleLinkClick(e, item.path)}
                      /* Changed py-1 to flex + min-h for perfect mobile alignment */
                      className="flex min-h-[44px] w-full items-center transition-colors hover:text-ink"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a 
                      href={item.path} 
                      className="flex min-h-[44px] w-full items-center transition-colors hover:text-ink"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="relative mt-16 flex flex-col items-start justify-between gap-8 border-t border-ink/10 pt-8 md:mt-32 md:flex-row md:items-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-ink/40 md:text-xs">
            {/* 🚀 OPTIMIZATION: Dynamic year calculation */}
            © {new Date().getFullYear()} Swiftbox Technologies
          </div>
          
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/20">
              Dev Team:
            </span>
            <p className="text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] leading-relaxed text-ink/40">
              {proponents.join(' • ')}
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}