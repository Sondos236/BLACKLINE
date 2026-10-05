"use client";

import { gsap, MQ, SplitText } from "@/lib/gsap";

/**
 * Declarative scroll reveals. Mark elements inside a scope with:
 *
 *   data-reveal="up" | "fade" | "lines" | "image" | "scale"
 *   data-reveal-delay="0.2"        (seconds, optional)
 *   data-parallax="-12"            (yPercent travel across the viewport, optional)
 *
 * Call inside useGSAP() so everything is reverted on unmount.
 * With reduced motion, nothing is hidden and nothing moves.
 */
export function initReveals(scope: Element) {
  const mm = gsap.matchMedia();

  mm.add(MQ.motion, () => {
    const q = gsap.utils.selector(scope);

    q<HTMLElement>("[data-reveal]").forEach((el) => {
      const type = el.dataset.reveal;
      const delay = Number(el.dataset.revealDelay ?? 0);
      const trigger = { trigger: el, start: "top 88%", once: true };

      switch (type) {
        case "lines": {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.2,
                stagger: 0.08,
                delay,
                scrollTrigger: trigger,
              }),
          });
          break;
        }
        case "image": {
          const inner = el.querySelector("img");
          const tl = gsap.timeline({ delay, scrollTrigger: trigger });
          tl.fromTo(
            el,
            { clipPath: "inset(18% 12% 18% 12%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" },
          );
          if (inner) tl.from(inner, { scale: 1.35, duration: 1.8, ease: "expo.out", clearProps: "transform" }, 0);
          break;
        }
        case "scale":
          gsap.from(el, {
            scale: 0.92,
            autoAlpha: 0,
            duration: 1.3,
            delay,
            clearProps: "transform",
            scrollTrigger: trigger,
          });
          break;
        case "fade":
          gsap.from(el, { autoAlpha: 0, duration: 1.4, delay, ease: "power2.out", scrollTrigger: trigger });
          break;
        case "up":
        default:
          gsap.from(el, { y: 48, autoAlpha: 0, duration: 1.2, delay, clearProps: "transform", scrollTrigger: trigger });
      }
    });

    q<HTMLElement>("[data-parallax]").forEach((el) => {
      const travel = Number(el.dataset.parallax || -10);
      gsap.fromTo(
        el,
        { yPercent: -travel / 2 },
        {
          yPercent: travel / 2,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
  });

  return mm;
}
