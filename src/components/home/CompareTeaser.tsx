"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { initReveals } from "@/lib/animation/reveals";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import type { Car } from "@/types/car";

/** Horsepower, drawn as hairlines that extend as the section enters. */
export function CompareTeaser({ cars }: { cars: Car[] }) {
  const root = useRef<HTMLElement>(null);
  const max = Math.max(...cars.map((c) => c.horsepower.value));
  const ranked = [...cars].sort((a, b) => b.horsepower.value - a.horsepower.value);

  useGSAP(
    () => {
      if (!root.current) return;
      const reveals = initReveals(root.current);
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from("[data-bar]", {
          scaleX: 0,
          duration: 1.8,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-bars]", start: "top 80%", once: true },
        });
      });
      return () => {
        reveals.revert();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="compare-teaser-title"
      className="border-t border-line bg-bg-elev py-24 md:py-36"
    >
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Compare"
          title={<span id="compare-teaser-title">Numbers, side by side.</span>}
          lead="Put up to three machines head to head — power, torque, acceleration, top speed, weight and the engineering behind them."
          align="split"
        />

        <ul data-bars className="mt-16 md:mt-24" aria-label="Horsepower by model">
          {ranked.map((car) => (
            <li
              key={car.slug}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-6 border-b border-line py-5 md:grid-cols-[14rem_minmax(0,1fr)_7rem]"
            >
              <span className="text-sm text-fg md:text-base">
                {car.brand} <span className="text-fg-muted">{car.model}</span>
              </span>
              <span className="order-3 col-span-2 mt-3 block h-px bg-line md:order-none md:col-span-1 md:mt-0 md:self-center">
                <span
                  data-bar
                  className="block h-[3px] origin-left -translate-y-px bg-fg"
                  style={{ width: `${(car.horsepower.value / max) * 100}%` }}
                />
              </span>
              <span className="t-num text-right text-2xl md:text-3xl">
                <CountUp value={car.horsepower.value} />
                <span className="ml-1 text-xs tracking-normal text-fg-muted">hp</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12" data-reveal="up">
          <Button href="/compare">Open Compare</Button>
        </div>
      </div>
    </section>
  );
}
