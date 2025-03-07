
import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design based on media queries
 * 
 * @param query The media query to check against (e.g., "(min-width: 768px)")
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Default to true for SSR (prevents layout shift)
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") return;
    
    // Create the media query list
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define the handler
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    
    // Add the event listener
    mediaQuery.addEventListener("change", handler);
    
    // Clean up
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
