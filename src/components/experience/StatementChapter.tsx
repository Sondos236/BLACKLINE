"use client";

import { useRef } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { CinematicImage } from "@/components/ui/CinematicImage";
import type { CarImage } from "@/types/car";

interface StatementChapterProps {
  index: string;
  label: string;
  quote: string;
  body: string;
  image: CarImage;
}

/**
 * Pinned chapter: the image settles from a push-in while the quote's words
 * light up one by one, then the supporting copy arrives.
 */
export function StatementChapter({ index, label, quote, body, image }: StatementChapterProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create(q("[data-quote]"), { type: "words" });
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: isDesktop ? "top top" : "top 70%",
            end: isDesktop ? "+=140%" : "bottom 60%",
            pin: isDesktop,
            scrub: 0.6,
          },
        });
        tl.fromTo(q("[data-img]"), { scale: 1.3 }, { scale: 1, ease: "none", duration: 1 }, 0)
          .fromTo(q("[data-shade]"), { opacity: 0.35 }, { opacity: 0.75, ease: "none", duration: 1 }, 0)
          .fromTo(split.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.06, ease: "none", duration: 0.3 }, 0.05)
          .from(q("[data-body]"), { autoAlpha: 0, y: 30, duration: 0.25, ease: "power2.out" }, 0.75);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby={`chapter-${index}`}
      className="stage relative isolate flex min-h-[100svh] items-center overflow-hidden bg-bg text-fg"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-img className="absolute inset-0">
          <CinematicImage image={image} sizes="100vw" />
        </div>
        <div data-shade className="absolute inset-0 bg-[#09090a] opacity-60" />
      </div>
      <div className="container-x py-28">
        <p className="t-meta mb-10 flex items-center gap-3">
          <span className="text-fg">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {label}
        </p>
        <h2
          id={`chapter-${index}`}
          data-quote
          className="max-w-[18ch] font-display text-[clamp(2.5rem,7.4vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.035em] uppercase [font-variation-settings:'wdth'_115]"
        >
          {quote}
        </h2>
        <p data-body className="t-lead mt-12 max-w-lg text-fg/80 md:ml-[40%]">
          {body}
        </p>
      </div>
    </section>
  );
}
