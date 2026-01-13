"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { theme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Project cards reveal animation
      projectCardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
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
  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = projectCardsRef.current[index];
    if (!card) return;

    if (isEntering) {
      gsap.to(card, {
        scale: 1.03,
        y: -5,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "Pierwszy projekt architektoniczny",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format",
      aspect: "aspect-[3/4]",
    },
    {
      id: 2,
      title: "Project Beta",

      description: "Drugi projekt architektoniczny",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80&auto=format",
      aspect: "aspect-[4/3]",
    },
    {
      id: 3,
      title: "Project Gamma",
      description: "Trzeci projekt architektoniczny",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format",
      aspect: "aspect-[16/9]",
    },
  ];

  return (
    <main className="min-h-screen pt-32">
      <div ref={pageRef} className="max-w-7xl mx-auto px-8 pb-32">
        {/* Page Title */}
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-light tracking-wider mb-32"
          style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
        >
          Projekty
        </h1>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectCardsRef.current[index] = el;
              }}
              className={`${project.aspect} overflow-hidden cursor-pointer group`}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              <div className="relative w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 
                    className="text-2xl font-light mb-2"
                    style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
                  >
                    {project.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: "#808080" }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
