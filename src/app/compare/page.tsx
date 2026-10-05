import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { CompareExperience } from "@/components/compare/CompareExperience";

export const metadata: Metadata = {
  title: "Compare",
  description:
    "Compare up to three BLACKLINE machines side by side — horsepower, torque, 0–100 km/h, top speed, engine, drivetrain and weight.",
  openGraph: { title: "Compare — BLACKLINE", images: ["/images/cars/bmw-m3-competition/hero.jpg"] },
};

function CompareFallback() {
  return (
    <div className="container-x pb-24" aria-busy="true" aria-label="Loading comparison">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="aspect-[4/3] animate-pulse bg-surface" />
        ))}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Compare"
        title={"Head to\nhead."}
        lead="Three machines, one table. Every figure comes from the same data layer that powers the rest of the showroom."
      />
      <Suspense fallback={<CompareFallback />}>
        <CompareExperience />
      </Suspense>
    </>
  );
}
