"use client";

import { useEffect, useRef, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useTheme } from "@/contexts/ThemeContext";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Initial page load animation
    if (isInitialMount.current && overlayRef.current && contentRef.current) {
      const tl = gsap.timeline();

      // Start with overlay at bottom (not covering navbar)
      gsap.set(overlayRef.current, { y: "100%" });

      // Animate overlay out (revealing content) - faster
      tl.to(overlayRef.current, {
        y: "100%",
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Fade in content
      tl.from(
        contentRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );

      isInitialMount.current = false;
      prevPathname.current = pathname;
      return;
    }

    // Page transition animation on route change
    if (
      !isInitialMount.current &&
      prevPathname.current !== pathname &&
      overlayRef.current &&
      contentRef.current
    ) {
      const tl = gsap.timeline();

      // Animate overlay in (covering current page) - faster
      tl.to(overlayRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power2.in",
      });

      // Animate overlay out (revealing new page)
      tl.to(overlayRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
      });

      // Fade in new content
      tl.from(
        contentRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <>
      {/* Page transition overlay - lower z-index than navbar */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] pointer-events-none transition-colors duration-300"
        style={{ 
          transform: "translateY(100%)",
          backgroundColor: theme === "dark" ? "#121212" : "#FDFDFD"
        }}
      />
      {/* Page content */}
      <div ref={contentRef} className="relative">
        {children}
      </div>
    </>
  );
}
