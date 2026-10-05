"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { initReveals } from "@/lib/animation/reveals";

/** Attach to a section to activate its `data-reveal` / `data-parallax` children. */
export function useReveals<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = initReveals(ref.current);
      return () => mm.revert();
    },
    { scope: ref },
  );
  return ref;
}
