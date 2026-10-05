"use client";

import Link from "next/link";
import { useReveals } from "@/hooks/useReveals";
import { CountUp } from "@/components/ui/CountUp";
import type { Car } from "@/types/car";

/** One engineering fact per car — drawn from the published specification. */
const facts: Record<string, { value: number; unit: string; decimals?: number; title: string; text: string }> = {
  "lamborghini-revuelto": {
    value: 3,
    unit: "motors",
    title: "A V12 with company",
    text: "Two electric motors drive the front axle and a third sits on the gearbox, working with a naturally aspirated 6.5-litre V12.",
  },
  "dodge-charger-srt-hellcat": {
    value: 2.4,
    unit: "L",
    decimals: 1,
    title: "Supercharger displacement",
    text: "A 2.4-litre supercharger sits on top of the 6.2-litre HEMI — the source of the whine, and most of the 717 hp.",
  },
  "bmw-m3-competition": {
    value: 10,
    unit: "stages",
    title: "Traction, dialled in",
    text: "M Traction Control lets the driver set exactly how much slip the M3 allows, one click at a time.",
  },
  "audi-rs7": {
    value: 48,
    unit: "volts",
    title: "Hybrid assistance",
    text: "A 48-volt mild-hybrid system lets the twin-turbo V8 coast and shut down four cylinders under light load.",
  },
  "bmw-m5-competition": {
    value: 7,
    unit: "mm",
    title: "Lower than an M5",
    text: "Competition models sit 7 mm lower, on stiffer engine mounts and retuned suspension, than the standard car.",
  },
};

export function TechChapter({ cars }: { cars: Car[] }) {
  const ref = useReveals<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby="chapter-03" className="border-y border-line bg-bg-elev py-24 md:py-40">
      <div className="container-x grid gap-16 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <p className="t-meta mb-8 flex items-center gap-3" data-reveal="fade">
              <span className="text-fg">03</span>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              Technology
            </p>
            <h2 id="chapter-03" className="t-heading t-heading-narrow" data-reveal="lines">
              Engineering without compromise.
            </h2>
            <p className="t-lead mt-8 max-w-md" data-reveal="up">
              Behind every number is a decision someone refused to water down. Five of them, one per machine.
            </p>
          </div>
        </div>

        <ol className="md:col-span-7">
          {cars.map((car) => {
            const f = facts[car.slug];
            if (!f) return null;
            return (
              <li
                key={car.slug}
                className="border-t border-line py-10 first:border-t-0 first:pt-0 md:py-14"
                data-reveal="up"
              >
                <p className="t-meta mb-4">
                  <Link href={`/cars/${car.slug}`} className="link-underline hover:text-fg">
                    {car.fullName.replace(" Widebody", "")}
                  </Link>
                </p>
                <p className="t-num text-[clamp(4rem,11vw,9rem)]">
                  <CountUp value={f.value} decimals={f.decimals} />
                  <span className="ml-3 text-[0.2em] font-medium tracking-[0.1em] text-fg-muted uppercase">
                    {f.unit}
                  </span>
                </p>
                <h3 className="t-title mt-6">{f.title}</h3>
                <p className="t-body mt-3 max-w-md">{f.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
