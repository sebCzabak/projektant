"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  mounted: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  mounted: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start with "dark" on server to match initial HTML class
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Check localStorage or system preference
    try {
      const savedTheme = localStorage.getItem("theme") as Theme;
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      let initialTheme: Theme = "dark";
      if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
        initialTheme = savedTheme;
      } else {
        initialTheme = systemPrefersDark ? "dark" : "light";
      }

      // Check what class is already on html (set by script tag)
      const htmlHasDark = document.documentElement.classList.contains("dark");
      const htmlHasLight = document.documentElement.classList.contains("light");
      
      // Sync with what's already on the page
      if (htmlHasDark) {
        setTheme("dark");
      } else if (htmlHasLight) {
        setTheme("light");
      } else {
        setTheme(initialTheme);
      }
    } catch (error) {
      setTheme("dark");
    }
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, mounted, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
