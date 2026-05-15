import React from 'react';
import Skeleton from '../../components/ui/Skeleton';

const SystemInfrastructureSkeleton = () => {
  return (
    <section className="overflow-hidden section-spacing">
      <div className="section-container">
        
        {/* Heading Skeleton */}
        <div className="mb-16 flex flex-col items-start justify-between gap-10 md:mb-24 md:flex-row md:gap-12">
          <div className="max-w-2xl w-full">
            <Skeleton className="h-10 w-3/4 md:h-14 md:w-5/6 mb-6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6 mt-2" />
          </div>
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>

        <div className="space-y-32 md:space-y-64">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center gap-12 lg:flex-row md:gap-24 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* VIDEO CANVAS SKELETON */}
              <div className="relative aspect-[16/10] w-full lg:w-7/12">
                <Skeleton className="h-full w-full rounded-xl lg:rounded-2xl" shimmer={true} />
              </div>

              {/* TEXT CONTENT SKELETON */}
              <div className="w-full lg:w-5/12">
                <Skeleton className="h-8 w-2/3 mb-6" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-full mb-2" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemInfrastructureSkeleton;
