import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useArticle } from '../hooks/useArticle';

export default function ArticleDetail() {
  const { id } = useParams();
  
  // Use our new custom hook!
  const { article: post, loading, error } = useArticle(id);

  if (error) return (
    <main role="alert" className="flex h-screen flex-col items-center justify-center gap-6">
      <div className="font-bold uppercase tracking-widest text-royal-blue/20">
        Transmission_Lost: Article_Not_Found
      </div>
      <Link 
        to="/news" 
        className="border-b border-royal-blue text-xs font-bold uppercase tracking-widest text-royal-blue transition-opacity hover:opacity-50"
      >
        Return to Newsroom
      </Link>
    </main>
  );

  if (loading || !post) return (
    <div aria-busy="true" className="flex h-screen items-center justify-center animate-pulse font-bold uppercase tracking-widest text-royal-blue/10">
      Loading_Transmission...
    </div>
  );

  return (
    <main className="min-h-screen bg-white px-8 pb-32 pt-32 md:pt-48">
      <div className="mx-auto max-w-4xl">
        
        {/* Navigation */}
        <nav className="mb-12 text-left" aria-label="Back">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-royal-blue transition-all hover:translate-x-[-4px]"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to newsroom
          </Link>
        </nav>
        
        {/* Article Header */}
        <header className="mb-16 text-center">
          <h1 className="mb-8 text-5xl font-semibold leading-tight tracking-tight text-royal-blue md:text-6xl">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-center gap-4 text-base font-semibold text-royal-blue/40">
            <time dateTime={post.date}>{post.date}</time> 
            <span>•</span> 
            <span className="text-[11px] font-black uppercase tracking-widest">{post.category}</span>
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="mx-auto mb-16 aspect-video overflow-hidden rounded-xl border border-royal-blue/5 bg-royal-blue/5 shadow-2xl lg:rounded-2xl">
          <img 
            src={post.image} 
            className="h-full w-full object-cover" 
            alt={`Hero image for ${post.title}`} 
            loading="eager" 
          />
        </div>
        
        {/* Article Content */}
        <article className="max-w-none">
          <div className="prose prose-lg whitespace-pre-wrap text-left font-medium leading-relaxed text-royal-blue">
            {post.content}
          </div>
        </article>

      </div>
    </main>
  );
}