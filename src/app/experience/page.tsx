import type { Metadata } from "next";
import { StageHero } from "@/components/shared/StageHero";
import { StatementChapter } from "@/components/experience/StatementChapter";
import { MaskChapter } from "@/components/experience/MaskChapter";
import { TechChapter } from "@/components/experience/TechChapter";
import { MachinesIndex } from "@/components/experience/MachinesIndex";
import { ScrollType } from "@/components/home/ScrollType";
import { FinalCta } from "@/components/shared/FinalCta";
import { getAllCars, getCarBySlug } from "@/data/cars";

export const metadata: Metadata = {
  title: "The Experience",
  description:
    "The BLACKLINE philosophy — performance as a feeling, design with purpose, engineering without compromise — told through five black machines.",
  openGraph: { title: "The Experience — BLACKLINE", images: ["/images/cars/audi-rs7/g3.jpg"] },
};

export default function ExperiencePage() {
  const cars = getAllCars();
  const rs7 = getCarBySlug("audi-rs7")!;
  const m5 = getCarBySlug("bmw-m5-competition")!;
  const hellcat = getCarBySlug("dodge-charger-srt-hellcat")!;
  const revuelto = getCarBySlug("lamborghini-revuelto")!;

  return (
    <>
      <StageHero
        eyebrow="The BLACKLINE philosophy"
        lines={["The", "experience."]}
        lead="We don't sell cars. We stage them — in the dark, with the noise turned down, so you can hear what each one is really saying."
        image={rs7.gallery[3]}
      />

      <StatementChapter
        index="01"
        label="Performance"
        quote="Performance is not a number. It's a feeling."
        body="The spec sheet tells you what a car can do. It can't tell you how the M5's rear axle feels when it's allowed to misbehave, or how the Hellcat's supercharger fills the space between your ears. We start with the figures. We finish with the feeling."
        image={m5.gallery[3]}
      />

      <MaskChapter
        index="02"
        label="Design"
        quote="Every line has a purpose."
        body="Strip the colour out of a car and you're left with what designers actually draw: surfaces, shadows and a handful of lines that have to do everything — cool brakes, cheat the air, make a stranger look twice."
        image={revuelto.images.design}
        details={[
          {
            title: "Silhouette",
            text: "Proportions are decided before a single detail is drawn. Get them wrong and nothing else can save it.",
          },
          {
            title: "Light",
            text: "Headlamp and tail-light signatures are the new grilles — the part of a car you recognise at night.",
          },
          {
            title: "Function",
            text: "Vents, wings and diffusers earn their place by moving air, not by looking like they might.",
          },
        ]}
      />

      <TechChapter cars={cars} />

      <ScrollType rows={["Engineering", "Without compromise"]} />

      <MachinesIndex cars={cars} />

      <FinalCta
        eyebrow="05 — Next"
        title="Choose your obsession."
        image={hellcat.images.design}
        secondary={{ href: "/compare", label: "Compare the Machines" }}
      />
    </>
  );
}
