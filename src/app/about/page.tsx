import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CinematicImage } from "@/components/ui/CinematicImage";
import { Button } from "@/components/ui/Button";
import { getCarBySlug } from "@/data/cars";

export const metadata: Metadata = {
  title: "About",
  description:
    "BLACKLINE is a fictional automotive experience — a digital showroom concept exploring cinematic interaction design for five black performance cars.",
};

const pillars = [
  {
    title: "Philosophy",
    text: "BLACKLINE treats a website the way a carmaker treats a launch film: one idea, told with restraint. Fewer sections, larger images, and motion that explains rather than decorates.",
  },
  {
    title: "Design",
    text: "A monochrome system — black, graphite, off-white and a single metallic grey — so the cars carry the colour of their own shapes. Every photograph is graded to the same stealth palette.",
  },
  {
    title: "Performance",
    text: "Figures come from manufacturer-published data where it exists. Anything approximate, optional or independently tested is marked as such. Nothing is rounded up for drama.",
  },
  {
    title: "Technology",
    text: "Built with Next.js, TypeScript and Tailwind CSS. GSAP and ScrollTrigger drive scroll choreography; Framer Motion handles interface moments. All of it respects reduced-motion preferences.",
  },
];

const colophon = [
  ["Framework", "Next.js App Router, TypeScript"],
  ["Styling", "Tailwind CSS, design tokens, dual theme"],
  ["Motion", "GSAP, ScrollTrigger, SplitText, Framer Motion"],
  ["Type", "Archivo (expanded), Geist, Geist Mono"],
  ["Imagery", "Unsplash contributors, monochrome grade"],
];

export default function AboutPage() {
  const m3 = getCarBySlug("bmw-m3-competition")!;

  return (
    <>
      <PageHeader
        eyebrow="About BLACKLINE"
        title={"A showroom\nthat isn't."}
        lead="BLACKLINE is a fictional automotive experience — a frontend concept, not a dealer, manufacturer or broker. Nothing here is for sale. Everything here is built to be looked at closely."
      />

      <Reveal as="section" aria-label="Principles" className="container-x pb-24 md:pb-36">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden bg-surface">
                <CinematicImage image={m3.gallery[1]} sizes="(min-width: 1024px) 40vw, 100vw" />
              </div>
              <p className="t-caption mt-4" data-reveal="fade">
                BMW M3 Competition, after dark. Every image on BLACKLINE shares a single monochrome grade.
              </p>
            </div>
          </div>

          <ol className="lg:col-span-7 lg:pl-10">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                className="grid gap-4 border-t border-line py-10 sm:grid-cols-[6rem_minmax(0,1fr)] md:py-14"
              >
                <span className="t-meta" data-reveal="fade">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="t-heading text-[clamp(2rem,4.2vw,3.75rem)]" data-reveal="lines">
                    {p.title}
                  </h2>
                  <p className="t-lead mt-6 max-w-xl" data-reveal="up">
                    {p.text}
                  </p>
                </div>
              </li>
            ))}

            <li className="border-t border-line py-10 md:py-14">
              <h2 className="t-meta mb-8" data-reveal="fade">
                Colophon
              </h2>
              <dl className="divide-y divide-line">
                {colophon.map(([k, v]) => (
                  <div key={k} className="grid gap-1 py-4 sm:grid-cols-[10rem_minmax(0,1fr)]" data-reveal="up">
                    <dt className="text-sm text-fg-muted">{k}</dt>
                    <dd className="text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-10 text-xs leading-relaxed text-fg-subtle">
                Audi, BMW, Dodge, SRT, Hellcat and Lamborghini are trademarks of their respective owners. BLACKLINE is
                not affiliated with or endorsed by any of them.
              </p>
              <div className="mt-10" data-reveal="up">
                <Button href="/cars">Explore Collection</Button>
              </div>
            </li>
          </ol>
        </div>
      </Reveal>
    </>
  );
}
