"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { initReveals } from "@/lib/animation/reveals";
import { CinematicImage } from "@/components/ui/CinematicImage";
import type { CarImage } from "@/types/car";

interface MaskChapterProps {
  index: string;
  label: string;
  quote: string;
  body: string;
  image: CarImage;
  details: { title: string; text: string }[];
}

/** A small window onto the car that opens to full-bleed as you scroll. */
export function MaskChapter({ index, label, quote, body, image, details }: MaskChapterProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const reveals = initReveals(root.current);
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: q("[data-mask-wrap]")[0], start: "top 85%", end: "center 45%", scrub: 0.6 },
          })
          .fromTo(
            q("[data-mask]"),
            { clipPath: "inset(22% 30% 22% 30%)" },
            { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
          )
          .fromTo(q("[data-mask] img"), { scale: 1.4 }, { scale: 1, ease: "none" }, 0)
          .fromTo(
            q("[data-mask-word]"),
            { letterSpacing: "0.3em", opacity: 0 },
            { letterSpacing: "-0.04em", opacity: 1, ease: "none" },
            0.2,
          );
      });
      return () => {
        reveals.revert();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby={`chapter-${index}`} className="py-24 md:py-40">
      <div className="container-x grid gap-10 md:grid-cols-12">
        <p className="t-meta flex items-center gap-3 md:col-span-3" data-reveal="fade">
          <span className="text-fg">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          {label}
        </p>
        <div className="md:col-span-9">
          <h2 id={`chapter-${index}`} className="t-heading" data-reveal="lines">
            {quote}
          </h2>
          <p className="t-lead mt-8 max-w-xl" data-reveal="up">
            {body}
          </p>
        </div>
      </div>

      <div data-mask-wrap className="stage relative mt-16 md:mt-24">
        <div data-mask className="relative h-[70svh] overflow-hidden bg-bg md:h-[100svh]">
          <CinematicImage image={image} sizes="100vw" />
          <div className="absolute inset-0 bg-[#09090a]/35" />
          <p
            data-mask-word
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[6%] text-center font-display text-[clamp(3rem,15vw,15rem)] leading-none font-bold text-[#ededec] uppercase [font-variation-settings:'wdth'_125]"
          >
            Line
          </p>
        </div>
      </div>

      <ul className="container-x mt-16 grid gap-10 sm:grid-cols-3 md:mt-24">
        {details.map((d, i) => (
          <li key={d.title} className="border-t border-line pt-6" data-reveal="up" data-reveal-delay={String(i * 0.08)}>
            <h3 className="t-title">{d.title}</h3>
            <p className="t-body mt-3">{d.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
