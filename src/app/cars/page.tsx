import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { CarCard } from "@/components/cars/CarCard";
import { Reveal } from "@/components/ui/Reveal";
import { getAllCars } from "@/data/cars";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Five black performance machines — Audi RS7, BMW M5 Competition, BMW M3 Competition, Dodge Charger SRT Hellcat and Lamborghini Revuelto.",
  openGraph: { title: "The Collection — BLACKLINE", images: ["/images/cars/bmw-m5-competition/hero.jpg"] },
};

export default function CarsPage() {
  const cars = getAllCars();

  return (
    <>
      <PageHeader
        eyebrow={`The collection — ${String(cars.length).padStart(2, "0")} machines`}
        title={"Five shades\nof black."}
        lead="A sedan, a fastback, two super-saloons and a V12 hybrid flagship. Different continents, different answers — the same refusal to be ordinary."
      />
      <Reveal as="section" aria-label="All vehicles" className="container-x pb-24 md:pb-36">
        {cars.map((car, i) => (
          <CarCard key={car.slug} car={car} index={i} total={cars.length} flip={i % 2 === 1} />
        ))}
        <span aria-hidden="true" className="block h-px bg-line" />
      </Reveal>
    </>
  );
}
