import React, { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import PageSkeleton from '../skeletons/PageSkeleton';

/**
 * SmartSuspense chooses the appropriate skeleton based on the current route.
 * This ensures the skeleton "exactly matches" the end layout.
 */
const SmartSuspense = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  let skeletonType = 'home';
  
  if (path.startsWith('/admin')) {
    skeletonType = 'admin';
  } else if (path.startsWith('/news')) {
    skeletonType = 'news';
  } else if (path === '/product' || path.startsWith('/product/')) {
    skeletonType = 'product';
  } else if (path === '/') {
    skeletonType = 'home';
  } else {
    // Default or common layout
    skeletonType = 'home'; 
  }

  return (
    <Suspense fallback={<PageSkeleton type={skeletonType} />}>
      {children}
    </Suspense>
  );
};

export default SmartSuspense;
