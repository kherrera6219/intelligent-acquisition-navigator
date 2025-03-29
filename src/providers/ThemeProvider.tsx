
import React, { useEffect, useState, useContext, createContext } from "react";
import { Theme } from "@/contexts/ThemeContext";
import { useThemeTransition } from "@/hooks/use-theme-transition";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: "dark" | "light";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
  systemTheme: "dark"
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme in localStorage or use system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme) return savedTheme;
    }
    
    return "system";
  });
  
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  // Use theme transition hook to handle smooth transitions
  useThemeTransition();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);
      
      // If using system theme, update the appearance
      if (theme === "system") {
        document.documentElement.classList.add('transitioning');
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(newSystemTheme);
        setTimeout(() => {
          document.documentElement.classList.remove('transitioning');
        }, 300);
      }
    };
    
    // Set listener for system theme changes
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('transitioning');
    root.classList.remove("light", "dark");

    const effectiveTheme = theme === "system" ? systemTheme : theme;
    root.classList.add(effectiveTheme);
    
    // Apply the appropriate scrollbar class
    document.body.classList.remove("light-scrollbar", "custom-scrollbar");
    document.body.classList.add(effectiveTheme === "dark" ? "custom-scrollbar" : "light-scrollbar");

    // Save theme preference
    localStorage.setItem("theme", theme);
    
    // Remove transitioning class after animation completes
    setTimeout(() => {
      root.classList.remove('transitioning');
    }, 300);
  }, [theme, systemTheme]);

  const contextValue = {
    theme,
    setTheme,
    systemTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme context throughout the app
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
