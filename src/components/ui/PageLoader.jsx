import React from 'react';

export default function PageLoader() {
  return (
    <div 
      role="status" 
      aria-label="Loading page content"
      className="flex h-screen w-full items-center justify-center bg-white"
    >
      <div className="h-2 w-24 overflow-hidden rounded-full bg-royal-blue/10">
        <div className="h-full w-1/2 animate-[loading_1.5s_infinite_ease-in-out] bg-royal-blue" />
      </div>
      
      {/* 
        Pro-Tip: In a fully optimized Tailwind setup, you would move this 
        @keyframes definition into your index.css or tailwind.config.js. 
        Leaving it here is fine for now to keep the component self-contained! 
      */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}