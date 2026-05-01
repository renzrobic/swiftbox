import React, { useState } from 'react';

const team = [
  { 
    id: 1, name: "BERNAL", role: "Project Lead & Lead Developer", png: "Bernal.png",
    idDisplay: "01", courseId: "BSIT",
    description: "Architected the entire system logic, designed the UI/UX interface, and engineered the core software functionality of the Swiftbox. Responsible for full-stack integration and ensuring hardware-software synchronization across all modules. He spearheaded the development of the real-time tracking algorithm and optimized the administrative dashboard for low-latency data visualization.",
    tags: ["System Architecture", "UI/UX Design", "Full-Stack"]
  },
  { 
    id: 2, name: "VILLAR", role: "Hardware & Research Support", png: "Villar.png",
    idDisplay: "02", courseId: "BSIT",
    description: "Assisted in building the physical structure of the box and conducted extensive technical research to support system integration. Worked on material durability testing and structural integrity protocols to ensure the hardware can withstand diverse environmental conditions. He contributed to the electrical layout design, focusing on power efficiency and sensor placement accuracy.",
    tags: ["Hardware Build", "Technical Research", "Structural"]
  },
  { 
    id: 3, name: "RAMOS", role: "Research & Survey Lead", png: "Ramos.png",
    idDisplay: "03", courseId: "BSIT",
    description: "Spearheaded the user survey phase and analyzed market data to define the project's target requirements. Conducted deep-dive analysis of user pain points and translated them into actionable design specifications. He managed the data validation process, ensuring all quantitative research was statistically significant.",
    tags: ["Market Research", "Data Analysis", "Surveys"]
  },
  { 
    id: 4, name: "CARPIO", role: "Hardware & Research Support", png: "Carpio.png",
    idDisplay: "04", courseId: "BSIT",
    description: "Contributed to the assembly of the box's physical frame and gathered data through community surveys. Actively participated in iterative hardware design revisions based on real-world field feedback and prototype testing. He specialized in the mechanical integration of the automated locking mechanisms.",
    tags: ["Hardware Build", "Field Survey", "Assembly"]
  },
  { 
    id: 5, name: "PADAYHAG", role: "Hardware & Research Support", png: "Padayhag.png",
    idDisplay: "05", courseId: "BSIT",
    description: "Aided in the structural construction of the project and assisted in the preliminary research documentation. Drafted comprehensive technical reports and handled the meticulous archiving of hardware schematics and electrical circuit diagrams. He provided critical technical support during the prototyping phase.",
    tags: ["Structural", "Documentation", "Hardware"]
  }
];

export default function TeamAccordion() {
  const [activeId, setActiveId] = useState(null);
  const isAnyActive = activeId !== null;

  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden px-4 py-12 font-sans select-none md:px-10 md:py-24">
      <div className="mb-10 text-center md:mb-16">
        <h2 className="text-3xl font-semibold tracking-tighter text-royal-blue leading-tight md:text-5xl">
          Development Team
        </h2>
      </div>
      
      <div className="flex h-[750px] w-full flex-col gap-3 transition-all duration-500 md:h-[420px] md:flex-row md:gap-4">
        {team.map((member) => {
          const isActive = activeId === member.id;
          const isCollapsed = isAnyActive && !isActive;

          return (
            <div
              key={member.id}
              onClick={() => setActiveId(isActive ? null : member.id)}
              className={`
                relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] md:flex-row
                ${isActive 
                  ? 'flex-[15] border-royal-blue bg-white shadow-2xl md:flex-[10]' 
                  : 'flex-1 border-gray-100 bg-white shadow-sm hover:border-royal-blue/30'} 
              `}
            >
              {/* --- COLUMN 1: PHOTO AREA --- */}
              <div className={`
                relative shrink-0 overflow-hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isActive ? 'h-[40%] w-full md:h-full md:w-[40%]' : 'h-full w-full'}
              `}>
                
                {/* Dynamic Royal Blue Grid */}
                <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700
                  ${isActive || !isAnyActive ? 'opacity-[0.7]' : 'opacity-[0.1]'}
                `}>
                  <svg width="100%" height="100%">
                    <pattern id={`grid-${member.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4169E1" strokeWidth="0.8"/>
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#grid-${member.id})`} />
                  </svg>
                </div>

                {/* Portrait - Scaled to 80% */}
                <img 
                  src={member.png} 
                  alt={member.name}
                  className={`
                    absolute bottom-0 left-1/2 z-10 h-[80%] w-auto max-w-none -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isActive || !isAnyActive ? 'grayscale-0 opacity-100' : 'grayscale-[60%] opacity-40'}
                    ${isCollapsed ? 'hidden md:block' : 'block'}
                  `}
                />

                {/* Subtle White Bottom Gradient */}
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                
                {/* 🚀 NAME POSITION & STYLE: 
                    - Moved from bottom-4/12 to bottom-2/6 (Lower on the card)
                    - Color: text-blue-50 (Cool White)
                    - Size: Increased to text-xs/text-base (~1 level/5% up)
                */}
                <div className={`
                  absolute left-0 z-30 w-full px-1 text-center transition-all duration-500
                  ${isActive ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}
                  ${isCollapsed 
                    ? 'bottom-2 md:bottom-6' 
                    : 'bottom-2 md:bottom-6'}
                `}>
                  <p className="font-bold uppercase tracking-[0.2em] text-blue-50 md:text-base text-xs drop-shadow-md">
                    {member.name}
                  </p>
                </div>
              </div>

              {/* --- COLUMN 2: DETAILS --- */}
              <div className={`
                shrink-0 overflow-hidden bg-white transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${isActive ? 'h-[60%] w-full opacity-100 md:h-full md:w-[60%]' : 'h-0 w-0 opacity-0'}
              `}>
                <div className={`
                  flex h-full flex-col px-6 py-8 transition-opacity duration-500 whitespace-normal md:px-12 md:py-10
                  ${isActive ? 'delay-300 opacity-100' : 'opacity-0'}
                `}>
                  
                  <div className="shrink-0">
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      <span className="font-mono text-[10px] font-semibold tracking-[0.3em] text-royal-blue/20 md:text-xs">
                        {member.idDisplay}
                      </span>
                      <div className="text-right">
                        <h3 className="text-xl font-semibold uppercase tracking-tighter text-royal-blue leading-none md:text-3xl">
                          {member.name}
                        </h3>
                        <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-royal-blue/80 md:text-[11px] md:tracking-[0.2em]">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-royal-blue/10 mb-4 md:mb-6" />
                  </div>

                  <div className="mb-4 shrink-0 md:mb-6">
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-royal-blue/40 md:text-[10px]">Academic Profile</p>
                    <p className="text-xs font-semibold uppercase tracking-tight text-royal-blue/90 md:text-base">{member.courseId}</p>
                  </div>

                  <div className="custom-scrollbar mb-4 flex-1 overflow-y-auto pr-2 md:mb-6 md:pr-4">
                    <p className="border-l-4 border-royal-blue/15 pl-4 text-[11px] font-medium italic leading-relaxed text-royal-blue/70 md:pl-6 md:text-sm">
                      {member.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-1.5 border-t border-royal-blue/5 pt-3 md:gap-2 md:pt-4">
                    {member.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-royal-blue/10 bg-royal-blue/[0.05] px-2 py-1 text-[8px] font-semibold uppercase tracking-tighter text-royal-blue/80 md:px-3 md:text-[9px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: rgba(65, 105, 225, 0.15); 
          border-radius: 10px; 
        }
      `}} />
    </section>
  );
}