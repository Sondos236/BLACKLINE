"use client";

import { useRef } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { initReveals } from "@/lib/animation/reveals";
import { CountUp } from "@/components/ui/CountUp";
import { cars, combinedHorsepower } from "@/data/cars";

const quickest = Math.min(...cars.map((c) => c.acceleration.value));
const fastest = Math.max(...cars.map((c) => c.topSpeed.value));

const stats = [
  { value: cars.length, label: "Machines", suffix: "" },
  { value: combinedHorsepower, label: "Combined horsepower", suffix: "hp" },
  { value: quickest, label: "Quickest 0–100 km/h", suffix: "s", decimals: 1 },
  { value: fastest, label: "Highest top speed", suffix: "km/h", prefix: "350+" },
];

/** Opening statement: words brighten as they scroll through the viewport. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const reveals = initReveals(root.current);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const split = SplitText.create("[data-manifesto]", { type: "words", wordsClass: "manifesto-word" });
        gsap.fromTo(
          split.words,
          { opacity: 0.14 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-manifesto]", start: "top 80%", end: "bottom 45%", scrub: true },
          },
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
    <section ref={root} aria-labelledby="manifesto-title" className="container-x py-28 md:py-44">
      <div className="grid gap-10 lg:grid-cols-12">
        <p className="t-meta lg:col-span-3" data-reveal="fade">
          <span className="text-fg">01</span> — Manifesto
        </p>
        <div className="lg:col-span-9">
          <h2 id="manifesto-title" className="sr-only">
            The BLACKLINE manifesto
          </h2>
          <p
            data-manifesto
            className="font-display text-[clamp(1.75rem,4.4vw,4.25rem)] leading-[1.04] font-medium tracking-[-0.03em] [font-variation-settings:'wdth'_108]"
          >
            Five machines. Five philosophies of speed. One colour — because when the paint goes dark, all that remains
            is shape, sound and the numbers that matter.
          </p>
        </div>
      </div>

      <dl className="mt-24 grid grid-cols-2 border-t border-line md:mt-36 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-reveal="up"
            data-reveal-delay={String(i * 0.08)}
            className="flex flex-col border-b border-line py-8 pr-4 odd:border-r odd:pr-4 even:pl-4 lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0"
          >
            <dt className="t-meta order-2 mt-4">{s.label}</dt>
            <dd className="t-num order-1 text-[clamp(2.5rem,6vw,5.5rem)]">
              {s.prefix ? s.prefix : <CountUp value={s.value} decimals={s.decimals} />}
              {s.suffix && <span className="ml-1 text-[0.32em] tracking-normal text-fg-muted">{s.suffix}</span>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
