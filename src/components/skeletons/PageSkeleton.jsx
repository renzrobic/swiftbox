import React from 'react';
import HeroSkeleton from './HeroSkeleton';
import MissionSkeleton from './MissionSkeleton';
import ServicesSkeleton from './ServicesSkeleton';
import SystemOverviewSkeleton from './SystemOverviewSkeleton';
import TechnicalArchitectureSkeleton from './TechnicalArchitectureSkeleton';
import AdminSkeleton from './AdminSkeleton';
import NewsSkeleton from './NewsSkeleton';
import ProductPageSkeleton from './ProductPageSkeleton';

export { AdminSkeleton, NewsSkeleton, ProductPageSkeleton };
import Skeleton from '../ui/Skeleton';

export const HomeSkeleton = () => (
  <div className="relative min-h-screen">
    <HeroSkeleton />
    <MissionSkeleton />
    <ServicesSkeleton />
    <SystemOverviewSkeleton />
    <TechnicalArchitectureSkeleton />
    
    {/* Generic footer/bottom section skeletons for other components */}
    <div className="py-24 max-w-7xl mx-auto px-6 md:px-10">
      <Skeleton className="h-4 w-24 mb-4" />
      <Skeleton className="h-8 w-[40%] mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-2xl" />
            <Skeleton className="h-5 w-[60%]" />
            <Skeleton className="h-4 w-[90%]" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PageSkeleton = ({ type = 'home' }) => {
  switch (type) {
    case 'admin': return <AdminSkeleton />;
    case 'news': return <NewsSkeleton />;
    case 'product': return <ProductPageSkeleton />;
    case 'home':
    default: return <HomeSkeleton />;
  }
};

export default PageSkeleton;
