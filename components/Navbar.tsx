"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, mounted } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  
  // Get theme from HTML class if not mounted yet (SSR)
  const currentTheme = mounted ? theme : (typeof window !== "undefined" && document.documentElement.classList.contains("light") ? "light" : "dark");

  useEffect(() => {
    // Ensure navbar is always visible - no animation that could hide it
    if (navRef.current) {
      // Force visibility immediately
      navRef.current.style.opacity = "1";
      navRef.current.style.display = "block";
      navRef.current.style.visibility = "visible";
    }
  }, []);

  // Magnetic effect for links
  useEffect(() => {
    linksRef.current.forEach((link) => {
      if (!link) return;

      const handleMouseEnter = () => {
        gsap.to(link, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/oferta", label: "Oferta" },
    { href: "/about", label: "About" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md border-b transition-colors duration-300"
      style={{ 
        opacity: 1, 
        visibility: "visible", 
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: currentTheme === "dark" ? "rgba(18, 18, 18, 0.95)" : "rgba(253, 253, 253, 0.95)",
        borderColor: currentTheme === "dark" ? "rgba(128, 128, 128, 0.3)" : "rgba(128, 128, 128, 0.2)"
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-light tracking-wider hover:text-accent transition-colors duration-300"
          style={{ color: currentTheme === "dark" ? "#FDFDFD" : "#121212" }}
        >
          Logo
        </Link>
        <div className="flex items-center gap-12">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              ref={(el) => {
                if (el) linksRef.current[index] = el;
              }}
              className="group relative text-sm font-light tracking-widest uppercase transition-colors duration-300"
              style={{ 
                color: pathname === link.href 
                  ? (currentTheme === "dark" ? "#FDFDFD" : "#121212")
                  : "#808080"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = currentTheme === "dark" ? "#FDFDFD" : "#121212";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = pathname === link.href 
                  ? (currentTheme === "dark" ? "#FDFDFD" : "#121212")
                  : "#808080";
              }}
            >
              {link.label}
              <span 
                className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: currentTheme === "dark" ? "#FDFDFD" : "#121212" }}
              />
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
