import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarHero } from "@/components/car-detail/CarHero";
import { PerformanceSection } from "@/components/car-detail/PerformanceSection";
import { DesignSection } from "@/components/car-detail/DesignSection";
import { TechnologySection } from "@/components/car-detail/TechnologySection";
import { CarGallery } from "@/components/car-detail/CarGallery";
import { NextCar } from "@/components/car-detail/NextCar";
import { FinalCta } from "@/components/shared/FinalCta";
import { getAdjacentCar, getAllCars, getCarBySlug } from "@/data/cars";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCars().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cars/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};
  const title = car.fullName.replace(" Widebody", "");
  const description = `${car.fullName}: ${car.engine}, ${car.horsepower.value} hp, 0–100 km/h in ${car.acceleration.value} s. ${car.tagline}`;
  return {
    title,
    description,
    openGraph: {
      title: `${title} — BLACKLINE`,
      description,
      images: [{ url: car.images.hero.src, alt: car.images.hero.alt }],
    },
    twitter: { card: "summary_large_image", title: `${title} — BLACKLINE`, description, images: [car.images.hero.src] },
  };
}

export default async function CarPage({ params }: PageProps<"/cars/[slug]">) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const all = getAllCars();
  const index = all.findIndex((c) => c.slug === car.slug);

  return (
    <>
      <CarHero car={car} index={index} total={all.length} />
      <PerformanceSection car={car} />
      <DesignSection car={car} />
      <TechnologySection car={car} />
      <CarGallery images={car.gallery} title={`${car.shortName}, up close.`} />
      <FinalCta
        eyebrow={`05 — ${car.fullName}`}
        title="Ready to experience it?"
        image={car.images.design}
        carSlug={car.slug}
        secondary={{ href: `/compare?cars=${car.slug}`, label: "Compare Model" }}
      />
      <NextCar car={getAdjacentCar(car.slug)} />
    </>
  );
}
