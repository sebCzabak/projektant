"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    if (!overlay || !content) return;

    // Zabicie poprzednich tweenów – brak nakładania i „clanky” po wielu przejściach
    gsap.killTweensOf([overlay, content]);

    if (isInitialMount.current) {
      gsap.set(overlay, { y: "100%" });

      const tl = gsap.timeline();
      tl.to(overlay, {
        y: "100%",
        duration: 1.35,
        ease: "power2.inOut",
      });
      tl.from(
        content,
        {
          opacity: 0,
          y: 28,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.3"
      );

      isInitialMount.current = false;
      prevPathname.current = pathname;
      return;
    }

    if (prevPathname.current === pathname) return;

    const tl = gsap.timeline();
    tl.to(overlay, {
      y: 0,
      duration: 1.0,
      ease: "power2.in",
    });
    tl.to({}, { duration: 0.75 }); // Logo widoczne 0,75 s
    tl.to(overlay, {
      y: "100%",
      duration: 1.35,
      ease: "power2.out",
    });
    tl.from(
      content,
      {
        opacity: 0,
        y: 28,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=0.3"
    );

    prevPathname.current = pathname;
  }, [pathname]);

  return (
    <>
      {/* Overlay tylko pod navbarem (navbar z-[100] zostaje nieruchomy) – loading z miejscem na logo */}
      <div
        ref={overlayRef}
        className="fixed left-0 right-0 bottom-0 z-[90] pointer-events-none flex items-center justify-center"
        style={{ 
          top: "5rem",
          transform: "translateY(100%)",
          backgroundColor: "#FDFDFD"
        }}
      >
        <div className="w-24 h-24 border border-[#121212]/20 rounded-sm flex items-center justify-center text-[#121212]/40 text-sm font-light tracking-widest uppercase">
          Logo
        </div>
      </div>
      {/* Page content */}
      <div ref={contentRef} className="relative">
        {children}
      </div>
    </>
  );
}
