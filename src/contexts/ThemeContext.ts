
import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create a context with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: () => {},
});
