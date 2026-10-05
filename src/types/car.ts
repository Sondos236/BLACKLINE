export interface CarImage {
  src: string;
  alt: string;
  /** CSS object-position used when the frame crops the photo. */
  position?: string;
  caption?: string;
}

export interface Spec {
  value: number;
  unit: string;
  decimals?: number;
  /** True when the figure is an independent/approximate value rather than an official one. */
  approx?: boolean;
  note?: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface DesignChapter {
  eyebrow: string;
  title: string;
  body: string;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  fullName: string;
  /** Short display name used for oversized typography (e.g. "RS7"). */
  shortName: string;
  generation: string;
  tagline: string;
  description: string;
  images: {
    hero: CarImage;
    design: CarImage;
  };
  horsepower: Spec;
  torque: Spec;
  acceleration: Spec;
  topSpeed: Spec;
  weight: Spec;
  engine: string;
  engineShort: string;
  drivetrain: string;
  transmission: string;
  design: [DesignChapter, DesignChapter];
  features: Feature[];
  gallery: CarImage[];
}

export type NumericSpecKey = "horsepower" | "torque" | "acceleration" | "topSpeed" | "weight";
