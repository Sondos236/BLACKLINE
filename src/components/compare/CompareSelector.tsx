"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { imageManifest } from "@/data/image-manifest";
import type { Car } from "@/types/car";
import { cn } from "@/lib/cn";

interface CompareSelectorProps {
  cars: Car[];
  selected: string[];
  max: number;
  onToggle: (slug: string) => void;
}

export function CompareSelector({ cars, selected, max, onToggle }: CompareSelectorProps) {
  const full = selected.length >= max;

  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <p className="t-meta" id="compare-select-label">
          Select up to {max} machines
        </p>
        <p className="t-meta" aria-live="polite">
          <span className="text-fg">{selected.length}</span> / {max}
        </p>
      </div>
      <ul
        aria-labelledby="compare-select-label"
        className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5"
      >
        {cars.map((car) => {
          const position = selected.indexOf(car.slug);
          const isOn = position >= 0;
          const disabled = !isOn && full;
          return (
            <li key={car.slug} className="w-[46vw] max-w-56 shrink-0 snap-start sm:w-auto sm:max-w-none">
              <motion.button
                type="button"
                aria-pressed={isOn}
                aria-disabled={disabled || undefined}
                onClick={() => !disabled && onToggle(car.slug)}
                whileTap={disabled ? undefined : { scale: 0.97 }}
                title={disabled ? `Remove a car to add the ${car.model}` : undefined}
                className={cn(
                  "group relative block w-full overflow-hidden border text-left transition-colors duration-500",
                  isOn ? "border-fg" : "border-line hover:border-line-strong",
                  disabled && "cursor-not-allowed opacity-40",
                )}
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={car.images.hero.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 46vw"
                    placeholder="blur"
                    blurDataURL={imageManifest[car.images.hero.src]?.blurDataURL}
                    className={cn(
                      "object-cover transition-[transform,opacity] duration-700 ease-out-expo group-hover:scale-105",
                      !isOn && "opacity-60",
                    )}
                    style={{ objectPosition: car.images.hero.position }}
                  />
                  <span
                    className={cn(
                      "absolute top-2 right-2 grid size-7 place-items-center rounded-full border transition-colors duration-300",
                      isOn
                        ? "border-[#ededec] bg-[#ededec] text-[#09090a]"
                        : "border-white/40 bg-black/30 text-[#ededec]",
                    )}
                  >
                    {isOn ? (
                      <span className="text-[0.6875rem] font-semibold">{position + 1}</span>
                    ) : (
                      <Plus className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
                    )}
                  </span>
                </span>
                <span className="flex items-center justify-between gap-2 px-3 py-3">
                  <span className="min-w-0">
                    <span className="t-meta block text-[0.625rem]">{car.brand}</span>
                    <span className="block truncate text-sm font-medium">{car.model}</span>
                  </span>
                  {isOn && <Check className="size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />}
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
