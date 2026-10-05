import Image, { type ImageProps } from "next/image";
import { imageManifest } from "@/data/image-manifest";
import type { CarImage } from "@/types/car";
import { cn } from "@/lib/cn";

interface CinematicImageProps extends Omit<ImageProps, "src" | "alt" | "fill" | "placeholder" | "blurDataURL"> {
  image: CarImage;
  className?: string;
}

/**
 * Fills its (positioned) parent with a graded, blur-placeholdered photo.
 * Focal point comes from the data layer so every crop keeps the car in frame.
 */
export function CinematicImage({
  image,
  className,
  sizes = "100vw",
  quality = 80,
  style,
  ...rest
}: CinematicImageProps) {
  const meta = imageManifest[image.src];
  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      sizes={sizes}
      quality={quality}
      placeholder={meta ? "blur" : "empty"}
      blurDataURL={meta?.blurDataURL}
      className={cn("object-cover", className)}
      style={{ objectPosition: image.position ?? "50% 50%", ...style }}
      {...rest}
    />
  );
}
