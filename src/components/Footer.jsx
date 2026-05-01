import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

export default function Footer() {
  const proponents = ["Bernal", "Villar", "Ramos", "Carpio", "Padayhag"];
  const resources = [
    { name: 'Documentation', path: '#' },
    { name: 'IoT Schematic', path: '#' },
    { name: 'Firebase Console', path: '#' },
    { name: 'Admin Hub', path: '/admin' } // Added Admin Link here
  ];

  return (
    <footer className="px-8 pb-16 md:px-10">
      <div className="mx-auto mt-20 max-w-7xl border-t border-royal-blue/20 pt-16 md:mt-32">
        
        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-16">
          
          {/* Brand Identity */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/">
              <img 
                src={logo} 
                alt="SwiftBox Logo" 
                className="h-7 w-auto object-contain" 
              />
            </Link>
            <p className="mt-8 max-w-md text-base font-medium leading-relaxed text-royal-blue/70">
              Revolutionizing last-mile delivery in Pagadian City through innovative 
              IoT engineering and secure asynchronous protocols. Developed and engineered 
              at Pagadian Capitol College.
            </p>
          </div>

          {/* Contact Information */}
          <div className="md:justify-self-center">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-royal-blue md:mb-8">
              Contact
            </h4>
            <ul className="space-y-4 text-base font-medium text-royal-blue/70">
              <li>
                <a 
                  href="https://www.facebook.com/Pagadian-Capitol-College-Inc-100063921040273/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-royal-blue"
                >
                  Pagadian Capitol College
                </a>
              </li>
              <li>
                <a 
                  href="mailto:renzrobiclucillabernal@gmail.com" 
                  className="break-all lowercase transition-colors hover:text-royal-blue"
                >
                  renzrobiclucillabernal@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+639613967670" className="transition-colors hover:text-royal-blue">
                  +63 961 396 7670
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Resources */}
          <div className="md:justify-self-end">
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-royal-blue md:mb-8">
              Resources
            </h4>
            <ul className="space-y-4 text-base font-medium text-royal-blue/70">
              {resources.map((item) => (
                <li key={item.name}>
                  {item.path.startsWith('/') ? (
                    <Link to={item.path} className="transition-colors hover:text-royal-blue">
                      {item.name}
                    </Link>
                  ) : (
                    <a href={item.path} className="transition-colors hover:text-royal-blue">
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-royal-blue/10 pt-8 md:mt-32 md:flex-row md:items-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-royal-blue/40 md:text-xs">
            © 2026 Swiftbox Technologies
          </div>
          
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-royal-blue/20">
              Dev Team:
            </span>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed text-royal-blue/40 md:text-xs">
              {proponents.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}