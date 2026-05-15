import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRecentArticles } from '../../hooks/useRecentArticles';
import ScrollReveal from '../../components/layout/ScrollReveal';
import OptimizedMedia from '../../components/ui/OptimizedMedia';
import Skeleton from '../../components/ui/Skeleton';

export default function RecentNews() {
  // Using our new custom hook!
  const { articles, loading, error } = useRecentArticles(3);

  return (
    <section className="section-container section-spacing bg-white" aria-labelledby="news-heading">
      <ScrollReveal>
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="text-left">
            <h2 id="news-heading" className="text-4xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              Recent News
            </h2>
          </div>

          <div className="w-full flex-shrink-0 md:w-auto">
            <Link
              to="/news"
              className="rounded-full bg-ink px-6 py-2 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-matte-charcoal md:w-auto btn-ai-glow"
            >
              Browse All
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Error State */}
      {error && (
        <div className="flex justify-center py-10 text-red-500">
          Failed to load transmissions. Please try again.
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-6">
              <Skeleton variant="rectangle" height="200px" className="rounded-xl lg:rounded-2xl" />
              <div className="space-y-3">
                <Skeleton variant="text" width="40%" height="10px" />
                <Skeleton variant="text" width="90%" height="24px" />
                <Skeleton variant="text" width="30%" height="10px" />
              </div>
            </div>
          ))}
        </div>
      ) : articles.length > 0 ? (
        /* Success State */
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {articles.map((art, index) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link to={`/news/${art.id}`} className="group block text-left">
                <div className="relative aspect-video overflow-hidden rounded-xl border border-ink/10 bg-ink/5 shadow-2xl transition-all duration-500 group-hover:shadow-ink/10 lg:rounded-2xl">
                  <OptimizedMedia
                    src={art.image}
                    alt={art.title}
                    className="h-full w-full"
                    aspectRatio="h-full w-full"
                    imageProps={{
                      className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    }}
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/5" />
                </div>

                <div className="mt-8">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[10px] font-semibold tracking-wider text-ink/40">
                      {art.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink/20" />
                    <span className="text-[10px] font-semibold tracking-wider text-ink/40">
                      {art.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold leading-tight tracking-tight text-ink transition-colors group-hover:text-matte-charcoal">
                    {art.title}
                  </h3>

                  <div className="mt-6 flex items-center gap-2 text-[10px] font-semibold tracking-wider text-ink opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100">
                    Read More <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-ink/10 py-24 text-center text-ink/20">
          <p className="text-xs font-semibold tracking-wider">No active transmissions found</p>
        </div>
      )}
    </section>
  );
}