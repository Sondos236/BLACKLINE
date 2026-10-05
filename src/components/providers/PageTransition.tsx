"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { setCovering } from "@/lib/animation/page-ready";

interface PageTransitionContextValue {
  navigate: (href: string) => void;
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(null);

/**
 * Route transitions: internal link clicks are intercepted, a panel wipes up to
 * cover the outgoing page, the router navigates, and the panel wipes away once
 * the new route has rendered. Keyboard, modified and external clicks pass through.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);
  const failsafe = useRef<number | undefined>(undefined);

  const reveal = useCallback(() => {
    const overlay = overlayRef.current;
    window.clearTimeout(failsafe.current);
    pending.current = null;
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    setCovering(false);
    if (!overlay) return;
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(overlay, { visibility: "hidden" });
          busy.current = false;
        },
      })
      .to(markRef.current, { yPercent: -110, duration: 0.45, ease: "power3.in" })
      .to(overlay, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.75, ease: "power4.inOut" }, "-=0.15");
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;

      if (busy.current) return;
      if (url.pathname === window.location.pathname || prefersReducedMotion() || !overlayRef.current) {
        router.push(target);
        return;
      }

      busy.current = true;
      pending.current = url.pathname;
      setCovering(true);
      const overlay = overlayRef.current;

      gsap
        .timeline()
        .set(overlay, { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)" })
        .set(markRef.current, { yPercent: 110 })
        .set(lineRef.current, { scaleX: 0 })
        .to(overlay, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "power4.inOut" })
        .to(markRef.current, { yPercent: 0, duration: 0.55, ease: "power3.out" }, "-=0.25")
        .to(lineRef.current, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, "<")
        .call(() => {
          router.push(target);
          // Never leave the user stranded behind the overlay.
          failsafe.current = window.setTimeout(reveal, 4000);
        });
    },
    [router, reveal],
  );

  // New route rendered → reveal it.
  useEffect(() => {
    if (pending.current && pending.current === pathname) {
      // Let the new page mount its ScrollTriggers before measuring.
      const id = requestAnimationFrame(() => requestAnimationFrame(reveal));
      return () => cancelAnimationFrame(id);
    }
  }, [pathname, reveal]);

  // Intercept internal link clicks (capture phase, before Next's <Link> handler).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download") || "noTransition" in a.dataset) return;
      const url = new URL(a.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      navigate(url.href);
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [navigate]);

  useEffect(() => () => window.clearTimeout(failsafe.current), []);

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center gap-5 bg-[#09090a] text-[#ededec]"
        style={{ visibility: "hidden", clipPath: "inset(100% 0% 0% 0%)" }}
      >
        <span className="overflow-hidden">
          <span ref={markRef} className="block font-display text-2xl font-semibold tracking-[0.42em] sm:text-3xl">
            BLACKLINE
          </span>
        </span>
        <span ref={lineRef} className="block h-px w-24 origin-left bg-white/40" />
      </div>
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used inside <PageTransition>");
  return ctx;
}
