"use client";

import { useReveals } from "@/hooks/useReveals";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Button } from "@/components/ui/Button";
import type { CarImage } from "@/types/car";

const pillars = [
  { n: "01", title: "Performance", line: "Not a number. A feeling." },
  { n: "02", title: "Design", line: "Every line has a purpose." },
  { n: "03", title: "Technology", line: "Engineering without compromise." },
];

export function ExperienceTeaser({ image, detail }: { image: CarImage; detail: CarImage }) {
  const ref = useReveals<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby="exp-teaser-title" className="container-x py-24 md:py-40">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-7">
          <div
            data-reveal="image"
            data-cursor="Experience"
            className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[5/4]"
          >
            <div data-parallax="14" className="absolute inset-x-0 -inset-y-[8%]">
              <CinematicImage image={image} sizes="(min-width: 1024px) 58vw, 100vw" />
            </div>
          </div>
          <div
            data-reveal="image"
            data-reveal-delay="0.25"
            className="absolute right-4 -bottom-10 hidden aspect-[3/4] w-[32%] overflow-hidden border-[6px] border-bg bg-surface md:block lg:-right-12"
          >
            <CinematicImage image={detail} sizes="20vw" />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-12 lg:col-span-5 lg:pl-8">
          <div>
            <p className="t-meta mb-6" data-reveal="fade">
              <span className="text-fg">03</span> — The experience
            </p>
            <h2 id="exp-teaser-title" className="t-heading t-heading-narrow" data-reveal="lines">
              Performance is a feeling.
            </h2>
            <p className="t-lead mt-6" data-reveal="up">
              BLACKLINE isn&apos;t a catalogue. It&apos;s a slow walk around five cars that were each built by people
              who couldn&apos;t leave well enough alone.
            </p>
          </div>

          <ol className="border-t border-line">
            {pillars.map((p, i) => (
              <li
                key={p.n}
                data-reveal="up"
                data-reveal-delay={String(i * 0.08)}
                className="group flex items-baseline gap-5 border-b border-line py-5"
              >
                <span className="t-meta">{p.n}</span>
                <span className="t-title transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                  {p.title}
                </span>
                <span className="ml-auto hidden text-right text-sm text-fg-muted sm:block">{p.line}</span>
              </li>
            ))}
          </ol>

          <div data-reveal="up">
            <Button href="/experience" variant="outline">
              Discover the Experience
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
