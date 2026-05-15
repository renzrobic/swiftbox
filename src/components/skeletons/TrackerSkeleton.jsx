import React from 'react';
import Skeleton from '../ui/Skeleton';

const TrackerSkeleton = () => {
  return (
    <div className="w-full space-y-12 py-10 text-left">
      {/* Search Header Area */}
      <div className="flex flex-col items-center space-y-6 text-center">
        <Skeleton className="h-4 w-32 mx-auto" />
        <Skeleton className="h-10 w-3/4 max-w-md mx-auto" />
      </div>

      {/* Main Status Card */}
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.5rem] border border-ink/5 bg-white p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div className="space-y-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="space-y-3 text-right">
            <Skeleton className="h-3 w-24 ml-auto" />
            <Skeleton className="h-8 w-32 ml-auto" />
          </div>
        </div>

        {/* Stepper Skeleton */}
        <div className="flex justify-between items-center px-4 mb-12">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center gap-4">
              <Skeleton variant="circle" width="40px" height="40px" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>

        {/* History List Skeleton */}
        <div className="space-y-6 border-t border-ink/5 pt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-6">
              <Skeleton className="h-4 w-24 shrink-0" />
              <div className="space-y-2 flex-grow">
                <Skeleton className="h-4 w-[60%]" />
                <Skeleton className="h-3 w-[40%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackerSkeleton;
