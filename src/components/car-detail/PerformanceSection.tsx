import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Car, Spec } from "@/types/car";

function Figure({ spec, label, big }: { spec: Spec; label: string; big?: boolean }) {
  return (
    <div className="flex flex-col">
      <dt className="t-meta order-2 mt-4 flex items-center gap-2">
        {label}
        {spec.note && (
          <span aria-hidden="true" className="text-fg-subtle">
            *
          </span>
        )}
      </dt>
      <dd
        className={
          big
            ? "t-num order-1 text-[clamp(5rem,22vw,20rem)] leading-[0.8]"
            : "t-num order-1 text-[clamp(3rem,7vw,6.5rem)]"
        }
      >
        {spec.approx && <span className="text-fg-subtle">≈</span>}
        <CountUp value={spec.value} decimals={spec.decimals} duration={big ? 2.4 : 2} />
        <span className="ml-2 align-top text-[max(0.75rem,0.16em)] font-medium tracking-[0.08em] text-fg-muted uppercase">
          {spec.unit}
        </span>
      </dd>
    </div>
  );
}

export function PerformanceSection({ car }: { car: Car }) {
  const notes = [
    ["Power", car.horsepower],
    ["Torque", car.torque],
    ["0–100 km/h", car.acceleration],
    ["Top speed", car.topSpeed],
    ["Weight", car.weight],
  ].filter(([, s]) => (s as Spec).note || (s as Spec).approx) as [string, Spec][];

  return (
    <Reveal as="section" aria-labelledby="performance-title" className="container-x py-24 md:py-40">
      <SectionHeading
        index="01"
        eyebrow="Performance"
        title={<span id="performance-title">The numbers.</span>}
        lead={`${car.engine} · ${car.transmission} · ${car.drivetrain}`}
        align="split"
      />

      <dl className="mt-16 md:mt-24">
        <div className="border-t border-line pt-8" data-reveal="up">
          <Figure spec={car.horsepower} label="Horsepower" big />
        </div>
        <div className="mt-14 grid gap-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0">
          <div className="lg:pr-10" data-reveal="up">
            <Figure spec={car.torque} label="Torque" />
          </div>
          <div className="lg:border-l lg:border-line lg:px-10" data-reveal="up" data-reveal-delay="0.08">
            <Figure spec={car.acceleration} label="0–100 km/h" />
          </div>
          <div className="lg:border-l lg:border-line lg:pl-10" data-reveal="up" data-reveal-delay="0.16">
            <Figure spec={car.topSpeed} label="Top speed" />
          </div>
        </div>
        <div className="mt-14 grid gap-6 border-t border-line pt-8 sm:grid-cols-3" data-reveal="up">
          {[
            ["Engine", car.engine],
            ["Drivetrain", car.drivetrain],
            ["Transmission", car.transmission],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <dt className="t-meta order-2 mt-2">{k}</dt>
              <dd className="t-title order-1">{v}</dd>
            </div>
          ))}
        </div>
      </dl>

      {notes.length > 0 && (
        <ul className="mt-14 space-y-1 text-xs text-fg-subtle" data-reveal="fade">
          {notes.map(([label, spec]) => (
            <li key={label}>
              * {label}: {spec.approx ? "≈ approximate. " : ""}
              {spec.note}
            </li>
          ))}
        </ul>
      )}
    </Reveal>
  );
}
