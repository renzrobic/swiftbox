import { useState, useEffect } from 'react';

export function useScrollVisibility(threshold = 400) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Check if current scroll position is within the threshold
      setIsVisible(window.scrollY <= threshold);
    };

    // Run once on mount to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
}