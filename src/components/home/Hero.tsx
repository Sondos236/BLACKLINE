"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { onPageReady } from "@/lib/animation/page-ready";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Button } from "@/components/ui/Button";
import { cars, combinedHorsepower, formatSpec } from "@/data/cars";
import { fitText } from "@/lib/fit-text";

const heroImage = {
  src: "/images/site/hero.jpg",
  alt: "A black performance car in silhouette, its roofline traced by a single line of light",
  position: "50% 50%",
};

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      let stopWaiting = () => {};

      mm.add(MQ.reduced, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });

      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });

        tl.set(q("[data-intro]"), { autoAlpha: 1 })
          // 1. background
          .from(q("[data-hero-bg]"), { opacity: 0, duration: 1.2, ease: "power2.out" })
          // 2. car reveals through a horizontal slit
          .fromTo(
            q("[data-hero-media]"),
            { clipPath: "inset(48% 0% 48% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" },
            0.15,
          )
          .from(q("[data-hero-media] img"), { scale: 1.35, duration: 2.2 }, 0.15)
          // 3. headline rises line by line
          .from(q("[data-hero-line]"), { yPercent: 115, duration: 1.3, stagger: 0.09 }, 0.95)
          // 4. subtitle
          .from(q("[data-hero-sub]"), { autoAlpha: 0, y: 18, duration: 1 }, 1.35)
          // 5. CTAs
          .from(q("[data-hero-cta] > *"), { autoAlpha: 0, y: 22, duration: 1, stagger: 0.08 }, 1.5)
          // 6. metadata
          .from(q("[data-hero-meta]"), { autoAlpha: 0, y: 10, duration: 0.9, stagger: 0.05 }, 1.65);

        stopWaiting = onPageReady(() => tl.play());

        // Scroll-out: the car drifts and the type lifts away.
        gsap.to(q("[data-hero-media]"), {
          yPercent: 14,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q("[data-hero-copy]"), {
          yPercent: -18,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true },
        });
      });

      return () => {
        stopWaiting();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="stage grain relative isolate h-[100svh] min-h-[560px] overflow-hidden bg-bg text-fg">
      <div
        data-hero-bg
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_70%_40%,#1d1d20_0%,#09090a_60%)]"
      />

      <div data-intro data-hero-media className="absolute inset-0 -z-10 will-change-transform">
        <CinematicImage image={heroImage} preload quality={80} sizes="100vw" style={{ objectPosition: "62% 50%" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090a] via-[#09090a]/30 to-[#09090a]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090a]/70 via-transparent to-transparent" />
      </div>

      <div
        data-hero-copy
        className="container-x @container relative flex h-full flex-col justify-end pt-28 pb-8 sm:pb-12"
      >
        <div className="mb-auto flex items-start justify-between gap-6 pt-4">
          <p data-intro data-hero-meta className="t-meta">
            Digital showroom <span className="text-fg-subtle">/ Vol. 01</span>
          </p>
          <p data-intro data-hero-meta className="t-meta hidden text-right sm:block">
            {cars.length.toString().padStart(2, "0")} machines
            <br />
            <span className="text-fg-subtle">All black. No exceptions.</span>
          </p>
        </div>

        <h1
          className="t-display"
          aria-label="Built for the obsessed."
          style={{ fontSize: fitText("OBSESSED.", "clamp(2.75rem, 10.5vw, 11rem)") }}
        >
          <span className="block overflow-hidden pb-[0.04em]" aria-hidden="true">
            <span data-intro data-hero-line className="block">
              Built for
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
            <span data-intro data-hero-line className="block">
              the obsessed.
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p data-intro data-hero-sub className="t-lead max-w-md text-fg md:col-span-5">
            Five machines. One obsession with performance.
          </p>
          <div data-hero-cta className="flex flex-wrap gap-3 md:col-span-7 md:justify-end">
            <Button href="/cars" data-intro>
              Explore Collection
            </Button>
            <Button href="/experience" variant="outline" data-intro>
              Discover the Experience
            </Button>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-line pt-5 md:mt-14">
          <p data-intro data-hero-meta className="t-meta flex items-center gap-2">
            <ArrowDown className="size-3.5 animate-bounce" strokeWidth={1.5} aria-hidden="true" />
            Scroll to enter
          </p>
          <p data-intro data-hero-meta className="t-meta">
            <span className="text-fg">{formatSpec(combinedHorsepower)}</span> hp combined
          </p>
        </div>
      </div>
    </section>
  );
}
