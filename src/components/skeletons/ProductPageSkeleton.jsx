import React from 'react';
import Skeleton from '../ui/Skeleton';

const ProductPageSkeleton = () => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Carousel Skeleton */}
      <div className="h-[70vh] w-full bg-ink/5 relative">
        <Skeleton className="absolute inset-0" shimmer={true} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 space-y-6">
          <Skeleton className="h-12 w-[60%] md:w-[40%]" />
          <Skeleton className="h-6 w-[80%] md:w-[50%]" />
        </div>
      </div>

      {/* SubNavbar Skeleton */}
      <div className="sticky top-20 z-40 h-16 w-full border-y border-ink/5 bg-white/80 backdrop-blur-md flex items-center justify-center gap-8">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-4 w-20" />
        ))}
      </div>

      {/* Content Section Skeletons */}
      <div className="py-24 px-8 max-w-7xl mx-auto space-y-24">
        <div className="space-y-8">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-[400px] w-full rounded-3xl" shimmer={true} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Skeleton className="h-[300px] w-full rounded-2xl" />
          <Skeleton className="h-[300px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductPageSkeleton;
