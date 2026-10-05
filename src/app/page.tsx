import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { CarShowcase } from "@/components/home/CarShowcase";
import { ScrollType } from "@/components/home/ScrollType";
import { ExperienceTeaser } from "@/components/home/ExperienceTeaser";
import { CompareTeaser } from "@/components/home/CompareTeaser";
import { FinalCta } from "@/components/shared/FinalCta";
import { getAllCars, getCarBySlug } from "@/data/cars";

export default function HomePage() {
  const cars = getAllCars();
  const m3 = getCarBySlug("bmw-m3-competition")!;
  const m5 = getCarBySlug("bmw-m5-competition")!;
  const revuelto = getCarBySlug("lamborghini-revuelto")!;

  return (
    <>
      <Hero />
      <Manifesto />
      <div className="container-x pb-10">
        <p className="t-meta flex items-center gap-3">
          <span className="text-fg">02</span>
          <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          The collection
        </p>
      </div>
      <CarShowcase cars={cars} />
      <ScrollType rows={["Five machines", "One obsession"]} />
      <ExperienceTeaser image={m3.images.design} detail={m5.gallery[0]} />
      <CompareTeaser cars={cars} />
      <FinalCta
        eyebrow="05 — Your turn"
        title="Ready when you are."
        image={revuelto.images.hero}
        secondary={{ href: "/cars", label: "Explore Collection" }}
      />
    </>
  );
}
