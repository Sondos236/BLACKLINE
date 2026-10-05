import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { PerformanceStats } from "./PerformanceStats";
import type { Car } from "@/types/car";
import { cn } from "@/lib/cn";
import { fitText } from "@/lib/fit-text";

interface CarCardProps {
  car: Car;
  index: number;
  total: number;
  flip?: boolean;
}

/**
 * Editorial collection entry. The whole card is one link; hover zooms the
 * image, nudges the model name, slides the arrow and draws the top rule.
 */
export function CarCard({ car, index, total, flip }: CarCardProps) {
  const longestWord = car.model.split(" ").reduce((a, b) => (b.length > a.length ? b : a), "");
  return (
    <article className="group relative">
      <Link
        href={`/cars/${car.slug}`}
        aria-label={`Explore the ${car.fullName}`}
        className="grid gap-8 py-12 outline-none md:grid-cols-12 md:gap-10 md:py-16"
      >
        {/* top rule that draws across on hover */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 h-px w-full origin-left scale-x-0 bg-fg transition-transform duration-[900ms] ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />

        <div
          data-reveal="image"
          data-cursor="View"
          className={cn(
            "relative aspect-[4/3] min-w-0 overflow-hidden bg-surface md:col-span-7 lg:col-span-8 lg:aspect-[16/9]",
            flip && "md:order-2",
          )}
        >
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out-expo group-hover:scale-[1.06]">
            <CinematicImage image={car.images.hero} sizes="(min-width: 1024px) 66vw, (min-width: 768px) 58vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="t-meta absolute bottom-4 left-4 text-[#ededec]/80">{car.generation}</span>
        </div>

        <div
          className={cn(
            "@container flex min-w-0 flex-col justify-between gap-10 md:col-span-5 lg:col-span-4",
            flip && "md:order-1",
          )}
        >
          <div>
            <p className="t-meta flex items-center gap-3" data-reveal="fade">
              <span className="text-fg">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-fg-subtle">/ {String(total).padStart(2, "0")}</span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              {car.brand}
            </p>
            <h2
              className="t-heading mt-5 transition-transform duration-700 ease-out-expo group-hover:translate-x-3"
              style={{ fontSize: fitText(longestWord, "4.25rem") }}
              data-reveal="up"
            >
              {car.model}
            </h2>
            <p className="t-body mt-5 max-w-md" data-reveal="up" data-reveal-delay="0.1">
              {car.description}
            </p>
          </div>

          <div data-reveal="up" data-reveal-delay="0.15">
            <PerformanceStats car={car} className="border-t border-line pt-5" />
            <span className="mt-8 inline-flex items-center gap-3 text-sm font-medium">
              <span className="link-underline group-hover:bg-[length:100%_1px]">Explore {car.shortName}</span>
              <span className="relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full border border-line-strong transition-colors duration-500 group-hover:border-fg group-hover:bg-invert-bg group-hover:text-invert-fg">
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-[180%]"
                  strokeWidth={1.5}
                />
                <ArrowRight
                  aria-hidden="true"
                  className="absolute size-4 -translate-x-[180%] transition-transform duration-500 ease-out-expo group-hover:translate-x-0"
                  strokeWidth={1.5}
                />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
