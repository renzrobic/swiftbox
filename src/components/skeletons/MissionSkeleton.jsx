import React from 'react';
import Skeleton from '../ui/Skeleton';

const MissionSkeleton = () => {
  return (
    <section className="mt-12 px-6 py-20 md:mt-32 md:px-10 md:py-32 bg-white">
      <div className="mx-auto max-w-5xl text-center space-y-4">
        <Skeleton className="h-8 w-[90%] mx-auto md:h-12 md:w-[80%]" />
        <Skeleton className="h-8 w-[70%] mx-auto md:h-12 md:w-[60%]" />
      </div>
    </section>
  );
};

export default MissionSkeleton;
