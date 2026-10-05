"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { formatSpec } from "@/data/cars";

interface CountUpProps {
  value: number;
  decimals?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Renders the final value on the server (no hydration mismatch, correct for
 * no-JS and reduced motion), then counts up from zero when scrolled into view.
 */
export function CountUp({ value, decimals = 0, duration = 2, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const state = { v: 0 };
        const render = () => (el.textContent = formatSpec(state.v, decimals));
        render();
        gsap.to(state, {
          v: value,
          duration,
          delay,
          ease: "power3.out",
          onUpdate: render,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
        return () => (el.textContent = formatSpec(value, decimals));
      });
      return () => mm.revert();
    },
    { dependencies: [value, decimals] },
  );

  return (
    <span ref={ref} className={className}>
      {formatSpec(value, decimals)}
    </span>
  );
}
