"use client";

import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { onPageReady } from "@/lib/animation/page-ready";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { formatSpec } from "@/data/cars";
import { fitText } from "@/lib/fit-text";
import type { Car } from "@/types/car";

export function CarHero({ car, index, total }: { car: Car; index: number; total: number }) {
  const root = useRef<HTMLElement>(null);
  const stats = [
    { label: "Power", spec: car.horsepower },
    { label: "Torque", spec: car.torque },
    { label: "0–100 km/h", spec: car.acceleration },
    { label: "Top speed", spec: car.topSpeed },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      let stop = () => {};

      mm.add(MQ.reduced, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });

      mm.add(MQ.motion, () => {
        const split = SplitText.create(q("[data-name]"), { type: "chars", mask: "chars" });
        const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
        tl.set(q("[data-intro]"), { autoAlpha: 1 })
          .fromTo(
            q("[data-media]"),
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
          )
          .from(q("[data-media] img"), { scale: 1.3, duration: 2.2 }, 0)
          .from(split.chars, { yPercent: 110, duration: 1.2, stagger: 0.035 }, 0.7)
          .from(q("[data-fade]"), { autoAlpha: 0, y: 14, duration: 0.9, stagger: 0.06 }, 1)
          .from(q("[data-stat]"), { autoAlpha: 0, y: 24, duration: 1, stagger: 0.07 }, 1.1);

        q<HTMLElement>("[data-count]").forEach((el) => {
          const to = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const s = { v: 0 };
          el.textContent = formatSpec(0, decimals);
          tl.to(
            s,
            { v: to, duration: 1.6, ease: "power3.out", onUpdate: () => (el.textContent = formatSpec(s.v, decimals)) },
            1.15,
          );
        });

        stop = onPageReady(() => tl.play());

        gsap.to(q("[data-media]"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(q("[data-name]"), {
          yPercent: -30,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return () => {
        stop();
        mm.revert();
      };
    },
    { scope: root, dependencies: [car.slug] },
  );

  return (
    <section
      ref={root}
      className="stage grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-bg text-fg"
    >
      <div data-intro data-media className="absolute inset-0 -z-10 will-change-transform">
        <CinematicImage image={car.images.hero} preload sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090a] via-[#09090a]/35 to-[#09090a]/30" />
      </div>

      <div className="container-x pt-28 pb-8 md:pb-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p data-intro data-fade className="t-meta flex items-center gap-3">
            <span className="text-fg">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-fg-subtle">/ {String(total).padStart(2, "0")}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span className="text-fg">{car.brand}</span>
          </p>
          <p data-intro data-fade className="t-meta">
            {car.generation}
          </p>
        </div>

        <h1 className="sr-only">{car.fullName}</h1>
        <div className="@container">
          <p
            data-intro
            data-name
            aria-hidden="true"
            className="t-display -ml-[0.04em] leading-[0.82] whitespace-nowrap"
            style={{ fontSize: fitText(car.shortName, "17rem") }}
          >
            {car.shortName}
          </p>
        </div>

        <div className="mt-6 grid gap-8 md:mt-10 md:grid-cols-12 md:items-end">
          <p data-intro data-fade className="t-lead text-fg md:col-span-4">
            {car.tagline}
          </p>
          <dl className="grid grid-cols-2 gap-y-6 border-t border-line-strong pt-5 sm:grid-cols-4 md:col-span-8">
            {stats.map(({ label, spec }) => (
              <div key={label} data-intro data-stat className="flex flex-col pr-3">
                <dt className="t-meta order-2 mt-2">{label}</dt>
                <dd className="t-num order-1 text-[clamp(1.75rem,3.2vw,3rem)]">
                  {spec.approx && <span className="text-fg-muted">≈</span>}
                  <span data-count={spec.value} data-decimals={spec.decimals ?? 0}>
                    {formatSpec(spec.value, spec.decimals)}
                  </span>
                  <span className="ml-1 text-[0.36em] tracking-normal text-fg-muted">{spec.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p data-intro data-fade className="t-meta mt-10 flex items-center gap-2">
          <ArrowDown className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          {car.engine}
        </p>
      </div>
    </section>
  );
}
