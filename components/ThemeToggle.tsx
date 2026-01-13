"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ThemeToggle() {
  const { theme, mounted, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Get theme from HTML class if not mounted yet (SSR)
  const currentTheme = mounted ? theme : (typeof window !== "undefined" && document.documentElement.classList.contains("light") ? "light" : "dark");

  useEffect(() => {
    if (buttonRef.current) {
      gsap.from(buttonRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative w-12 h-12 flex items-center justify-center hover:text-accent transition-colors duration-300 group"
      style={{ color: currentTheme === "dark" ? "#FDFDFD" : "#121212" }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon (Light Mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6 absolute transition-all duration-300 ${
          currentTheme === "dark"
            ? "opacity-0 rotate-90 scale-0"
            : "opacity-100 rotate-0 scale-100"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364 6.364l-1.591 1.591M21 12h-2.25M4.5 12H2.25m13.364-6.364l-1.591-1.591M12 18.75V21m-6.364-6.364l-1.591 1.591M3 12H.75m6.364 6.364l-1.591 1.591M12 5.25a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5z"
        />
      </svg>

      {/* Moon Icon (Dark Mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6 absolute transition-all duration-300 ${
          currentTheme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    </button>
  );
}
