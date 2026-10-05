"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useDialog } from "@/hooks/useDialog";
import { isActive, navLinks } from "@/data/navigation";
import { cars } from "@/data/cars";
import { cn } from "@/lib/cn";

const ease = [0.76, 0, 0.24, 1] as const;

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const ref = useDialog<HTMLDivElement>(open, onClose, "#menu-toggle");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-bg pt-16 md:hidden"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.55, ease, delay: 0.05 } }}
          transition={{ duration: 0.7, ease }}
        >
          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center overflow-y-auto py-10">
            <ul className="space-y-1">
              {navLinks.map((link, i) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-105%", transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 + i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-baseline gap-4 py-1 font-display text-[clamp(2rem,9.5vw,4rem)] leading-[1] font-semibold tracking-[-0.03em] uppercase [font-variation-settings:'wdth'_115]",
                          active ? "text-fg" : "text-fg-subtle",
                        )}
                      >
                        <span className="t-meta w-6 text-[0.625rem]">0{i + 1}</span>
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>
          <motion.div
            className="container-x border-t border-line py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <p className="t-meta mb-3">The collection</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-fg-muted">
              {cars.map((c) => (
                <li key={c.slug}>
                  <Link href={`/cars/${c.slug}`} onClick={onClose} className="link-underline hover:text-fg">
                    {c.model}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
