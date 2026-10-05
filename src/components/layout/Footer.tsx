import Link from "next/link";
import { Logo } from "./Logo";
import { navLinks } from "@/data/navigation";
import { cars } from "@/data/cars";
import { FooterTestDrive } from "./FooterTestDrive";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div className="container-x grid gap-14 pt-20 pb-10 md:grid-cols-12 md:gap-8 md:pt-28">
        <div className="md:col-span-5">
          <Logo />
          <p className="t-body mt-6 max-w-sm">
            A fictional digital showroom for five machines that share one colour and one obsession.
          </p>
          <div className="mt-8">
            <FooterTestDrive />
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3">
          <div>
            <p className="t-meta mb-5">Explore</p>
            <ul className="space-y-3 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-fg-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-meta mb-5">Collection</p>
            <ul className="space-y-3 text-sm">
              {cars.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/cars/${c.slug}`}
                    className="link-underline text-fg-muted transition-colors hover:text-fg"
                  >
                    {c.fullName.replace(" Widebody", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="t-meta mb-5">Notice</p>
            <p className="text-sm leading-relaxed text-fg-muted">
              BLACKLINE is a frontend concept, not a dealer. Brand names belong to their owners. Photography via
              Unsplash contributors, graded in monochrome.
            </p>
          </div>
        </nav>
      </div>

      <div aria-hidden="true" className="container-x select-none">
        <p className="t-outline translate-y-[18%] font-display text-[19.5vw] leading-[0.8] font-bold tracking-[-0.05em] [font-variation-settings:'wdth'_125] md:text-[17.5vw]">
          BLACKLINE
        </p>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-xs text-fg-subtle sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} BLACKLINE — portfolio concept.</p>
        <p>Designed &amp; engineered in Next.js, GSAP &amp; Framer Motion.</p>
      </div>
    </footer>
  );
}
