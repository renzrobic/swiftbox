import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useArticle } from '../hooks/useArticle';
import ScrollReveal from '../components/layout/ScrollReveal';

export default function ArticleDetail() {
  const { id } = useParams();
  
  // Use our new custom hook!
  const { article: post, loading, error } = useArticle(id);

  if (error) return (
    <main role="alert" className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="font-bold uppercase tracking-widest text-ink/20">
        Transmission_Lost: Article_Not_Found
      </div>
      <Link 
        to="/news" 
        className="border-b border-ink text-xs font-bold uppercase tracking-widest text-ink transition-opacity hover:opacity-50"
      >
        Return to Newsroom
      </Link>
    </main>
  );

  if (loading || !post) return (
    <main className="min-h-screen bg-white px-8 pb-32 pt-32 md:pt-48" aria-busy="true">
      <div className="mx-auto max-w-4xl animate-pulse">
        {/* Nav Skeleton */}
        <div className="mb-12 h-4 w-32 rounded bg-ink/5"></div>
        
        {/* Header Skeleton */}
        <div className="mb-16 flex flex-col items-center">
          <div className="mb-4 h-12 w-3/4 rounded-lg bg-ink/5 md:h-16"></div>
          <div className="mb-8 h-12 w-1/2 rounded-lg bg-ink/5 md:h-16"></div>
          <div className="h-4 w-48 rounded bg-ink/5"></div>
        </div>
        
        {/* Image Skeleton */}
        <div className="mx-auto mb-16 aspect-video w-full rounded-xl bg-ink/5 lg:rounded-2xl"></div>
        
        {/* Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full rounded bg-ink/5"></div>
          <div className="h-4 w-full rounded bg-ink/5"></div>
          <div className="h-4 w-5/6 rounded bg-ink/5"></div>
          <div className="h-4 w-full rounded bg-ink/5"></div>
          <div className="h-4 w-4/5 rounded bg-ink/5"></div>
        </div>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-white px-8 pb-32 pt-32 md:pt-48">
      <div className="mx-auto max-w-4xl">
        
        {/* Navigation */}
        <ScrollReveal>
          <nav className="mb-12 text-left" aria-label="Back">
            <Link 
              to="/news" 
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-ink transition-all hover:translate-x-[-4px] btn-ai-glow"
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
            
            <div className="flex items-center justify-center gap-4 text-base font-semibold text-ink/40">
              <time dateTime={post.date}>{post.date}</time> 
              <span>•</span> 
              <span className="text-[11px] font-black uppercase tracking-widest">{post.category}</span>
            </div>
          </header>
        </ScrollReveal>
        
        {/* Featured Image */}
        <ScrollReveal delay={0.2}>
          <div className="mx-auto mb-16 aspect-video overflow-hidden rounded-xl border border-ink/5 bg-ink/5 shadow-2xl lg:rounded-2xl">
            <img 
              src={post.image} 
              className="h-full w-full object-cover" 
              alt={`Hero image for ${post.title}`} 
              loading="eager" 
            />
          </div>
        </ScrollReveal>
        
        {/* Article Content */}
        <ScrollReveal delay={0.3}>
          <article className="max-w-none">
            <div 
              className="prose prose-lg max-w-none text-left font-medium leading-relaxed text-ink prose-headings:font-bold prose-headings:text-ink prose-a:text-ink prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </ScrollReveal>

      </div>
    </main>
  );
}