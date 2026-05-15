import React from 'react';
import Skeleton from '../ui/Skeleton';

const TechnicalArchitectureSkeleton = () => {
  return (
    <section className="relative my-6 md:my-10 overflow-hidden bg-ink px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading Skeleton */}
        <div className="mb-12 md:mb-20">
          <Skeleton className="h-10 w-64 md:h-14 md:w-96 mb-6" />
          <Skeleton className="h-6 w-full max-w-2xl" />
          <Skeleton className="h-6 w-3/4 max-w-xl mt-2" />
        </div>

        <div className="space-y-6 md:space-y-10">
          {/* Main Feature Card Skeleton */}
          <div className="relative h-[450px] md:h-[550px] overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 p-6 md:p-12">
            <Skeleton className="absolute inset-0" shimmer={true} />
            <div className="relative z-10 flex h-full w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <Skeleton className="h-8 w-48 md:h-10 md:w-80" />
              <Skeleton className="h-10 w-32 md:h-12 md:w-40 rounded-full" />
            </div>
          </div>

          {/* Secondary Cards Grid Skeleton */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            {[1, 2].map((i) => (
              <div key={i} className="relative h-[350px] md:h-[450px] overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
                <Skeleton className="absolute inset-0" shimmer={true} />
                <div className="relative z-10 flex h-full w-full flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                  <Skeleton className="h-8 w-48 md:h-10" />
                  <Skeleton className="h-10 w-32 md:h-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Grid Tags Skeleton */}
          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
            <div className="sm:col-span-2 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-48" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalArchitectureSkeleton;
