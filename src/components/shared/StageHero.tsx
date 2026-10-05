"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { onPageReady } from "@/lib/animation/page-ready";
import { CinematicImage } from "@/components/ui/CinematicImage";
import type { CarImage } from "@/types/car";
import { fitText } from "@/lib/fit-text";

const longest = (lines: string[]) =>
  lines
    .join(" ")
    .split(" ")
    .reduce((a, b) => (b.length > a.length ? b : a), "");

interface StageHeroProps {
  eyebrow: string;
  lines: string[];
  lead: string;
  image: CarImage;
}

/** Full-bleed dark opener for editorial pages. */
export function StageHero({ eyebrow, lines, lead, image }: StageHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      let stop = () => {};
      mm.add(MQ.reduced, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.set(q("[data-intro]"), { autoAlpha: 1 })
          .from(q("[data-media]"), { scale: 1.25, duration: 2.4 })
          .from(q("[data-media]"), { opacity: 0, duration: 1.2, ease: "power2.out" }, 0)
          .from(q("[data-line]"), { yPercent: 115, duration: 1.3, stagger: 0.09 }, 0.35)
          .from(q("[data-fade]"), { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 0.8);
        stop = onPageReady(() => tl.play());

        gsap.to(q("[data-media-wrap]"), {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => {
        stop();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="stage grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-bg text-fg"
    >
      <div data-media-wrap className="absolute inset-0 -z-10">
        <div data-intro data-media className="absolute inset-0">
          <CinematicImage image={image} preload sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090a] via-[#09090a]/40 to-[#09090a]/50" />
      </div>
      <div className="container-x @container pt-32 pb-12 md:pb-16">
        <p data-intro data-fade className="t-meta mb-8">
          {eyebrow}
        </p>
        <h1
          className="t-display"
          aria-label={lines.join(" ")}
          style={{ fontSize: fitText(longest(lines), "clamp(2.75rem, 10.5vw, 11rem)") }}
        >
          {lines.map((l) => (
            <span key={l} aria-hidden="true" className="block overflow-hidden pb-[0.05em]">
              <span data-intro data-line className="block">
                {l}
              </span>
            </span>
          ))}
        </h1>
        <p data-intro data-fade className="t-lead mt-10 max-w-xl text-fg/85">
          {lead}
        </p>
      </div>
    </section>
  );
}
