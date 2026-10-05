"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A soft ring that trails the pointer and expands with a label over elements
 * marked `data-cursor="View"`. Fine pointers only; never replaces the native cursor.
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });
    let current: string | null = null;
    let visible = false;

    const setMode = (text: string | null) => {
      if (text === current) return;
      current = text;
      label.textContent = text ?? "";
      gsap.to(ring, { scale: text ? 1 : 0.2, duration: 0.5, ease: "expo.out" });
      gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.3 });
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      if (!visible) {
        visible = true;
        gsap.set(ring, { x: e.clientX, y: e.clientY });
        gsap.to(ring, { autoAlpha: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as Element | null)?.closest?.<HTMLElement>("[data-cursor]");
      setMode(target?.dataset.cursor ?? null);
    };
    const leave = () => {
      visible = false;
      gsap.to(ring, { autoAlpha: 0, duration: 0.3 });
    };

    gsap.set(ring, { xPercent: -50, yPercent: -50, scale: 0.2, autoAlpha: 0 });
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      gsap.killTweensOf([ring, label]);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] grid size-24 place-items-center rounded-full border border-white/70 bg-white/10 text-white mix-blend-difference backdrop-blur-[2px]"
      style={{ visibility: "hidden" }}
    >
      <span ref={labelRef} className="t-meta text-[0.625rem] text-white opacity-0" />
    </div>
  );
}
