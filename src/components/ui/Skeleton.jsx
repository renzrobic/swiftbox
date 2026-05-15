import React from 'react';

/**
 * Reusable Skeleton component for consistent loading states.
 * Follows the "Soft-Tech" aesthetic with subtle monochromatic pulses.
 */
const Skeleton = ({ 
  className = '', 
  width, 
  height, 
  variant = 'rectangle', // 'rectangle' | 'circle' | 'text'
  shimmer = true 
}) => {
  const baseClasses = `skeleton ${shimmer ? 'animate-skeleton-shimmer' : 'animate-skeleton-pulse'} ${className}`;
  
  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%'),
  };

  const variantClasses = {
    circle: 'rounded-full',
    rectangle: 'rounded-[1.5rem]', // Matches --radius-card
    text: 'rounded-md my-1',
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]}`} 
      style={style}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
