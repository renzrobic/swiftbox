import React from 'react';

export default function TrackerHeader() {
  return (
    <header className="mb-12 flex flex-col items-center text-center md:mb-16">
      {/* Biggest Header: font-semibold */}
      <h2 className="text-4xl font-semibold tracking-tight text-royal-blue leading-tight md:text-5xl">
        Track Intelligence.
      </h2>
      
      {/* Subtext: font-medium for clarity */}
      <p className="mt-4 max-w-2xl text-lg font-medium leading-tight text-royal-blue/70 md:text-xl">
        Real-time node verification and parcel synchronization across our 
        autonomous logistics network.
      </p>
    </header>
  );
}