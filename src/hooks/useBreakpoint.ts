
import { useState, useEffect } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints = {
  xs: 0,
  sm: 475,
  md: 640,
  lg: 768,
  xl: 1024,
  '2xl': 1280
};

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');
  const [width, setWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      
      if (window.innerWidth >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (window.innerWidth >= breakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (window.innerWidth >= breakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (window.innerWidth >= breakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (window.innerWidth >= breakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint('xs');
      }
    };

    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isAbove = (breakpoint: Breakpoint) => width >= breakpoints[breakpoint];
  const isBelow = (breakpoint: Breakpoint) => width < breakpoints[breakpoint];
  const isBreakpoint = (breakpoint: Breakpoint) => currentBreakpoint === breakpoint;
  
  return {
    breakpoint: currentBreakpoint,
    width,
    isAbove,
    isBelow,
    isBreakpoint,
    breakpoints
  };
}
