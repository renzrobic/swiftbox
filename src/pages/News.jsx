import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';
import ScrollReveal from '../components/layout/ScrollReveal';
import OptimizedMedia from '../components/ui/OptimizedMedia';
import Skeleton from '../components/ui/Skeleton';


const CATEGORIES = ["All", "Company", "Product", "Engineering", "Operations"];

export default function News() {
  // Use our new custom hook!
  const { articles, loading } = useArticles('Live');
  const [activeCategory, setActiveCategory] = useState("All");

  // Preserved your excellent memoization logic
  const filteredArticles = useMemo(() => {
    return activeCategory === "All" 
      ? articles 
      : articles.filter(a => a.category === activeCategory);
  }, [articles, activeCategory]);

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="relative min-h-screen bg-white section-spacing overflow-hidden"
    >
      {/* Strategic Subtle Glow - Monochromatic */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-ink/5 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 section-container text-left">
        
        {/* Header Section */}
        <ScrollReveal>
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              Newsroom
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-tight tracking-tight text-ink/70">
              Official updates from the Pagadian SwiftBox infrastructure.
            </p>
          </header>
        </ScrollReveal>

        {/* Category Filters */}
        <ScrollReveal delay={0.1}>
          <nav 
            className="mb-16 flex flex-col items-center justify-between gap-8 border-b border-ink/10 pb-12 md:flex-row"
            aria-label="Article Categories"
          >
            <div className="flex flex-wrap justify-center gap-2 rounded-full bg-ink/5 p-1" role="tablist">
              {CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button 
                    key={cat} 
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative rounded-full px-6 py-2 text-sm font-semibold tracking-tight transition-all active:scale-95 ${
                      isActive ? 'text-white' : 'text-ink/50 hover:text-ink'
                    }`}
                  >
                    <span className="relative z-10">{cat}</span>
                    {isActive && (
                      <motion.div
                        layoutId="newsActivePill"
                        className="absolute inset-0 z-0 rounded-full bg-ink active-glow"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </ScrollReveal>

        {/* Article Grid / State Handling */}
        {loading ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-8">
                <Skeleton variant="rectangle" height="240px" className="rounded-[1.5rem]" />
                <div className="space-y-4">
                  <Skeleton variant="text" width="60px" height="10px" className="rounded-full" />
                  <Skeleton variant="text" width="90%" height="24px" />
                  <Skeleton variant="text" width="70%" height="24px" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((art, index) => (
              <ScrollReveal key={art.id} delay={index * 0.1}>
                <Link 
                  to={`/news/${art.id}`} 
                  className="group block text-left h-full"
                >
                  <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-ink/5 shadow-xl transition-all duration-500 group-hover:shadow-ink/10">
                    <OptimizedMedia 
                      src={art.image} 
                      className="h-full w-full"
                      aspectRatio="h-full w-full"
                      alt={art.title} 
                      imageProps={{
                        className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      }}
                    />
                  </div>
                  <div className="mt-8">
                    <span className="rounded-full border border-ink/10 px-4 py-2 text-[10px] font-semibold tracking-wider text-ink/80">
                      {art.category}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-ink/60">
                      {art.title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-sm font-semibold tracking-wider text-ink/40">
              No Transmissions found in {activeCategory}
            </p>
          </div>
        )}
      </div>
    </motion.main>
  );
}