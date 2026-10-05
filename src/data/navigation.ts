export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/experience", label: "Experience" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
] as const;

/** Routes that open on a full-bleed dark image stage (nav renders light-on-dark at the top). */
export function hasDarkHero(pathname: string): boolean {
  return pathname === "/" || pathname === "/experience" || /^\/cars\/[^/]+$/.test(pathname);
}

export function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
