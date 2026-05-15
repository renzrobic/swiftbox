import React from 'react';
import Skeleton from '../ui/Skeleton';

const ServicesSkeleton = () => {
  return (
    <section className="mx-auto max-w-7xl px-8 py-24 md:px-10 md:py-32">
      <div className="mb-16 text-center">
        <Skeleton className="h-10 w-48 mx-auto md:h-12 md:w-64" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-full rounded-xl border border-ink/5 bg-pearl p-8 md:p-10 space-y-6">
            <Skeleton className="h-12 w-12 rounded-xl md:h-14 md:w-14" />
            <Skeleton className="h-8 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSkeleton;
