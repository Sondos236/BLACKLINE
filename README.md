# BLACKLINE

A cinematic digital showroom for five black performance cars, built as a frontend portfolio piece. The cars are the Audi RS7, BMW M5 Competition, BMW M3 Competition, Dodge Charger SRT Hellcat and Lamborghini Revuelto.

BLACKLINE is a fictional concept. It is not a dealer or manufacturer, and nothing on it is for sale.

## Stack

- **Next.js 16** (App Router, fully static output), **TypeScript**, **Tailwind CSS v4**
- **GSAP + ScrollTrigger + SplitText** for scroll choreography, intros, counters, pinning and horizontal scrolling
- **Framer Motion** for interface moments: modal, dropdown, mobile menu, theme icon, compare add/remove
- **Lucide React** for icons

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerendered)
npm run typecheck
npm run lint
npm run format
```

## Routes

| Route           | What it is                                                                    |
| --------------- | ----------------------------------------------------------------------------- |
| `/`             | Hero intro, manifesto, the pinned five-car campaign sequence, teasers, CTA    |
| `/cars`         | Editorial collection with large hover cards                                   |
| `/cars/[slug]`  | Per-car campaign: hero, performance, design, technology, gallery, CTA, next   |
| `/compare`      | Compare up to three cars. The selection lives in the URL (`?cars=a,b,c`)      |
| `/experience`   | Storytelling page: pinned statement, scroll mask, tech facts, machines index  |
| `/about`        | Philosophy, design, performance, technology, colophon                         |

## Architecture

```
src/
  app/                 routes, metadata, not-found
  components/
    layout/            Navbar, MobileMenu, ThemeToggle, Footer, Cursor, Logo
    providers/         ThemeProvider, PageTransition, TestDriveProvider
    home/              Hero, Manifesto, CarShowcase, ScrollType, teasers
    cars/              CarCard, PerformanceStats
    car-detail/        CarHero, PerformanceSection, DesignSection, TechnologySection, CarGallery, NextCar
    compare/           CompareExperience, CompareSelector, CompareTable
    experience/        StatementChapter, MaskChapter, TechChapter, MachinesIndex
    test-drive/        TestDriveModal (lazy-loaded)
    shared/ ui/        Button, Select, CountUp, Reveal, SectionHeading, StageHero, PageHeader, FinalCta…
  data/                cars.ts (single source of truth), navigation, site, image-manifest (generated)
  hooks/               useReveals, useMagnetic, useDialog
  lib/                 gsap registration, reveal system, page-ready sync, fit-text, mock API
  types/               Car, Spec, CarImage…
```

### Data layer

All vehicle content lives in `src/data/cars.ts`, typed by the `Car` interface in `src/types/car.ts`. Every page reads it through the helpers `getAllCars`, `getCarBySlug` and `getAdjacentCar`, so swapping in a real API only touches that module.

Figures follow manufacturer-published data where it exists. Approximate or independently tested values carry `approx: true` and show a `≈`. Optional-package figures, such as unlimited top speeds, carry a `note` that appears as a footnote.

### Animation system

- **Declarative reveals.** Mark elements with `data-reveal="up" | "fade" | "lines" | "image" | "scale"` and `data-parallax="12"`. `useReveals()`, or the `<Reveal>` wrapper for server components, activates them inside `useGSAP`, so everything reverts on unmount.
- **Intros wait for route transitions.** `PageTransition` covers the outgoing page, navigates, then reveals. Intro timelines call `onPageReady()` so they play when the page is actually visible.
- **`gsap.matchMedia`** splits behaviour into three cases: pinned desktop choreography, lighter mobile reveals, and nothing hidden or moving under `prefers-reduced-motion`.
- **`fitText()`** sizes oversized display words with container-query units, so names like "REVUELTO" fill but never overflow their column, from 320px up.

### Theming

Dark is the default. Light is a separately designed palette, not an inversion. Colours are CSS tokens on `[data-theme]`. Image "stages" (heroes, gallery, CTAs) stay dark in both themes through the `.stage` class. The theme is applied by an inline script before paint, so there's no flash, and it's persisted in `localStorage`. Switching uses a View Transitions circular reveal, with a colour-fade fallback.

## Test drive form

The test-drive form is frontend-only: `src/lib/api/test-drive.ts` simulates a request. To preview the **error state**, submit with an email ending in `@fail.test`.

## Imagery

Photos come from Unsplash contributors under the Unsplash License. `npm run images` (`scripts/fetch-images.mjs`) downloads them, applies one monochrome "stealth" grade with `sharp` so every car shares a visual language, and regenerates `src/data/image-manifest.ts` with dimensions and blur placeholders.

Audi, BMW, Dodge, SRT, Hellcat and Lamborghini are trademarks of their respective owners. This project is not affiliated with or endorsed by any of them.
