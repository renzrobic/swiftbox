import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useArticle } from '../hooks/useArticle';
import ScrollReveal from '../components/layout/ScrollReveal';
import OptimizedMedia from '../components/ui/OptimizedMedia';
import Skeleton from '../components/ui/Skeleton';

export default function ArticleDetail() {
  const { id } = useParams();
  
  // Use our new custom hook!
  const { article: post, loading, error } = useArticle(id);

  if (error) return (
    <main role="alert" className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="font-semibold tracking-wider text-ink/40">
        Transmission Lost: Article Not Found
      </div>
      <Link 
        to="/news" 
        className="border-b border-ink text-xs font-semibold tracking-wider text-ink transition-opacity hover:opacity-50"
      >
        Return to Newsroom
      </Link>
    </main>
  );

  if (loading || !post) return (
    <main className="min-h-screen bg-white section-spacing" aria-busy="true">
      <div className="section-container max-w-4xl">
        {/* Nav Skeleton */}
        <Skeleton variant="text" width="120px" height="14px" className="mb-12" />
        
        {/* Header Skeleton */}
        <div className="mb-16 flex flex-col items-center space-y-4">
          <Skeleton variant="text" width="80%" height="48px" />
          <Skeleton variant="text" width="60%" height="48px" />
          <Skeleton variant="text" width="160px" height="14px" />
        </div>
        
        {/* Image Skeleton */}
        <Skeleton variant="rectangle" height="400px" className="mx-auto mb-16 rounded-xl lg:rounded-2xl" />
        
        {/* Content Skeleton */}
        <div className="space-y-6">
          <Skeleton variant="text" width="100%" height="16px" />
          <Skeleton variant="text" width="100%" height="16px" />
          <Skeleton variant="text" width="90%" height="16px" />
          <Skeleton variant="text" width="100%" height="16px" />
          <Skeleton variant="text" width="85%" height="16px" />
        </div>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-white section-spacing">
      <div className="section-container max-w-4xl">
        
        {/* Navigation */}
        <ScrollReveal>
          <nav className="mb-12 text-left" aria-label="Back">
            <Link 
              to="/news" 
              className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-wider text-ink transition-all hover:translate-x-[-4px] btn-ai-glow"
            >
              <ArrowLeft size={16} aria-hidden="true" /> Back to newsroom
            </Link>
          </nav>
        </ScrollReveal>
        
        {/* Article Header */}
        <ScrollReveal delay={0.1}>
          <header className="mb-16 text-center">
            <h1 className="mb-8 text-5xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-center gap-4 text-base font-semibold text-ink/70">
              <time dateTime={post.date}>{post.date}</time> 
              <span>•</span> 
              <span className="text-[11px] font-semibold tracking-wider">{post.category}</span>
            </div>
          </header>
        </ScrollReveal>
        
        {/* Featured Image */}
        <ScrollReveal delay={0.2}>
          <div className="mx-auto mb-16 aspect-video overflow-hidden rounded-xl border border-ink/5 bg-ink/5 shadow-2xl lg:rounded-2xl">
            <OptimizedMedia 
              src={post.image} 
              className="h-full w-full"
              aspectRatio="h-full w-full"
              alt={`Hero image for ${post.title}`} 
              priority={true} 
            />
          </div>
        </ScrollReveal>
        
        {/* Article Content */}
        <ScrollReveal delay={0.3}>
          <article className="max-w-none">
            <div 
              className="prose prose-lg max-w-none text-left font-medium leading-relaxed text-ink prose-headings:font-semibold prose-headings:text-ink prose-a:text-ink prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </ScrollReveal>

      </div>
    </main>
  );
}