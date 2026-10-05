"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { onPageReady } from "@/lib/animation/page-ready";
import { fitText } from "@/lib/fit-text";

const longest = (lines: string[]) =>
  lines
    .join(" ")
    .split(" ")
    .reduce((a, b) => (b.length > a.length ? b : a), "");

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  aside?: React.ReactNode;
}

/** Themed (non-image) page opener with a line-by-line title reveal. */
export function PageHeader({ eyebrow, title, lead, aside }: PageHeaderProps) {
  const root = useRef<HTMLElement>(null);
  const words = title.split("\n");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      let stop = () => {};
      mm.add(MQ.reduced, () => {
        gsap.set(q("[data-intro]"), { autoAlpha: 1 });
      });
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ paused: true });
        tl.set(q("[data-intro]"), { autoAlpha: 1 })
          .from(q("[data-ph-line]"), { yPercent: 115, duration: 1.2, stagger: 0.08, ease: "expo.out" })
          .from(q("[data-ph-fade]"), { autoAlpha: 0, y: 16, duration: 0.9, stagger: 0.06, ease: "expo.out" }, 0.3)
          .from(q("[data-ph-rule]"), { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, 0.1);
        stop = onPageReady(() => tl.play());
      });
      return () => {
        stop();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <header ref={root} className="container-x pt-36 pb-14 md:pt-48 md:pb-20">
      <p data-intro data-ph-fade className="t-meta mb-8">
        {eyebrow}
      </p>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="@container min-w-0 lg:col-span-8">
          <h1 className="t-display" style={{ fontSize: fitText(longest(words), "clamp(2.75rem, 10.5vw, 11rem)") }}>
            {words.map((w) => (
              <span key={w} className="block overflow-hidden pb-[0.05em]">
                <span data-intro data-ph-line className="block">
                  {w}
                </span>
              </span>
            ))}
          </h1>
        </div>
        {(lead || aside) && (
          <div data-intro data-ph-fade className="lg:col-span-4">
            {lead && <p className="t-lead">{lead}</p>}
            {aside}
          </div>
        )}
      </div>
      <span
        data-intro
        data-ph-rule
        aria-hidden="true"
        className="mt-14 block h-px origin-left bg-line-strong md:mt-20"
      />
    </header>
  );
}
