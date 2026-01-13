"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { theme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Title animation
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

      // Text blocks fade-in and slide-up animation
      textBlocksRef.current.forEach((block, index) => {
        if (block) {
          gsap.from(block, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              once: true,
            },
          });
        }
      });

      // Image reveal animation
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <main className="min-h-screen pt-32">
      <div ref={pageRef} className="max-w-5xl mx-auto px-8 pb-32">
        {/* Page Title */}
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-light tracking-wider mb-32"
          style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
        >
          O mnie
        </h1>

        {/* Text Content Blocks */}
        <div className="space-y-16 mb-32">
          <div
            ref={(el) => {
              textBlocksRef.current[0] = el;
            }}
            className="space-y-6"
          >
            <h2 
              className="text-4xl font-light tracking-wide"
              style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
            >
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: "#808080" }}
            >
              PROJEKTOWANIE TO MOJA PRACA, ALE PRZEDE WSZYSTKIM PASJA...
              Specjalizuję się w projektowaniu i aranżacji wnętrz oraz przestrzeni zielonych.  
              Projektowanie przestrzeni to dla mnie nie tylko praca, ale także niesamowita zabawa, która wymaga wiedzy,
              zaangażowania i kreatywności.
            </p>
          </div>

          <div
            ref={(el) => {
              textBlocksRef.current[1] = el;
            }}
            className="space-y-6"
          >
            <h2 
              className="text-4xl font-light tracking-wide"
              style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
            >
              Założenia
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: "#808080" }}
            >
              Tworzę profesjonalne projekty wnętrz domów, mieszkań i apartamentów, a także ogrodów prywatnych i terenów zieleni publicznej. Zapewniam kompleksową obsługę – 
              od pierwszych szkiców po zarządzanie całym procesem realizacji projektu, aż do zakończenia inwestycji.
            </p>
          </div>

          <div
            ref={(el) => {
              textBlocksRef.current[2] = el;
            }}
            className="space-y-6"
          >
            <h2 
              className="text-4xl font-light tracking-wide"
              style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
            >
              Misja
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: "#808080" }}
            >
              Jestem architektem, projektantem, ale przede wszystkim wielką marzycielką! Razem możemy zrealizować Twoje marzenia i stworzyć przestrzeń o jakiej zawsze marzyłeś!
              Poznaj moją pracę i zobacz, jak mogę Ci pomóc w stworzeniu Twojej wymarzonej przestrzeni.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div
          ref={imageRef}
          className="aspect-[16/9] overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&q=80&auto=format"
            alt="Studio"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>
    </main>
  );
}
