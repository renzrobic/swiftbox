import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useArticles } from '../hooks/useArticles';

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
      className="min-h-screen bg-white pb-32 pt-40 md:pt-48"
    >
      <div className="mx-auto max-w-7xl px-8 text-left md:px-10">
        
        {/* Header Section */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-royal-blue md:text-5xl">
            Newsroom
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-tight tracking-tight text-royal-blue/60">
            Official updates from the Pagadian SwiftBox infrastructure.
          </p>
        </header>

        {/* Category Filters */}
        <nav 
          className="mb-16 flex flex-col items-center justify-between gap-8 border-b border-royal-blue/10 pb-12 md:flex-row"
          aria-label="Article Categories"
        >
          <div className="flex flex-wrap justify-center gap-2" role="tablist">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button 
                  key={cat} 
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-6 py-2 text-base font-medium tracking-tight transition-all active:scale-95 ${
                    isActive 
                      ? 'bg-royal-blue text-white shadow-lg shadow-royal-blue/20' 
                      : 'bg-royal-blue/5 text-royal-blue/50 hover:bg-royal-blue/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Article Grid / State Handling */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-royal-blue/20 border-t-royal-blue"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((art) => (
              <Link 
                key={art.id} 
                to={`/news/${art.id}`} 
                className="group block text-left"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-royal-blue/5 shadow-xl transition-all duration-500 group-hover:shadow-royal-blue/10 lg:rounded-2xl">
                  <img 
                    src={art.image} 
                    loading="lazy" 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    alt={art.title} 
                  />
                </div>
                <div className="mt-8">
                  <span className="rounded-full border border-royal-blue/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-royal-blue">
                    {art.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-royal-blue transition-colors group-hover:text-royal-blue/60">
                    {art.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-royal-blue/20">
              No Transmissions found in {activeCategory}
            </p>
          </div>
        )}
      </div>
    </motion.main>
  );
}