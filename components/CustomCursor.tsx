"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor on desktop (devices with fine pointer)
    if (typeof window === "undefined" || window.matchMedia("(hover: hover) and (pointer: fine)").matches === false) {
      return;
    }

    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Update cursor position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Direct positioning for dot
      gsap.to(cursorDot, {
        x: mouseX - 5,
        y: mouseY - 5,
        duration: 0,
      });

      // Smooth following for outline
      gsap.to(cursorOutline, {
        x: mouseX - 20,
        y: mouseY - 20,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Helper function to check if target is an Element
    const isElement = (target: EventTarget | null): target is Element => {
      return target instanceof Element;
    };

    // Magnetic effect for interactive elements
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!isElement(target)) return;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        gsap.to(cursorOutline, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target;
      if (!isElement(target)) return;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        gsap.to(cursorOutline, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Magnetic attraction to links
    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target;
      if (!isElement(target)) return;

      const link = target.closest("a");
      if (link) {
        const rect = link.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        gsap.to(cursorOutline, {
          x: centerX - 20,
          y: centerY - 20,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mouseover", handleLinkHover);

    // Hide cursor on mouse leave
    const handleMouseLeaveWindow = () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 1,
        duration: 0.3,
      });
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mouseover", handleLinkHover);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorOutlineRef} className="cursor-outline" />
    </>
  );
}
