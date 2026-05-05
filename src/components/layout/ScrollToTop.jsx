import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop Utility
 * Logic: Monitors the URL pathname and resets scroll position to the top
 * of the page on every navigation event.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // We use 'instant' behavior for page transitions to prevent 
    // the user from seeing content being swapped as they scroll.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });
  }, [pathname]);

  // This component is a functional utility and does not render any UI.
  return null;
}