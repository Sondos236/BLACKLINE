"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { hasDarkHero, isActive, navLinks } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Tuck away while reading downward; return on any upward scroll.
      setHidden(y > 480 && y > lastY.current + 4 ? true : y < lastY.current - 4 ? false : (h) => h);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset scroll-derived state when the route changes (React's "adjust state on prop change" pattern).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setHidden(false);
  }

  const onStage = hasDarkHero(pathname) && !scrolled && !menuOpen;

  return (
    <>
      <a
        href="#main"
        className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-full bg-invert-bg px-5 py-3 text-sm text-invert-fg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-out-expo",
          onStage && "stage",
          scrolled && !menuOpen
            ? "border-b border-line bg-bg/72 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between text-fg sm:h-20">
          <Logo className="relative z-10" />

          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "link-underline pb-1 text-[0.8125rem] tracking-[0.02em] transition-colors duration-300",
                      active ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="relative z-10 flex items-center gap-2">
            <ThemeToggle />
            <button
              id="menu-toggle"
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-full border border-line md:hidden"
            >
              <span aria-hidden="true" className="relative block h-2.5 w-5">
                <span
                  className={cn(
                    "absolute top-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                    menuOpen && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-out-expo",
                    menuOpen && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}
