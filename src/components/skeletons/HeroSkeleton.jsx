import React from 'react';
import Skeleton from '../ui/Skeleton';

const HeroSkeleton = () => {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-ink/5">
      {/* Background Skeleton */}
      <Skeleton className="absolute inset-0" shimmer={true} />
      
      {/* Content Overlay */}
      <div className="relative z-20 flex h-full flex-col justify-end px-6 pb-20 md:px-10 md:pb-24">
        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-end md:gap-12">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-[80%] sm:h-12 sm:w-[60%] md:h-16 md:w-[70%]" />
            <Skeleton className="h-10 w-[60%] sm:h-12 sm:w-[40%] md:h-16 md:w-[50%]" />
          </div>
          
          <div className="mb-4 flex-shrink-0">
            <Skeleton className="h-14 w-48 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
