"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function Kontakt() {
  const { theme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const iconsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Title fade-in animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Icons reveal animation
      iconsRef.current.forEach((icon, index) => {
        if (icon) {
          gsap.from(icon, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: icon,
              start: "top 85%",
              once: true,
            },
          });
        }
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  // Hover effect handler
  const handleIconHover = (index: number, isEntering: boolean) => {
    const icon = iconsRef.current[index];
    if (!icon) return;

    if (isEntering) {
      gsap.to(icon, {
        scale: 1.2,
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const contactLinks = [
    {
      id: 1,
      name: "Telefon",
      href: "tel:+48123456789",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Email",
      href: "mailto:kontakt@example.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-12 h-12"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-12 h-12"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen pt-32">
      <div ref={pageRef} className="max-w-5xl mx-auto px-8 pb-32">
        {/* Page Title */}
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-light tracking-wider mb-32"
          style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
        >
          Kontakt
        </h1>

        {/* Contact Text */}
        <div className="mb-24 text-center">
          <p 
            className="text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto"
            style={{ color: "#808080" }}
          >
            Spotkajmy się i porozmawiajmy przy pysznej kawie, tworząc niepowtarzalne marzenia.
          </p>
        </div>

        {/* Contact Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {contactLinks.map((link, index) => (
            <a
              key={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              ref={(el) => {
                iconsRef.current[index] = el;
              }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
              onMouseEnter={() => handleIconHover(index, true)}
              onMouseLeave={() => handleIconHover(index, false)}
            >
              <div 
                className="group-hover:text-accent transition-colors duration-300"
                style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
              >
                {link.icon}
              </div>
              <span 
                className="text-sm font-light tracking-widest uppercase transition-colors duration-300"
                style={{ 
                  color: "#808080"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme === "dark" ? "#FDFDFD" : "#121212";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#808080";
                }}
              >
                {link.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
