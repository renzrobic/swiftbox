import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../../assets/logo.png";

import { ArrowUpRight } from 'lucide-react';

const proponents = ["Bernal", "Villar", "Ramos", "Carpio", "Padayhag"];

const systemLinks = [
  { name: 'Product Showcase', path: '/product' },
  { name: 'Kinetic Hardware', path: '/product/kinetic' },
  { name: 'Embedded Logic', path: '/product/iot' },
  { name: 'Security Protocol', path: '/product/security' },
  { name: 'Platform Overview', path: '/platform' }
];

const supportLinks = [
  { name: 'System Tracker', path: '/track' },
  { name: 'Documentation', path: '/documentation' },
  { name: 'System Status', path: '/status' },
  { name: 'Help Center', path: '/help' },
  { name: 'Latest News', path: '/news' },
  { name: 'Privacy Policy', path: '/privacy' }
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
    <footer className="bg-white border-t border-ink/5 section-spacing">
      <div className="section-container">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-16 items-start">
          
          {/* BRAND BLOCK */}
          <div className="md:col-span-2 flex flex-col items-start gap-8">
            <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="flex-shrink-0">
              <img 
                src={logo} 
                alt="SwiftBox Logo" 
                className="h-7 w-auto object-contain opacity-90 transition-opacity hover:opacity-100" 
              />
            </Link>
            <p className="max-w-md text-sm font-medium leading-relaxed text-ink/70">
              Engineering the future of last-mile logistics through secure IoT protocols 
              and asynchronous delivery infrastructure.
            </p>
          </div>

          {/* NAVIGATION COLUMNS */}
          <div>
            <h4 className="mb-8 text-[10px] font-semibold tracking-wider text-ink/80">System</h4>
            <ul className="flex flex-col gap-4">
              {systemLinks.map(item => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="group flex items-center gap-1 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                  >
                    {item.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-8 text-[10px] font-semibold tracking-wider text-ink/80">Support</h4>
            <ul className="flex flex-col gap-4">
              {supportLinks.map(item => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="group flex items-center gap-1 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                  >
                    {item.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>



        <div className="mt-24 border-t border-ink/5 pt-10 text-center">
          <p className="text-[10px] font-semibold tracking-wider text-ink/30">
            © {new Date().getFullYear()} Swiftbox Technologies • {proponents.join(' • ')}
          </p>
        </div>
      </div>
    </footer>
  );
}