"use client";

import { useReveals } from "@/hooks/useReveals";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Button } from "@/components/ui/Button";
import { useTestDrive } from "@/components/providers/TestDriveProvider";
import type { CarImage } from "@/types/car";
import { fitText } from "@/lib/fit-text";

interface FinalCtaProps {
  title: string;
  eyebrow: string;
  image: CarImage;
  carSlug?: string;
  secondary: { href: string; label: string };
}

/** Closing statement over a dark stage with the test-drive call to action. */
export function FinalCta({ title, eyebrow, image, carSlug, secondary }: FinalCtaProps) {
  const ref = useReveals<HTMLElement>();
  const { open } = useTestDrive();
  const longestWord = title.split(" ").reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <section
      ref={ref}
      aria-labelledby="final-cta-title"
      className="stage grain relative isolate overflow-hidden bg-bg text-fg"
    >
      <div className="absolute inset-0 -z-10">
        <div data-parallax="16" className="absolute inset-x-0 -inset-y-[10%]">
          <CinematicImage image={image} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-[#09090a]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090a] via-transparent to-[#09090a]" />
      </div>

      <div className="container-x @container flex min-h-[85svh] flex-col items-start justify-center py-28 md:items-center md:text-center">
        <p className="t-meta mb-8" data-reveal="fade">
          {eyebrow}
        </p>
        <h2
          id="final-cta-title"
          className="t-display max-w-[16ch]"
          style={{ fontSize: fitText(longestWord, "clamp(2.75rem, 9vw, 9rem)") }}
          data-reveal="lines"
        >
          {title}
        </h2>
        <div className="mt-12 flex flex-wrap gap-3 md:justify-center" data-reveal="up" data-reveal-delay="0.2">
          <Button href={secondary.href} variant="outline">
            {secondary.label}
          </Button>
          <Button onClick={() => open(carSlug)} icon="arrow-up">
            Request a Test Drive
          </Button>
        </div>
      </div>
    </section>
  );
}
