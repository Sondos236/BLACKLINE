"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { imageManifest } from "@/data/image-manifest";
import type { CarImage } from "@/types/car";

/**
 * Desktop: the section pins and vertical scroll drives the track sideways,
 * with each frame revealing and parallaxing inside the moving container.
 * Mobile / reduced motion: a native swipeable, snapping strip.
 */
export function CarGallery({ images, title }: { images: CarImage[]; title: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const track = q<HTMLElement>("[data-track]")[0];
      const counter = q<HTMLElement>("[data-counter]")[0];
      const bar = q<HTMLElement>("[data-bar]")[0];
      const mm = gsap.matchMedia();

      mm.add(MQ.desktop, () => {
        section.dataset.pinned = "true";
        const distance = () => track.scrollWidth - track.clientWidth;

        const move = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(images.length, Math.floor(self.progress * images.length) + 1);
              counter.textContent = String(i).padStart(2, "0");
              gsap.set(bar, { scaleX: self.progress });
            },
          },
        });

        q<HTMLElement>("[data-frame]").forEach((frame) => {
          const inner = frame.querySelector("[data-inner]");
          gsap.fromTo(
            inner,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                containerAnimation: move,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            frame,
            { clipPath: "inset(10% 0% 10% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                containerAnimation: move,
                start: "left 100%",
                end: "left 55%",
                scrub: true,
              },
            },
          );
        });

        return () => delete section.dataset.pinned;
      });

      mm.add(MQ.mobile, () => {
        gsap.from(q("[data-frame]"), {
          autoAlpha: 0,
          x: 40,
          stagger: 0.08,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: track, start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [images.length] },
  );

  return (
    <section
      ref={root}
      aria-labelledby="gallery-title"
      className="group/gal stage relative flex flex-col overflow-hidden bg-bg py-20 text-fg data-[pinned=true]:h-[100svh] data-[pinned=true]:justify-center data-[pinned=true]:py-0"
    >
      <div className="container-x mb-10 flex items-end justify-between gap-6 md:mb-12">
        <div>
          <p className="t-meta mb-4">
            <span className="text-fg">04</span> — Gallery
          </p>
          <h2 id="gallery-title" className="t-heading text-[clamp(2rem,4.5vw,4rem)]">
            {title}
          </h2>
        </div>
        <div className="hidden w-40 shrink-0 group-data-[pinned=true]/gal:block">
          <p className="t-meta mb-3 text-right" aria-hidden="true">
            <span data-counter className="text-fg">
              01
            </span>{" "}
            / {String(images.length).padStart(2, "0")}
          </p>
          <span className="block h-px bg-line">
            <span data-bar className="block h-px origin-left scale-x-0 bg-fg" />
          </span>
        </div>
        <p className="t-meta shrink-0 group-data-[pinned=true]/gal:hidden">Swipe →</p>
      </div>

      <ul
        data-track
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 group-data-[pinned=true]/gal:snap-none group-data-[pinned=true]/gal:overflow-visible sm:gap-5 sm:px-8 xl:px-14"
        aria-label={`${title} photographs`}
      >
        {images.map((img, i) => {
          const meta = imageManifest[img.src];
          const ar = meta ? Math.min(Math.max(meta.width / meta.height, 0.62), 1.6) : 1;
          return (
            <li
              key={img.src}
              data-frame
              className="group relative h-[62svh] max-h-[34rem] max-w-[85vw] shrink-0 snap-center overflow-hidden bg-surface md:h-[64svh] md:max-h-none"
              style={{ aspectRatio: String(ar) }}
            >
              <figure className="h-full">
                <div data-inner className="absolute -inset-x-[10%] inset-y-0">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-105">
                    <CinematicImage image={img} sizes="(min-width: 768px) 50vw, 85vw" />
                  </div>
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-4 pt-16 text-[#ededec] sm:p-5">
                  <span className="t-meta text-[#ededec]/70">{String(i + 1).padStart(2, "0")}</span>
                  <span className="translate-y-1 text-sm opacity-80 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                    {img.caption}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
        <li aria-hidden="true" className="w-px shrink-0 sm:w-4" />
      </ul>
    </section>
  );
}
