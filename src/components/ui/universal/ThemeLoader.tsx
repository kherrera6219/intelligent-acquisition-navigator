
import React, { useEffect, useState } from 'react';

const ThemeLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Apply the correct theme on initial load
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      if (savedTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        document.documentElement.classList.add(systemTheme);
      } else {
        document.documentElement.classList.add(savedTheme);
      }
    } else {
      // Default theme
      document.documentElement.classList.add('dark');
    }
    
    setMounted(true);
  }, []);
  
  // Avoid flash of unstyled content by showing nothing until mounted
  if (!mounted) return null;
  
  return <>{children}</>;
};

export default ThemeLoader;
