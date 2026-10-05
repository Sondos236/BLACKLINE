import Link from "next/link";
import { getAllCars } from "@/data/cars";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[85svh] flex-col justify-center pt-36 pb-16">
      <p className="t-meta mb-8">Error 404</p>
      <h1 className="t-display">Wrong turn.</h1>
      <p className="t-lead mt-8 max-w-md">This road doesn&apos;t exist. The five that do are just below.</p>
      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
        <li>
          <Link href="/" className="link-underline text-sm">
            Home
          </Link>
        </li>
        {getAllCars().map((c) => (
          <li key={c.slug}>
            <Link href={`/cars/${c.slug}`} className="link-underline text-sm text-fg-muted hover:text-fg">
              {c.fullName.replace(" Widebody", "")}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
