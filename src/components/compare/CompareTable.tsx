"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { formatSpec, specDirection, specLabels } from "@/data/cars";
import type { Car, NumericSpecKey } from "@/types/car";
import { cn } from "@/lib/cn";

const ease = [0.16, 1, 0.3, 1] as const;
const metrics: NumericSpecKey[] = ["horsepower", "torque", "acceleration", "topSpeed", "weight"];

interface CompareTableProps {
  selected: Car[];
  /** All cars — bars are scaled against the whole collection so they stay stable as you add/remove. */
  pool: Car[];
  onRemove: (slug: string) => void;
}

function barWidth(key: NumericSpecKey, value: number, pool: Car[]) {
  const values = pool.map((c) => c[key].value);
  return specDirection[key] === "higher" ? value / Math.max(...values) : Math.min(...values) / value;
}

export function CompareTable({ selected, pool, onRemove }: CompareTableProps) {
  return (
    <div>
      {/* Selected cars */}
      <motion.ul layout className="grid gap-3 sm:grid-cols-3" aria-label="Selected vehicles">
        <AnimatePresence mode="popLayout" initial={false}>
          {selected.map((car, i) => (
            <motion.li
              key={car.slug}
              layout
              initial={{ opacity: 0, y: 30, clipPath: "inset(0% 0% 100% 0%)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
              transition={{ duration: 0.7, ease }}
              className="stage group relative aspect-[16/10] overflow-hidden bg-bg text-fg sm:aspect-[4/5] lg:aspect-[4/3]"
            >
              <CinematicImage image={car.images.hero} sizes="(min-width: 640px) 33vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090a] via-[#09090a]/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="t-meta mb-1">
                  <span className="text-fg">0{i + 1}</span> — {car.brand}
                </p>
                <Link href={`/cars/${car.slug}`} className="link-underline t-title">
                  {car.model}
                </Link>
              </div>
              <button
                type="button"
                onClick={() => onRemove(car.slug)}
                aria-label={`Remove ${car.fullName} from comparison`}
                className="absolute top-3 right-3 grid size-10 place-items-center rounded-full border border-white/30 bg-black/40 text-[#ededec] backdrop-blur-sm transition-colors hover:bg-[#ededec] hover:text-[#09090a]"
              >
                <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {/* Numeric metrics */}
      <div className="mt-16 md:mt-24">
        {metrics.map((key) => {
          const values = selected.map((c) => c[key].value);
          const best = specDirection[key] === "higher" ? Math.max(...values) : Math.min(...values);
          return (
            <section
              key={key}
              aria-label={specLabels[key]}
              className="grid gap-6 border-t border-line py-8 md:grid-cols-12 md:gap-10 md:py-10"
            >
              <header className="md:col-span-3">
                <h3 className="t-title">{specLabels[key]}</h3>
                <p className="t-meta mt-2">
                  {specDirection[key] === "higher" ? "Higher is better" : "Lower is better"}
                </p>
              </header>
              <motion.ul layout className="space-y-5 md:col-span-9">
                <AnimatePresence mode="popLayout" initial={false}>
                  {selected.map((car) => {
                    const spec = car[key];
                    const isBest = selected.length > 1 && spec.value === best;
                    return (
                      <motion.li
                        key={car.slug}
                        layout
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.6, ease }}
                        className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-4 gap-y-2"
                      >
                        <span className="flex min-w-0 items-center gap-2 text-sm">
                          <span className="truncate text-fg-muted">{car.fullName.replace(" Widebody", "")}</span>
                          {isBest && (
                            <span className="t-meta shrink-0 rounded-full border border-line-strong px-2 py-0.5 text-[0.5625rem] text-fg">
                              Best
                            </span>
                          )}
                        </span>
                        <span className="t-num text-right text-2xl sm:text-3xl">
                          {spec.approx && <span className="text-fg-subtle">≈</span>}
                          {formatSpec(spec.value, spec.decimals)}
                          <span className="ml-1 text-xs tracking-normal text-fg-muted">{spec.unit}</span>
                        </span>
                        <span className="col-span-2 block h-px bg-line">
                          <motion.span
                            className={cn(
                              "block h-[3px] origin-left -translate-y-px",
                              isBest || selected.length === 1 ? "bg-fg" : "bg-fg-subtle",
                            )}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: barWidth(key, spec.value, pool) }}
                            transition={{ duration: 1.1, ease }}
                          />
                        </span>
                      </motion.li>
                    );
                  })}
                </AnimatePresence>
              </motion.ul>
            </section>
          );
        })}

        {/* Descriptive specs */}
        {(
          [
            ["Engine", (c: Car) => c.engine],
            ["Drivetrain", (c: Car) => c.drivetrain],
            ["Transmission", (c: Car) => c.transmission],
          ] as const
        ).map(([label, get]) => (
          <section
            key={label}
            aria-label={label}
            className="grid gap-6 border-t border-line py-8 md:grid-cols-12 md:gap-10 md:py-10"
          >
            <h3 className="t-title md:col-span-3">{label}</h3>
            <motion.ul layout className="grid gap-5 sm:grid-cols-3 md:col-span-9">
              <AnimatePresence mode="popLayout" initial={false}>
                {selected.map((car) => (
                  <motion.li
                    key={car.slug}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <p className="t-meta mb-2">{car.shortName}</p>
                    <p className="text-[0.9375rem] leading-snug">{get(car)}</p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </section>
        ))}
        <p className="border-t border-line pt-6 text-xs text-fg-subtle">
          ≈ approximate or independently tested figure. Top speeds shown with optional packages where offered. Bars are
          scaled against the full collection.
        </p>
      </div>
    </div>
  );
}
