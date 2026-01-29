"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/contexts/ThemeContext";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { theme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fillCircleRefs = useRef<(SVGCircleElement | null)[]>([]);
  const clipPathRefs = useRef<(SVGPathElement | null)[]>([]);

  // Helper function to create path for circle sector
  const createSectorPath = (angle: number, clockwise: boolean = true) => {
    const centerX = 100;
    const centerY = 100;
    const radius = 95;
    const startAngle = -90; // Start from top (12 o'clock)
    const endAngle = startAngle + (clockwise ? angle : -angle);
    
    const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    const sweepFlag = clockwise ? 1 : 0;
    
    return `M ${centerX},${centerY} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},${sweepFlag} ${endX},${endY} Z`;
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Kinetic Typography - Text Reveal Animation (faster, only once)
      if (heroTitleRef.current) {
        const words = heroTitleRef.current.textContent?.split(" ") || [];
        heroTitleRef.current.innerHTML = words
          .map(
            (word) =>
              `<span style="display: inline-block; overflow: hidden;"><span style="display: inline-block; transform: translateY(100%);">${word}</span></span>`
          )
          .join(" ");

        const wordSpans = heroTitleRef.current.querySelectorAll("span > span");

        gsap.to(wordSpans, {
          y: 0,
          duration: 1.5,
          stagger: 0.03,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      // Subtle Parallax Effect for Hero Image – scrub łagodniejszy
      if (heroImageRef.current && heroRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // Image Reveal on Scroll – dłuższe wykonanie animacji
      imageRefs.current.forEach((imageRef) => {
        if (imageRef) {
          gsap.from(imageRef, {
            y: 60,
            opacity: 0,
            duration: 1.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef,
              start: "top 85%",
              once: true,
            },
          });
        }
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax Background Image */}
        <div
          ref={heroImageRef}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80&auto=format)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "grayscale(100%)",
          }}
        />

        {/* Hero Title - Kinetic Typography */}
        <div className="relative z-10 flex flex-col gap-4 items-center text-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <h2 
              className="text-lg md:text-xl font-light tracking-widest uppercase text-left"
              style={{ color: "#808080" }}
            >
              Patrycja Owczarek
            </h2>
          </div>
          <h1
            ref={heroTitleRef}
            className="text-7xl md:text-9xl font-light tracking-wider"
            style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
          >
            Pracownia Architektury
          </h1>
        </div>
      </section>

      {/* Content Section with Image Reveals */}
      <section
        ref={contentSectionRef}
        className="max-w-7xl mx-auto px-8 py-32 space-y-32 bg-transparent"
      >
        {/* Text Block */}
        <div className="space-y-8">
          <h2 
            className="text-5xl font-light tracking-wide"
            style={{ color: theme === "dark" ? "#FDFDFD" : "#121212" }}
          >
            Tworzenie wymarzonych przestrzeni
          </h2>
          <p 
            className="text-xl leading-relaxed max-w-3xl"
            style={{ color: "#808080" }}
          >
          Tworzę profesjonalne projekty wnętrz domów, mieszkań i apartamentów, a także ogrodów prywatnych i terenów zieleni publicznej. Moim celem jest przekształcenie każdej przestrzeni w wyjątkowe miejsce pełne życia. Oferuję zarówno koncepcyjne projekty, jak i szczegółową dokumentację wykonawczą. Zapewniam kompleksową obsługę –
           od pierwszych szkiców po zarządzanie całym procesem realizacji projektu, aż do zakończenia inwestycji. 
          </p>
        </div>

        {/* Image Grid with Reveal Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            ref={(el) => {
              imageRefs.current[0] = el;
            }}
            className="aspect-[4/3] overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&auto=format"
              alt="Project 1"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
          <div
            ref={(el) => {
              imageRefs.current[1] = el;
            }}
            className="aspect-[4/3] overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&q=80&auto=format"
              alt="Project 2"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>

        {/* Additional Content */}
        <div className="space-y-8 pt-16">
          <p 
            className="text-lg leading-relaxed max-w-3xl"
            style={{ color: "#808080" }}
          >
            Każdy projekt to szansa na odkrycie nowych kreatywnych obszarów. 
            Wierzę w moc ruchu do opowiadania historii i wywoływania emocji.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-12 pt-16 justify-center items-center">
          <Link
            href="/oferta"
            className="group relative w-48 h-48 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{
              color: theme === "dark" ? "#FDFDFD" : "#121212",
            }}
            onMouseEnter={() => {
              if (clipPathRefs.current[0]) {
                const angleObj = { angle: 0 };
                gsap.to(angleObj, {
                  angle: 360,
                  duration: 0.95,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (clipPathRefs.current[0]) {
                      clipPathRefs.current[0].setAttribute("d", createSectorPath(angleObj.angle, true));
                    }
                  },
                });
              }
            }}
            onMouseLeave={() => {
              if (clipPathRefs.current[0]) {
                const angleObj = { angle: 360 };
                gsap.to(angleObj, {
                  angle: 0,
                  duration: 0.95,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (clipPathRefs.current[0]) {
                      clipPathRefs.current[0].setAttribute("d", createSectorPath(angleObj.angle, true));
                    }
                  },
                });
              }
            }}
          >
            {/* SVG Circle - Clockwise Animation (right) */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
            >
              <defs>
                <clipPath id="clip-circle-1">
                  <path
                    ref={(el) => {
                      clipPathRefs.current[0] = el;
                    }}
                    d={createSectorPath(0, true)}
                  />
                </clipPath>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke={theme === "dark" ? "#808080" : "#808080"}
                strokeWidth="2"
              />
              <circle
                ref={(el) => {
                  fillCircleRefs.current[0] = el;
                }}
                cx="100"
                cy="100"
                r="95"
                fill={theme === "dark" ? "#121212" : "#FDFDFD"}
                clipPath="url(#clip-circle-1)"
              />
            </svg>
            <span className="text-sm font-light tracking-wide text-center px-4 z-10 relative">
              Zapoznaj się z ofertą
            </span>
          </Link>
          <Link
            href="/projects"
            className="group relative w-48 h-48 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{
              color: theme === "dark" ? "#FDFDFD" : "#121212",
            }}
            onMouseEnter={() => {
              if (clipPathRefs.current[1]) {
                const angleObj = { angle: 0 };
                gsap.to(angleObj, {
                  angle: 360,
                  duration: 0.95,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (clipPathRefs.current[1]) {
                      clipPathRefs.current[1].setAttribute("d", createSectorPath(angleObj.angle, false));
                    }
                  },
                });
              }
            }}
            onMouseLeave={() => {
              if (clipPathRefs.current[1]) {
                const angleObj = { angle: 360 };
                gsap.to(angleObj, {
                  angle: 0,
                  duration: 0.95,
                  ease: "power2.out",
                  onUpdate: () => {
                    if (clipPathRefs.current[1]) {
                      clipPathRefs.current[1].setAttribute("d", createSectorPath(angleObj.angle, false));
                    }
                  },
                });
              }
            }}
          >
            {/* SVG Circle - Counter-clockwise Animation (left) */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 200 200"
            >
              <defs>
                <clipPath id="clip-circle-2">
                  <path
                    ref={(el) => {
                      clipPathRefs.current[1] = el;
                    }}
                    d={createSectorPath(0, false)}
                  />
                </clipPath>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke={theme === "dark" ? "#808080" : "#808080"}
                strokeWidth="2"
              />
              <circle
                ref={(el) => {
                  fillCircleRefs.current[1] = el;
                }}
                cx="100"
                cy="100"
                r="95"
                fill={theme === "dark" ? "#121212" : "#FDFDFD"}
                clipPath="url(#clip-circle-2)"
              />
            </svg>
            <span className="text-sm font-light tracking-wide text-center px-4 z-10 relative">
              Zapoznaj się z projektami
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
