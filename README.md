# Motion Design Studio

Luxury minimalist Next.js application with smooth animations and interactions.

## Features

- **Smooth Scroll**: Integrated Lenis for fluid scrolling experience
- **Page Transitions**: GSAP-powered transitions between pages
- **Kinetic Typography**: Text reveal animations on the homepage
- **Parallax Effects**: Subtle parallax scrolling for hero images
- **Image Reveals**: Scroll-triggered image animations
- **Bento Grid**: Responsive project grid layout
- **Custom Cursor**: Magnetic cursor with blend mode effects
- **Hover Interactions**: Smooth hover effects on interactive elements

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GSAP with ScrollTrigger
- Lenis (Smooth Scroll)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with global components
│   ├── page.tsx            # Home page
│   ├── projects/
│   │   └── page.tsx        # Projects page
│   ├── about/
│   │   └── page.tsx        # About page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── SmoothScroll.tsx    # Lenis smooth scroll wrapper
│   ├── PageTransition.tsx  # Page transition animations
│   └── CustomCursor.tsx    # Custom cursor component
└── package.json
```

## Design System

- **Background**: `#121212`
- **Foreground/Text**: `#FDFDFD`
- **Accents**: `#808080`

## Notes

- Images are using Unsplash placeholders. Replace with your own images.
- All animations are optimized for performance using GSAP.
- The custom cursor is disabled on mobile devices (handled by CSS).
