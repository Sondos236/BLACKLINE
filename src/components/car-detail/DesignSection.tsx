import { Reveal } from "@/components/ui/Reveal";
import { CinematicImage } from "@/components/ui/CinematicImage";
import type { Car, CarImage, DesignChapter } from "@/types/car";
import { cn } from "@/lib/cn";

function Chapter({ chapter, image, n, flip }: { chapter: DesignChapter; image: CarImage; n: string; flip?: boolean }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
      <div
        data-reveal="image"
        className={cn("relative aspect-[4/5] overflow-hidden bg-surface md:col-span-7", flip && "md:order-2")}
      >
        <div data-parallax="12" className="absolute inset-x-0 -inset-y-[7%]">
          <CinematicImage image={image} sizes="(min-width: 768px) 58vw, 100vw" />
        </div>
      </div>
      <div className={cn("md:col-span-5", flip ? "md:order-1 md:pr-6" : "md:pl-6")}>
        <p className="t-meta mb-6 flex items-center gap-3" data-reveal="fade">
          <span className="text-fg">{n}</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          {chapter.eyebrow}
        </p>
        <h3 className="t-heading text-[clamp(2rem,4vw,3.75rem)]" data-reveal="lines">
          {chapter.title}
        </h3>
        <p className="t-lead mt-8 max-w-md" data-reveal="up" data-reveal-delay="0.1">
          {chapter.body}
        </p>
      </div>
    </div>
  );
}

export function DesignSection({ car }: { car: Car }) {
  const second = car.gallery[car.gallery.length - 1];
  return (
    <Reveal as="section" aria-labelledby="design-title" className="border-t border-line bg-bg-elev py-24 md:py-40">
      <div className="container-x">
        <p className="t-meta mb-6" data-reveal="fade">
          <span className="text-fg">02</span> — Design
        </p>
        <h2 id="design-title" className="sr-only">
          Design
        </h2>
        <div className="space-y-24 md:space-y-40">
          <Chapter chapter={car.design[0]} image={car.images.design} n="2.1" />
          <Chapter chapter={car.design[1]} image={second} n="2.2" flip />
        </div>
      </div>
    </Reveal>
  );
}
