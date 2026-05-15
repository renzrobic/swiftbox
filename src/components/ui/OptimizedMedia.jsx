import React, { useState, useEffect, useRef } from 'react';
import Skeleton from './Skeleton';

/**
 * OptimizedMedia handles smart loading of images and videos.
 * Features:
 * - Intersection Observer for lazy loading (unless priority=true)
 * - Skeleton loader while loading
 * - Smooth transition when media is ready
 * - Fallback handling for failed loads
 * - Optimized video attributes for performance (muted, playsInline, autoPlay)
 */
const OptimizedMedia = ({
  type = 'image', // 'image' | 'video'
  src,
  fallbackSrc,
  alt = '',
  className = '',
  skeletonClassName = '',
  priority = false,
  videoProps = {},
  imageProps = {},
  aspectRatio = 'aspect-video'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const mediaRef = useRef(null);

  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '200px', // Start loading before it's in viewport
        threshold: 0.01 
      }
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    console.error(`Media failed to load: ${src}`);
    setIsLoaded(true);
    setHasError(true);
  };

  // If error occurs and we have a fallback, use it. 
  // If no fallback, we still show isLoaded=true so the skeleton disappears, 
  // but we might show a placeholder icon or color.
  const displaySrc = hasError ? (fallbackSrc || '') : src;

  return (
    <div 
      ref={mediaRef} 
      className={`overflow-hidden ${className.includes('absolute') ? '' : 'relative'} ${aspectRatio} ${className}`}
    >
      {/* SKELETON LAYER */}
      {!isLoaded && (
        <Skeleton 
          className={`absolute inset-0 z-10 ${skeletonClassName}`} 
          shimmer={true}
        />
      )}

      {/* ERROR FALLBACK LAYER */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/5 text-ink/20">
          <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.587-1.587a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-medium uppercase tracking-widest">Media Unavailable</span>
        </div>
      )}

      {/* MEDIA LAYER */}
      {isInView && (
        type === 'video' ? (
          <video
            src={hasError ? '' : src}
            onLoadedData={handleLoad}
            onError={handleError}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            muted
            loop
            playsInline
            {...videoProps}
          />
        ) : (
          <img
            src={displaySrc}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${isLoaded && !hasError ? 'opacity-100' : 'opacity-0'}`}
            loading={priority ? 'eager' : 'lazy'}
            {...imageProps}
          />
        )
      )}

      {/* Fallback image when video fails or while waiting */}
      {hasError && fallbackSrc && (
        <img
          src={fallbackSrc}
          alt={alt}
          onLoad={handleLoad}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};

export default OptimizedMedia;
