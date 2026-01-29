"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
// import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

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
          duration: 0.18,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(link, {
          scale: 1,
          duration: 0.18,
          ease: "power2.out",
          overwrite: true,
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
    { href: "/projects", label: "Realizacje" },
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
        backgroundColor: "rgba(18, 18, 18, 0.95)",
        borderColor: "rgba(128, 128, 128, 0.3)"
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-light tracking-wider hover:text-accent transition-colors duration-300"
          style={{ color: "#FDFDFD" }}
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
              className={`group relative text-sm tracking-widest uppercase transition-colors duration-300 ${pathname === link.href ? "font-semibold" : "font-light"}`}
              style={{ 
                color: pathname === link.href ? "#FDFDFD" : "#b0b0b0"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#FDFDFD";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = pathname === link.href ? "#FDFDFD" : "#b0b0b0";
              }}
            >
              {link.label}
              <span 
                className="absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "#FDFDFD" }}
              />
            </Link>
          ))}
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </nav>
  );
}
