import React from 'react';
import Skeleton from '../ui/Skeleton';

const SystemOverviewSkeleton = () => {
  return (
    <section className="px-8 py-24 md:px-10 md:py-40 bg-pearl/30">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start space-y-6">
            <Skeleton className="h-10 w-[70%] md:h-14 md:w-[60%]" />
            <Skeleton className="h-10 w-[50%] md:h-14 md:w-[40%]" />
            <div className="space-y-2 w-full max-w-lg">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[80%]" />
            </div>
            <Skeleton className="h-14 w-40 rounded-full mt-4" />
          </div>

          <div className="relative aspect-square w-full rounded-2xl lg:rounded-[3rem] bg-white border border-ink/5 p-12">
            <Skeleton className="h-full w-full rounded-xl" shimmer={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemOverviewSkeleton;
