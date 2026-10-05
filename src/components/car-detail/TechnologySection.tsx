import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Car } from "@/types/car";

/** Feature grid built from hairlines rather than boxes. */
export function TechnologySection({ car }: { car: Car }) {
  return (
    <Reveal as="section" aria-labelledby="tech-title" className="container-x py-24 md:py-40">
      <SectionHeading
        index="03"
        eyebrow="Technology"
        title={<span id="tech-title">Engineering, explained.</span>}
        lead={`The systems that turn the ${car.model}'s numbers into something you can actually feel from the driver's seat.`}
        align="split"
      />
      <ul className="mt-16 grid border-t border-l border-line sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
        {car.features.map((f, i) => (
          <li
            key={f.title}
            data-reveal="up"
            data-reveal-delay={String((i % 3) * 0.07)}
            className="group relative isolate flex min-h-64 flex-col justify-between gap-10 overflow-hidden border-r border-b border-line p-6 sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-surface transition-transform duration-700 ease-out-expo group-hover:scale-y-100"
            />
            <span className="t-meta flex items-center justify-between">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span
                aria-hidden="true"
                className="h-px w-6 bg-line-strong transition-all duration-500 group-hover:w-12 group-hover:bg-fg"
              />
            </span>
            <div>
              <h3 className="t-title transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
                {f.title}
              </h3>
              <p className="t-body mt-4 text-[0.9375rem]">{f.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
