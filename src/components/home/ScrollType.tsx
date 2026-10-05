"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Two rows of oversized type sliding in opposite directions with scroll. */
export function ScrollType({ rows }: { rows: [string, string] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const scrollTrigger = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 };
        gsap.fromTo("[data-row='a']", { xPercent: 0 }, { xPercent: -28, ease: "none", scrollTrigger });
        gsap.fromTo("[data-row='b']", { xPercent: -28 }, { xPercent: 0, ease: "none", scrollTrigger });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const repeat = (t: string) => `${t} — ${t} — ${t} — `;

  return (
    <div ref={root} aria-hidden="true" className="overflow-hidden py-16 select-none md:py-28">
      <p
        data-row="a"
        className="font-display text-[clamp(4rem,14vw,14rem)] leading-[0.9] font-bold tracking-[-0.045em] whitespace-nowrap uppercase [font-variation-settings:'wdth'_125]"
      >
        {repeat(rows[0])}
      </p>
      <p
        data-row="b"
        className="t-outline font-display text-[clamp(4rem,14vw,14rem)] leading-[0.9] font-bold tracking-[-0.045em] whitespace-nowrap uppercase [font-variation-settings:'wdth'_125]"
      >
        {repeat(rows[1])}
      </p>
    </div>
  );
}
