"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Button } from "@/components/ui/Button";
import { formatSpec } from "@/data/cars";
import { fitText } from "@/lib/fit-text";
import type { Car } from "@/types/car";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * The five cars as a campaign sequence.
 * Desktop: one pinned stage; each scroll step wipes the next car in through a
 * clip-path, pushes the previous one back, swaps the copy and re-counts specs.
 * Mobile / reduced motion: the same panels flow vertically with lighter reveals.
 */
export function CarShowcase({ cars }: { cars: Car[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const panels = q<HTMLElement>("[data-panel]");
      const mm = gsap.matchMedia();

      const countTo = (el: HTMLElement, from: number, to: number) => {
        const decimals = Number(el.dataset.decimals ?? 0);
        const s = { v: from };
        return gsap.fromTo(
          s,
          { v: from },
          {
            v: to,
            ease: "power2.out",
            duration: 0.9,
            onUpdate: () => (el.textContent = formatSpec(s.v, decimals)),
          },
        );
      };

      /* ---------------------------------------------------- desktop: pinned */
      mm.add(MQ.desktop, () => {
        section.dataset.pinned = "true";
        const steps = panels.length - 1;
        const media = panels.map((p) => p.querySelector<HTMLElement>("[data-media]")!);
        const imgs = panels.map((p) => p.querySelector<HTMLElement>("[data-media] img")!);
        const dims = panels.map((p) => p.querySelector<HTMLElement>("[data-dim]")!);
        const copies = panels.map((p) => p.querySelectorAll<HTMLElement>("[data-copy]"));
        const nums = panels.map((p) => Array.from(p.querySelectorAll<HTMLElement>("[data-num]")));
        const dots = q<HTMLElement>("[data-progress-item]");
        const bar = q<HTMLElement>("[data-progress-bar]")[0];
        const ghost = q<HTMLElement>("[data-ghost]")[0];

        const setActive = (index: number) => dots.forEach((d, i) => d.toggleAttribute("data-active", i === index));
        setActive(0);

        gsap.set(media.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(
          copies.slice(1).flatMap((c) => Array.from(c)),
          { autoAlpha: 0, y: 60 },
        );

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${window.innerHeight * steps * 1.1}`,
            scrub: 0.8,
            snap: { snapTo: "labels", duration: { min: 0.25, max: 0.7 }, delay: 0.05, ease: "power2.inOut" },
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * steps)),
          },
        });

        tl.addLabel("car-0");
        tl.fromTo(
          ghost,
          { xPercent: 0 },
          { xPercent: -50 * (steps / panels.length), ease: "none", duration: steps },
          0,
        );
        tl.fromTo(bar, { scaleY: 1 / panels.length }, { scaleY: 1, ease: "none", duration: steps }, 0);

        for (let i = 1; i < panels.length; i++) {
          const at = i - 1;
          // outgoing car: copy lifts away, image sinks back into the dark
          tl.to(copies[i - 1], { autoAlpha: 0, y: -50, stagger: 0.03, duration: 0.35 }, at)
            .to(imgs[i - 1], { scale: 1.12, yPercent: -6, duration: 1 }, at)
            .to(dims[i - 1], { opacity: 0.7, duration: 1, ease: "none" }, at)
            // incoming car: wiped up from the bottom edge, settling as it lands
            .to(media[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 }, at + 0.05)
            .fromTo(imgs[i], { scale: 1.3, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1 }, at + 0.05)
            .to(copies[i], { autoAlpha: 1, y: 0, stagger: 0.04, duration: 0.45, ease: "power3.out" }, at + 0.45);
          nums[i].forEach((el) => tl.add(countTo(el, 0, Number(el.dataset.num)), at + 0.5));
          tl.addLabel(`car-${i}`, i);
        }

        return () => {
          delete section.dataset.pinned;
        };
      });

      /* ------------------------------------------------ mobile: stacked flow */
      mm.add(MQ.mobile, () => {
        panels.forEach((panel) => {
          const m = panel.querySelector<HTMLElement>("[data-media]");
          const img = panel.querySelector<HTMLElement>("[data-media] img");
          const tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: "top 75%", once: true } });
          tl.fromTo(
            m,
            { clipPath: "inset(12% 8% 12% 8%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" },
          )
            .from(img, { scale: 1.3, duration: 1.6, ease: "expo.out" }, 0)
            .from(
              panel.querySelectorAll("[data-copy]"),
              { autoAlpha: 0, y: 32, stagger: 0.06, duration: 0.9, ease: "expo.out" },
              0.4,
            );
          panel
            .querySelectorAll<HTMLElement>("[data-num]")
            .forEach((el) => tl.add(countTo(el, 0, Number(el.dataset.num)), 0.6));
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="showcase-title"
      className="group/show stage relative bg-bg text-fg data-[pinned=true]:h-[100svh] data-[pinned=true]:overflow-hidden"
    >
      <h2 id="showcase-title" className="sr-only">
        The collection
      </h2>

      {/* Oversized outline type that drifts behind the sequence */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden items-center overflow-hidden group-data-[pinned=true]/show:flex"
      >
        <p
          data-ghost
          className="t-outline font-display text-[26vh] leading-none font-bold tracking-[-0.04em] whitespace-nowrap uppercase [font-variation-settings:'wdth'_125]"
        >
          {cars.map((c) => c.shortName).join(" · ")} · {cars[0].shortName}
        </p>
      </div>

      {cars.map((car, i) => (
        <article
          key={car.slug}
          data-panel
          aria-label={`${car.fullName}, ${i + 1} of ${cars.length}`}
          className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden group-data-[pinned=true]/show:absolute group-data-[pinned=true]/show:inset-0"
          style={{ zIndex: i + 1 }}
        >
          <div data-media className="absolute inset-0 overflow-hidden">
            <CinematicImage image={car.images.hero} sizes="100vw" className="will-change-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090a] via-[#09090a]/45 to-[#09090a]/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#09090a]/80 via-[#09090a]/20 to-transparent" />
            <div data-dim className="absolute inset-0 bg-[#09090a] opacity-0" />
          </div>

          <div className="container-x relative pt-28 pb-12 md:pb-16 group-data-[pinned=true]/show:lg:pr-28 group-data-[pinned=true]/show:xl:pr-48">
            <div className="grid gap-10 md:grid-cols-12 md:items-end">
              <div className="@container md:col-span-8 lg:col-span-7">
                <p data-copy className="t-meta mb-6 flex items-center gap-3">
                  <span className="text-fg">{pad(i + 1)}</span>
                  <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                  <span>{car.brand}</span>
                  <span className="text-fg-subtle">/ {car.engineShort}</span>
                </p>
                <h3
                  data-copy
                  className="t-display whitespace-nowrap"
                  style={{ fontSize: fitText(car.shortName, "9.5rem") }}
                >
                  {car.shortName}
                </h3>
                <p data-copy className="t-lead mt-6 max-w-lg text-fg/80">
                  {car.description}
                </p>
              </div>

              <div className="md:col-span-4 lg:col-span-5">
                <dl data-copy className="grid grid-cols-3 border-t border-line-strong">
                  {[
                    { label: "Power", spec: car.horsepower },
                    { label: "0–100", spec: car.acceleration },
                    { label: "Top", spec: car.topSpeed },
                  ].map(({ label, spec }) => (
                    <div key={label} className="flex flex-col pt-4">
                      <dt className="t-meta order-2 mt-2">{label}</dt>
                      <dd className="t-num order-1 text-[clamp(1.6rem,3vw,2.75rem)]">
                        {spec.approx && <span className="text-fg-muted">≈</span>}
                        <span data-num={spec.value} data-decimals={spec.decimals ?? 0}>
                          {formatSpec(spec.value, spec.decimals)}
                        </span>
                        <span className="ml-1 text-[0.36em] tracking-normal text-fg-muted">{spec.unit}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <div data-copy className="mt-8 flex flex-wrap items-center gap-5">
                  <Button href={`/cars/${car.slug}`} size="md">
                    Explore {car.shortName}
                  </Button>
                  <Link
                    href={`/compare?cars=${car.slug}`}
                    className="link-underline text-sm text-fg-muted hover:text-fg"
                  >
                    Compare
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* Progress rail — desktop pinned mode only */}
      <nav
        aria-label="Collection progress"
        className="absolute top-1/2 right-6 z-20 hidden -translate-y-1/2 items-stretch gap-4 group-data-[pinned=true]/show:flex lg:right-10"
      >
        <span aria-hidden="true" className="relative w-px bg-line">
          <span data-progress-bar className="absolute inset-0 origin-top bg-fg" />
        </span>
        <ol className="flex flex-col justify-between gap-5 py-0.5">
          {cars.map((car, i) => (
            <li
              key={car.slug}
              data-progress-item
              className="t-meta text-fg-subtle transition-colors duration-500 data-[active]:text-fg"
            >
              {pad(i + 1)} <span className="hidden xl:inline">{car.shortName}</span>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}
