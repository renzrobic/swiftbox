import React from 'react';
import Skeleton from '../ui/Skeleton';

const AdminSkeleton = () => (
  <div className="flex h-screen w-full flex-col overflow-hidden bg-white pt-24 md:flex-row">
    <aside className="hidden w-64 flex-col border-r border-ink/5 p-6 md:flex">
      <div className="mb-10 px-2">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-2 w-20" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Skeleton key={i} className="h-11 w-full rounded-xl" />
        ))}
      </div>
    </aside>
    <main className="flex-1 bg-pearl p-6 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-[120px] w-full rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-[400px] w-full rounded-2xl" shimmer={true} />
    </main>
  </div>
);

export default AdminSkeleton;
