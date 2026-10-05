"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CompareSelector } from "./CompareSelector";
import { CompareTable } from "./CompareTable";
import { getAllCars } from "@/data/cars";

const MAX = 3;

/** Selection lives in the URL (?cars=a,b,c) so comparisons are shareable. */
export function CompareExperience() {
  const cars = getAllCars();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const selected = useMemo(() => {
    const valid = new Set(cars.map((c) => c.slug));
    const fromUrl = (params.get("cars") ?? "").split(",").filter((s) => valid.has(s));
    return Array.from(new Set(fromUrl)).slice(0, MAX);
  }, [params, cars]);

  const update = useCallback(
    (next: string[]) => {
      const qs = next.length ? `?cars=${next.join(",")}` : "";
      router.replace(`${pathname}${qs}`, { scroll: false });
    },
    [router, pathname],
  );

  const toggle = (slug: string) =>
    update(selected.includes(slug) ? selected.filter((s) => s !== slug) : [...selected, slug].slice(0, MAX));

  const selectedCars = selected.map((s) => cars.find((c) => c.slug === s)!);

  return (
    <div className="container-x pb-24 md:pb-36">
      <CompareSelector cars={cars} selected={selected} max={MAX} onToggle={toggle} />

      <div className="mt-14 md:mt-20">
        <AnimatePresence mode="wait" initial={false}>
          {selectedCars.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid place-items-center border border-dashed border-line-strong px-6 py-24 text-center md:py-32"
            >
              <p className="t-meta mb-5">Nothing selected</p>
              <p className="t-heading max-w-[18ch] text-[clamp(1.75rem,4vw,3rem)]">Pick a machine to begin.</p>
              <p className="t-body mt-4 max-w-sm">
                Choose up to three cars above. Their numbers line up here — and the link updates so you can share it.
              </p>
              <button
                type="button"
                onClick={() => update(["bmw-m5-competition", "audi-rs7", "dodge-charger-srt-hellcat"])}
                className="link-underline mt-8 text-sm font-medium"
              >
                Try the super-saloon shoot-out
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CompareTable selected={selectedCars} pool={cars} onRemove={toggle} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
