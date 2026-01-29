"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Szybszy lerp = bardziej responsywny kursor (wyższa wartość = szybsze dogonienie myszy)
const OUTLINE_LERP = 0.22;
const OUTLINE_SIZE = 20;

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

    // quickSetter = jedna funkcja, zero tworzenia tweenów na każdy ruch (GPU-friendly)
    const setDot = gsap.quickSetter(cursorDot, "x", "px");
    const setDotY = gsap.quickSetter(cursorDot, "y", "px");
    const setOutline = gsap.quickSetter(cursorOutline, "x", "px");
    const setOutlineY = gsap.quickSetter(cursorOutline, "y", "px");

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let magneticTarget: { x: number; y: number } | null = null;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - 5;
      mouseY = e.clientY - 5;
    };

    const tick = () => {
      const targetX = magneticTarget ? magneticTarget.x : mouseX - (OUTLINE_SIZE - 5);
      const targetY = magneticTarget ? magneticTarget.y : mouseY - (OUTLINE_SIZE - 5);

      setDot(mouseX);
      setDotY(mouseY);

      outlineX += (targetX - outlineX) * OUTLINE_LERP;
      outlineY += (targetY - outlineY) * OUTLINE_LERP;
      setOutline(outlineX);
      setOutlineY(outlineY);

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const isElement = (target: EventTarget | null): target is Element => {
      return target instanceof Element;
    };

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
          duration: 0.12,
          ease: "power2.out",
          overwrite: true,
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
          duration: 0.12,
          ease: "power2.out",
          overwrite: true,
        });
      }
    };

    const handleMouseOverLink = (e: MouseEvent) => {
      const target = e.target;
      if (!isElement(target)) return;
      const link = target.closest("a");
      if (link) {
        const rect = link.getBoundingClientRect();
        magneticTarget = {
          x: rect.left + rect.width / 2 - OUTLINE_SIZE,
          y: rect.top + rect.height / 2 - OUTLINE_SIZE,
        };
      }
    };

    const handleMouseOutLink = () => {
      magneticTarget = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mouseover", handleMouseOverLink);
    document.addEventListener("mouseout", handleMouseOutLink);

    const handleMouseLeaveWindow = () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 0,
        duration: 0.15,
        overwrite: true,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([cursorDot, cursorOutline], {
        opacity: 1,
        duration: 0.15,
        overwrite: true,
      });
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mouseover", handleMouseOverLink);
      document.removeEventListener("mouseout", handleMouseOutLink);
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
