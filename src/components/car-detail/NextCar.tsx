import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CinematicImage } from "@/components/ui/CinematicImage";
import type { Car } from "@/types/car";
import { fitText } from "@/lib/fit-text";

/** Full-width hand-off to the next car — keeps the campaign moving. */
export function NextCar({ car }: { car: Car }) {
  return (
    <Link
      href={`/cars/${car.slug}`}
      data-cursor="Next"
      className="group stage relative isolate block overflow-hidden bg-bg text-fg"
      aria-label={`Next: ${car.fullName}`}
    >
      <div className="absolute inset-0 -z-10 opacity-40 transition-[opacity,transform] duration-[1200ms] ease-out-expo group-hover:scale-105 group-hover:opacity-70">
        <CinematicImage image={car.images.hero} sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090a] via-[#09090a]/60 to-transparent" />
      </div>
      <div className="container-x flex min-h-[48svh] flex-col justify-center gap-6 py-20">
        <p className="t-meta">Next machine — {car.brand}</p>
        <div className="flex items-center justify-between gap-6">
          <div className="@container min-w-0 flex-1">
            <p
              style={{ fontSize: fitText(car.shortName, "clamp(2.75rem, 9vw, 8rem)") }}
              className="t-display whitespace-nowrap transition-transform duration-700 ease-out-expo group-hover:translate-x-4"
            >
              {car.shortName}
            </p>
          </div>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-500 group-hover:bg-invert-bg group-hover:text-invert-fg sm:size-20">
            <ArrowRight
              className="size-5 transition-transform duration-500 group-hover:translate-x-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
