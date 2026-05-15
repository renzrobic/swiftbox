import React from 'react';
import Skeleton from '../ui/Skeleton';

const NewsSkeleton = () => (
  <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-10">
    <Skeleton className="h-4 w-32 mx-auto mb-6" />
    <Skeleton className="h-12 w-[60%] mx-auto mb-16" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
      <Skeleton className="h-[400px] w-full rounded-3xl" shimmer={true} />
      <div className="flex flex-col justify-center space-y-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-[80%]" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[60%]" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-[240px] w-full rounded-2xl" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-[90%]" />
        </div>
      ))}
    </div>
  </div>
);

export default NewsSkeleton;
