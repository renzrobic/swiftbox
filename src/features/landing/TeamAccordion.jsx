import React, { useState, useCallback, memo } from 'react';
import ScrollReveal from '../../components/layout/ScrollReveal';

const TEAM = [
  {
    id: 1, name: "BERNAL", role: "Project Lead & Lead Developer", png: "Bernal.png",
    idDisplay: "01", courseId: "BSIT",
    description: "Architected the entire system logic, designed the UI/UX interface, and engineered the core software functionality of the Swiftbox. Responsible for full-stack integration and ensuring hardware-software synchronization across all modules.",
    tags: ["System Architecture", "UI/UX Design", "Full-Stack"]
  },
  {
    id: 2, name: "VILLAR", role: "Hardware & Research Support", png: "Villar.png",
    idDisplay: "02", courseId: "BSIT",
    description: "Assisted in building the physical structure of the box and conducted extensive technical research to support system integration.",
    tags: ["Hardware Build", "Technical Research", "Structural"]
  },
  {
    id: 3, name: "RAMOS", role: "Research & Survey Lead", png: "Ramos.png",
    idDisplay: "03", courseId: "BSIT",
    description: "Spearheaded the user survey phase and analyzed market data to define the project's target requirements.",
    tags: ["Market Research", "Data Analysis", "Surveys"]
  },
  {
    id: 4, name: "CARPIO", role: "Hardware & Research Support", png: "Carpio.png",
    idDisplay: "04", courseId: "BSIT",
    description: "Contributed to the assembly of the box's physical frame and gathered data through community surveys.",
    tags: ["Hardware Build", "Field Survey", "Assembly"]
  },
  {
    id: 5, name: "PADAYHAG", role: "Hardware & Research Support", png: "Padayhag.png",
    idDisplay: "05", courseId: "BSIT",
    description: "Aided in the structural construction of the project and assisted in the preliminary research documentation.",
    tags: ["Structural", "Documentation", "Hardware"]
  }
];

const GridPattern = memo(({ id }) => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <pattern id={id} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0L0 0 0 40" fill="none" stroke="#0D0D0D" strokeWidth="0.4" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
));

const Card = memo(({ member, isActive, isCollapsed, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      className={`relative flex flex-col md:flex-row overflow-hidden border-2 cursor-pointer transition-[flex,border-color,box-shadow,background-color] duration-[650ms] ease-[cubic-bezier(0.34,1.26,0.64,1)] rounded-xl lg:rounded-2xl ${
        isActive
          ? 'flex-[12] border-transparent bg-white shadow-[0_0_30px_rgba(99,102,241,0.3)] active-glow'
          : 'flex-1 border-gray-100 bg-white hover:border-ink/30 hover:shadow-md'
      }`}
    >
      {/* ── Photo Pane ── */}
      <div
        className={`relative shrink-0 overflow-hidden transition-all duration-[650ms] ease-[cubic-bezier(0.34,1.26,0.64,1)] md:h-full ${
          isActive ? 'h-[320px] w-full md:w-[35%] bg-white' : 'h-0 w-full md:w-full md:h-full bg-white'
        }`}
      >
        <div
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{ opacity: isCollapsed ? 0.05 : 0.15 }}
        >
          <GridPattern id={`grid-${member.id}`} />
        </div>

        <img
          src={member.png}
          alt={member.name}
          draggable={false}
          loading="lazy"
          className="absolute transition-[filter,opacity] duration-500 inset-0 h-full w-full object-cover object-top md:object-contain md:h-[75%] md:w-auto md:max-w-none md:inset-auto md:bottom-0 md:left-1/2 md:-translate-x-1/2"
          style={{
            filter: isCollapsed ? 'grayscale(60%)' : 'grayscale(0%)',
            opacity: isCollapsed ? 0.38 : 1,
          }}
        />

        {/* Name label on collapsed card (desktop) */}
        <div
          className={`absolute bottom-4 left-0 z-20 hidden w-full text-center font-bold uppercase tracking-[0.22em] text-white transition-opacity duration-350 md:block ${
            isActive ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {member.name}
        </div>
      </div>

      {/* ── Details Pane ── */}
      <div
        className={`shrink-0 overflow-hidden bg-white transition-all duration-[650ms] ease-[cubic-bezier(0.34,1.26,0.64,1)] md:h-full ${
          isActive ? 'flex-1 h-auto md:w-[65%]' : 'h-full md:w-0'
        }`}
      >
        {!isActive && (
          <div className="flex h-full min-h-[64px] items-center justify-center md:hidden">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-ink">
              {member.name}
            </span>
          </div>
        )}

        <div
          className={`h-full w-full flex-col px-8 py-8 transition-[opacity,transform] duration-[400ms] md:px-14 md:py-12 ${
            isActive ? 'flex translate-y-0 opacity-100 delay-200' : 'hidden translate-y-[15px] opacity-0 md:flex'
          }`}
        >
          <div className="mb-4 flex items-start justify-between">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-ink/20">
              {member.idDisplay}
            </span>
            <div className="text-right">
              <h3 className="text-xl font-semibold leading-none tracking-tighter uppercase text-ink md:text-4xl">
                {member.name}
              </h3>
              <p className="mt-1.5 text-[8px] font-bold uppercase tracking-[0.18em] text-ink/80 md:text-[11px]">
                {member.role}
              </p>
            </div>
          </div>

          <div className="mb-6 h-px w-full bg-ink/10" />

          <div className="mb-6 shrink-0">
            <p className="text-[9px] font-bold uppercase tracking-widest text-ink/40 md:text-[10px]">
              Academic Profile
            </p>
            <p className="text-xs font-bold uppercase tracking-tight text-ink/90 md:text-lg">
              {member.courseId}
            </p>
          </div>

          <div className="custom-scrollbar mb-6 flex-1 overflow-y-auto pr-4">
            <p className="border-l-4 border-ink/15 pl-5 text-[11px] font-medium leading-relaxed text-ink/70 md:text-sm">
              {member.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2 border-t border-ink/5 pt-5">
            {member.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-ink/10 bg-ink/[0.05] px-3 py-1.5 text-[8px] font-bold uppercase tracking-tighter text-ink/80 md:text-[10px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default function TeamAccordion() {
  const [activeId, setActiveId] = useState(null);

  const handleToggle = useCallback((id) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section id="team" className="mx-auto w-full max-w-7xl select-none px-4 py-12 font-sans md:px-10 md:py-24">
      <ScrollReveal noScale>
        <div className="mb-10 text-center md:mb-16">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Development Team
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal noScale delay={0.1}>
        <div className="flex min-h-[500px] w-full flex-col gap-3 md:h-[480px] md:flex-row md:gap-4">
          {TEAM.map((member) => (
            <Card
              key={member.id}
              member={member}
              isActive={activeId === member.id}
              isCollapsed={activeId !== null && activeId !== member.id}
              onToggle={() => handleToggle(member.id)}
            />
          ))}
        </div>
      </ScrollReveal>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(13, 13, 13, 0.15);
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}