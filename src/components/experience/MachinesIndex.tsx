"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useReveals } from "@/hooks/useReveals";
import { imageManifest } from "@/data/image-manifest";
import type { Car } from "@/types/car";
import { cn } from "@/lib/cn";

/**
 * Index of the five machines. On fine pointers, a preview of the hovered car
 * follows the cursor; on touch, each row carries its own thumbnail.
 */
export function MachinesIndex({ cars }: { cars: Car[] }) {
  const ref = useReveals<HTMLElement>();
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = previewRef.current;
    const list = ref.current?.querySelector("[data-list]");
    if (!el || !list) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const move = (e: Event) => {
      const p = e as PointerEvent;
      xTo(p.clientX);
      yTo(p.clientY);
    };
    list.addEventListener("pointermove", move);
    return () => list.removeEventListener("pointermove", move);
  }, [ref]);

  return (
    <section ref={ref} aria-labelledby="machines-title" className="container-x py-24 md:py-40">
      <div className="grid gap-8 md:grid-cols-12">
        <p className="t-meta flex items-center gap-3 md:col-span-3" data-reveal="fade">
          <span className="text-fg">04</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          The machines
        </p>
        <div className="md:col-span-9">
          <h2 id="machines-title" className="t-heading" data-reveal="lines">
            Five answers to one question.
          </h2>
          <p className="t-lead mt-8 max-w-xl" data-reveal="up">
            What happens when engineers are told that fast isn&apos;t enough? Germany, America and Italy each replied in
            their own accent.
          </p>
        </div>
      </div>

      <ol data-list className="mt-16 border-t border-line md:mt-24" onPointerLeave={() => setActive(null)}>
        {cars.map((car, i) => (
          <li key={car.slug} data-reveal="up" data-reveal-delay={String(i * 0.05)} className="border-b border-line">
            <Link
              href={`/cars/${car.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-6 sm:gap-8 md:py-9"
            >
              <span className="relative aspect-square w-16 overflow-hidden bg-surface sm:w-20 md:hidden">
                <Image
                  src={car.images.hero.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                  style={{ objectPosition: car.images.hero.position }}
                />
              </span>
              <span className="t-meta hidden w-10 md:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span
                  className={cn(
                    "block font-display text-[clamp(1.5rem,6vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] uppercase transition-[transform,color] duration-700 ease-out-expo [font-variation-settings:'wdth'_115] group-hover:translate-x-3 md:group-hover:translate-x-6",
                    active !== null && active !== i ? "md:text-fg-subtle" : "text-fg",
                  )}
                >
                  {car.shortName}
                </span>
                <span className="mt-2 block truncate text-sm text-fg-muted">
                  {car.brand} — {car.tagline}
                </span>
              </span>
              <span className="flex items-center gap-6">
                <span className="t-meta hidden lg:block">{car.engineShort}</span>
                <span className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover:bg-invert-bg group-hover:text-invert-fg">
                  <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {/* Cursor-following preview (fine pointers only, hidden from AT) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden [@media(pointer:fine)]:md:block"
      >
        <div
          className={cn(
            "relative -translate-x-1/2 -translate-y-1/2 transition-[opacity,scale] duration-500 ease-out-expo",
            active === null ? "scale-75 opacity-0" : "scale-100 opacity-100",
          )}
        >
          <div className="relative aspect-[4/5] w-[19rem] overflow-hidden bg-surface">
            {cars.map((car, i) => (
              <Image
                key={car.slug}
                src={car.images.hero.src}
                alt=""
                fill
                sizes="304px"
                placeholder="blur"
                blurDataURL={imageManifest[car.images.hero.src]?.blurDataURL}
                className={cn(
                  "object-cover transition-[opacity,transform] duration-700 ease-out-expo",
                  active === i ? "scale-100 opacity-100" : "scale-110 opacity-0",
                )}
                style={{ objectPosition: car.images.hero.position }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
