
import React, { useEffect, useState } from "react";
import { ThemeContext, Theme } from "@/contexts/ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme in localStorage or use system preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;
    
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    return systemTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      
      // Apply the appropriate scrollbar class
      document.body.classList.remove("light-scrollbar", "custom-scrollbar");
      document.body.classList.add(systemTheme === "dark" ? "custom-scrollbar" : "light-scrollbar");
    } else {
      root.classList.add(theme);
      
      // Apply the appropriate scrollbar class
      document.body.classList.remove("light-scrollbar", "custom-scrollbar");
      document.body.classList.add(theme === "dark" ? "custom-scrollbar" : "light-scrollbar");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
