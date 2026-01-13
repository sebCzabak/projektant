"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function Oferta() {
  const { theme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Cards reveal animation
      cardsRef.current.forEach((card, index) => {
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
    const card = cardsRef.current[index];
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

  const services = [
    {
      id: 1,
      title: "Projekty wnętrz",
      description:
        "Kompleksowe projekty wnętrz domów, mieszkań i apartamentów. Od koncepcji po dokumentację wykonawczą.",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format",
    },
    {
      id: 2,
      title: "Projekty ogrodów",
      description:
        "Projektowanie i aranżacja ogrodów prywatnych oraz terenów zieleni publicznej.",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80&auto=format",
    },
    {
      id: 3,
      title: "Dokumentacja wykonawcza",
      description:
        "Szczegółowa dokumentacja techniczna niezbędna do realizacji projektu.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format",
    },
    {
      id: 4,
      title: "Nadzór nad realizacją",
      description:
        "Kompleksowe zarządzanie procesem realizacji projektu od początku do końca.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format",
    },
    {
      id: 5,
      title: "Konsultacje architektoniczne",
      description:
        "Profesjonalne doradztwo w zakresie projektowania i aranżacji przestrzeni.",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format",
    },
    {
      id: 6,
      title: "Wizualizacje 3D",
      description:
        "Fotorealistyczne wizualizacje projektów, które pomagają zobaczyć efekt końcowy.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format",
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
          Oferta
        </h1>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="overflow-hidden cursor-pointer group"
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <h3 
                  className="text-2xl font-light"
                  style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: "#808080" }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
