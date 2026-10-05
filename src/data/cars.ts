import type { Car, NumericSpecKey } from "@/types/car";

/**
 * BLACKLINE vehicle catalogue — the single source of truth for every page.
 *
 * Figures follow manufacturer-published data where available. Values flagged
 * `approx: true` are approximate (curb weights vary by market/standard) or come
 * from independent testing; the UI marks them with "≈". Swap this module for an
 * API call later — every consumer goes through the helpers at the bottom.
 */
export const cars: Car[] = [
  {
    id: "audi-rs7",
    slug: "audi-rs7",
    brand: "Audi",
    model: "RS7 Sportback",
    fullName: "Audi RS7 Sportback",
    shortName: "RS7",
    generation: "C8 · 2020–present",
    tagline: "The executive with a getaway plan.",
    description:
      "A five-door fastback that hides a twin-turbo V8 behind a silhouette sharp enough to cut glass. Quiet when it needs to be. Brutal when asked.",
    images: {
      hero: {
        src: "/images/cars/audi-rs7/hero.jpg",
        alt: "Audi RS7 Sportback in dark paint approaching on a tree-lined road",
        position: "50% 60%",
      },
      design: {
        src: "/images/cars/audi-rs7/design.jpg",
        alt: "Rear of an Audi RS7 with full-width light bar and RS 7 badge",
        position: "50% 55%",
      },
    },
    horsepower: { value: 591, unit: "hp", note: "600 PS" },
    torque: { value: 800, unit: "Nm" },
    acceleration: { value: 3.6, unit: "s", decimals: 1 },
    topSpeed: { value: 305, unit: "km/h", note: "With optional Dynamic package plus — 250 km/h limited as standard" },
    weight: { value: 2065, unit: "kg", approx: true, note: "Curb weight, varies by specification" },
    engine: "4.0L TFSI twin-turbo V8",
    engineShort: "V8 Biturbo",
    drivetrain: "quattro all-wheel drive",
    transmission: "8-speed tiptronic",
    design: [
      {
        eyebrow: "Silhouette",
        title: "A coupé roofline over four doors.",
        body: "The RS7 shares only its front doors, roof and tailgate with the A7. Everything else is widened, lowered and pulled tight over wheels up to 22 inches — a fastback drawn with a single uninterrupted line from windscreen to tail.",
      },
      {
        eyebrow: "Light",
        title: "A signature you recognise in the dark.",
        body: "The full-width rear light bar and laser-assisted Matrix LED headlights turn the car's outline into a graphic. Even parked, the RS7 is drawn in light rather than chrome.",
      },
    ],
    features: [
      {
        title: "quattro with sport differential",
        description:
          "Permanent all-wheel drive, with an optional rear sport differential that actively distributes torque between the rear wheels.",
      },
      {
        title: "RS adaptive air suspension",
        description:
          "Standard air suspension that lowers the body at speed, with RS sport suspension plus and Dynamic Ride Control available.",
      },
      {
        title: "Dynamic all-wheel steering",
        description:
          "Optional rear-axle steering that tightens the turning circle in town and adds stability at autobahn speeds.",
      },
      {
        title: "48V mild hybrid",
        description:
          "A 48-volt system with cylinder on demand lets the V8 coast and run on four cylinders under light load.",
      },
      {
        title: "RS ceramic brakes",
        description:
          "Optional carbon-ceramic discs, 440 mm at the front, for repeatable stopping power with reduced unsprung mass.",
      },
      {
        title: "HD Matrix LED with laser",
        description: "Adaptive headlights that shape the beam around traffic, with laser high beam for extended range.",
      },
    ],
    gallery: [
      {
        src: "/images/cars/audi-rs7/g1.jpg",
        alt: "Close-up of an Audi Matrix LED headlight signature",
        caption: "Matrix LED",
      },
      { src: "/images/cars/audi-rs7/g4.jpg", alt: "Front fascia of a black Audi Sportback", caption: "Front fascia" },
      { src: "/images/cars/audi-rs7/g2.jpg", alt: "Rain-covered Audi rear light bar", caption: "Light bar" },
      {
        src: "/images/cars/audi-rs7/g3.jpg",
        alt: "Black Audi with headlights on in a misty forest",
        caption: "After dark",
      },
    ],
  },
  {
    id: "bmw-m5-competition",
    slug: "bmw-m5-competition",
    brand: "BMW",
    model: "M5 Competition",
    fullName: "BMW M5 Competition",
    shortName: "M5",
    generation: "F90 · 2018–2023",
    tagline: "The business sedan that clocks out early.",
    description:
      "Four doors, four seats and a 4.4-litre twin-turbo V8. The M5 Competition is the sharpest form of BMW's super-sedan formula — with a rear-wheel-drive mode for when the road runs out of rules.",
    images: {
      hero: {
        src: "/images/cars/bmw-m5-competition/hero.jpg",
        alt: "Black BMW M5 Competition parked in front of a dark industrial building",
        position: "50% 66%",
      },
      design: {
        src: "/images/cars/bmw-m5-competition/design.jpg",
        alt: "Front view of a dark BMW M5 with kidney grille and illuminated headlights",
        position: "50% 55%",
      },
    },
    horsepower: { value: 617, unit: "hp", note: "625 PS" },
    torque: { value: 750, unit: "Nm" },
    acceleration: { value: 3.3, unit: "s", decimals: 1 },
    topSpeed: { value: 305, unit: "km/h", note: "With M Driver's Package — 250 km/h limited as standard" },
    weight: { value: 1940, unit: "kg", approx: true, note: "DIN curb weight, varies by specification" },
    engine: "4.4L M TwinPower Turbo V8",
    engineShort: "V8 Twin-Turbo",
    drivetrain: "M xDrive (with 2WD mode)",
    transmission: "8-speed M Steptronic",
    design: [
      {
        eyebrow: "Restraint",
        title: "Menace, filed down to a whisper.",
        body: "The M5 doesn't shout. Wider front air intakes, gills behind the front wheels and a carbon roof are the only clues. It is a design built on understatement — the most powerful thing in the car park, dressed for the boardroom.",
      },
      {
        eyebrow: "Competition",
        title: "Tighter, lower, louder.",
        body: "Competition models sit 7 mm lower than the standard car, with stiffer engine mounts, revised suspension kinematics and a sports exhaust. Gloss-black details replace chrome, sharpening the car's darker character.",
      },
    ],
    features: [
      {
        title: "M xDrive",
        description:
          "Rear-biased all-wheel drive with 4WD, 4WD Sport and a pure rear-wheel-drive 2WD mode with stability control off.",
      },
      {
        title: "Adaptive M suspension",
        description:
          "Electronically controlled dampers with Competition-specific tuning, stiffer mounts and a 7 mm lower ride height.",
      },
      {
        title: "M Carbon ceramic brakes",
        description:
          "Optional carbon-ceramic system with gold calipers for fade resistance on track and lower unsprung weight.",
      },
      {
        title: "M Mode",
        description:
          "Road, Sport and Track settings that reconfigure displays and driver assistance in a single press.",
      },
      {
        title: "M1 / M2 setups",
        description: "Two steering-wheel buttons store complete engine, chassis, steering and gearbox configurations.",
      },
      {
        title: "Driving Assistant Professional",
        description:
          "Adaptive cruise with steering and lane-keeping assistance for the long, quiet kilometres in between.",
      },
    ],
    gallery: [
      {
        src: "/images/cars/bmw-m5-competition/g1.jpg",
        alt: "BMW M5 headlight and front wheel with red brake caliper",
        caption: "Headlight",
      },
      {
        src: "/images/cars/bmw-m5-competition/g2.jpg",
        alt: "Rear of a BMW M5 with M5 badge and tail lights",
        caption: "The badge",
      },
      {
        src: "/images/cars/bmw-m5-competition/g3.jpg",
        alt: "Rain-covered BMW M5 headlight next to the kidney grille",
        caption: "Weather",
      },
      {
        src: "/images/cars/bmw-m5-competition/g4.jpg",
        alt: "Dark BMW sedan reflected in a puddle under a heavy sky",
        caption: "Reflection",
      },
    ],
  },
  {
    id: "bmw-m3-competition",
    slug: "bmw-m3-competition",
    brand: "BMW",
    model: "M3 Competition",
    fullName: "BMW M3 Competition",
    shortName: "M3",
    generation: "G80 · M xDrive",
    tagline: "The benchmark, sharpened.",
    description:
      "The car every sports sedan is measured against. A 3.0-litre straight-six, a rear-biased all-wheel-drive system that can disconnect the front axle, and a chassis tuned for drivers who count tenths.",
    images: {
      hero: {
        src: "/images/cars/bmw-m3-competition/hero.jpg",
        alt: "Rear three-quarter view of a black BMW M3 Competition on wet tarmac",
        position: "50% 62%",
      },
      design: {
        src: "/images/cars/bmw-m3-competition/design.jpg",
        alt: "Black BMW M3 Competition parked among concrete industrial blocks",
        position: "50% 65%",
      },
    },
    horsepower: { value: 503, unit: "hp", note: "510 PS" },
    torque: { value: 650, unit: "Nm" },
    acceleration: { value: 3.5, unit: "s", decimals: 1 },
    topSpeed: { value: 290, unit: "km/h", note: "With M Driver's Package — 250 km/h limited as standard" },
    weight: { value: 1780, unit: "kg", approx: true, note: "DIN curb weight, varies by specification" },
    engine: "3.0L M TwinPower Turbo inline-6",
    engineShort: "Inline-6 Twin-Turbo",
    drivetrain: "M xDrive (with 2WD mode)",
    transmission: "8-speed M Steptronic",
    design: [
      {
        eyebrow: "Stance",
        title: "Wide where it matters.",
        body: "Flared arches, a sculpted bonnet with power dome and a staggered wheel set give the M3 an athlete's posture. The controversial vertical kidney grille feeds a straight-six that needs every gram of cool air it can get.",
      },
      {
        eyebrow: "Rear",
        title: "Four tailpipes, no apology.",
        body: "A diffuser framing quad exhausts, a carbon lip spoiler and wide rear haunches make the M3's intent obvious from behind — which is where most people will see it.",
      },
    ],
    features: [
      {
        title: "M xDrive",
        description:
          "Rear-biased all-wheel drive with 4WD, 4WD Sport and a 2WD mode that sends everything to the rear wheels.",
      },
      {
        title: "M Traction Control",
        description:
          "Ten-stage adjustable traction control lets the driver choose exactly how much slip the car allows.",
      },
      {
        title: "M Drift Analyser",
        description: "Records drift angle, distance and duration — data for drivers who want to know how it went.",
      },
      {
        title: "Adaptive M suspension",
        description: "Electronically controlled dampers with distinct Comfort, Sport and Sport Plus character.",
      },
      {
        title: "M Carbon bucket seats",
        description:
          "Optional lightweight carbon-shell seats with illuminated M3 logos and integrated head restraints.",
      },
      {
        title: "M Carbon ceramic brakes",
        description: "Optional carbon-ceramic brakes for sustained track use with significantly lower unsprung mass.",
      },
    ],
    gallery: [
      {
        src: "/images/cars/bmw-m3-competition/g1.jpg",
        alt: "BMW M3 Competition driving on a motorway with motion blur",
        caption: "In motion",
      },
      {
        src: "/images/cars/bmw-m3-competition/g2.jpg",
        alt: "BMW M3 headlights glowing in total darkness",
        caption: "Night signature",
      },
      {
        src: "/images/cars/bmw-m3-competition/g3.jpg",
        alt: "BMW M3 headlights in an underground car park",
        caption: "Underground",
      },
    ],
  },
  {
    id: "dodge-charger-srt-hellcat",
    slug: "dodge-charger-srt-hellcat",
    brand: "Dodge",
    model: "Charger SRT Hellcat",
    fullName: "Dodge Charger SRT Hellcat Widebody",
    shortName: "Hellcat",
    generation: "Widebody · 2020–2023",
    tagline: "Seven hundred horsepower of bad manners.",
    description:
      "A full-size four-door with a supercharged 6.2-litre HEMI V8 and a supercharger whine you hear before you see it. The Hellcat is the loudest argument for internal combustion ever put on sale.",
    images: {
      hero: {
        src: "/images/cars/dodge-charger-srt-hellcat/hero.jpg",
        alt: "Dodge Charger SRT Hellcat Widebody in matte dark paint, front three-quarter view",
        position: "50% 58%",
      },
      design: {
        src: "/images/cars/dodge-charger-srt-hellcat/design.jpg",
        alt: "Black Dodge Charger parked on a city street at dusk with headlights on",
        position: "50% 75%",
      },
    },
    horsepower: { value: 717, unit: "hp" },
    torque: { value: 881, unit: "Nm", note: "650 lb-ft" },
    acceleration: {
      value: 3.7,
      unit: "s",
      decimals: 1,
      approx: true,
      note: "Independent test figure — not officially published",
    },
    topSpeed: { value: 315, unit: "km/h", note: "196 mph (manufacturer figure)" },
    weight: { value: 2080, unit: "kg", approx: true, note: "Curb weight, approximately 4,590 lb" },
    engine: "6.2L supercharged HEMI V8",
    engineShort: "Supercharged V8",
    drivetrain: "Rear-wheel drive",
    transmission: "8-speed TorqueFlite automatic",
    design: [
      {
        eyebrow: "Widebody",
        title: "Three and a half inches of intent.",
        body: "Bolted-on fender flares add 3.5 inches of width over 305-section tyres. The result is a sedan with the shoulders of a heavyweight — and the grip to put more of its power down.",
      },
      {
        eyebrow: "Presence",
        title: "Built to be heard first.",
        body: "A functional hood scoop, an Air-Catcher headlamp that breathes straight into the airbox and a full-width tail lamp. Nothing on the Hellcat is subtle, and nothing is there by accident.",
      },
    ],
    features: [
      {
        title: "Supercharged HEMI",
        description:
          "A 2.4-litre supercharger forces air into a 6.2-litre V8 for 717 hp — sent entirely to the rear wheels.",
      },
      {
        title: "SRT Power Chiller",
        description:
          "Diverts the air-conditioning refrigerant to cool the supercharger's charge air for consistent power in heat.",
      },
      {
        title: "Brembo braking",
        description:
          "Six-piston front calipers clamp large two-piece rotors to haul two tonnes down from triple-digit speeds.",
      },
      {
        title: "Adaptive damping",
        description: "Bilstein three-mode adaptive dampers switch between street, sport and track character.",
      },
      {
        title: "Launch Control & Line Lock",
        description: "Holds the front brakes for burnouts and manages wheelspin for repeatable launches.",
      },
      {
        title: "Red & Black keys",
        description: "The red key unlocks full output; the black key limits power for valets and lesser days.",
      },
    ],
    gallery: [
      {
        src: "/images/cars/dodge-charger-srt-hellcat/g1.jpg",
        alt: "SRT Hellcat badge on the fender of a Dodge",
        caption: "The emblem",
      },
      {
        src: "/images/cars/dodge-charger-srt-hellcat/g2.jpg",
        alt: "Black Dodge Charger alone on a salt flat under a wide sky",
        caption: "Open ground",
      },
      {
        src: "/images/cars/dodge-charger-srt-hellcat/g3.jpg",
        alt: "Black Dodge Charger on a salt flat, front three-quarter view",
        caption: "Horizon",
      },
      {
        src: "/images/cars/dodge-charger-srt-hellcat/g4.jpg",
        alt: "Dodge Charger SRT on an industrial steel bridge",
        caption: "Steel",
      },
    ],
  },
  {
    id: "lamborghini-revuelto",
    slug: "lamborghini-revuelto",
    brand: "Lamborghini",
    model: "Revuelto",
    fullName: "Lamborghini Revuelto",
    shortName: "Revuelto",
    generation: "HPEV · 2023–present",
    tagline: "A V12, electrified — not tamed.",
    description:
      "Lamborghini's first V12 plug-in hybrid flagship. A naturally aspirated 6.5-litre V12 and three electric motors combine for over a thousand horsepower, wrapped in a carbon-fibre monofuselage.",
    images: {
      hero: {
        src: "/images/cars/lamborghini-revuelto/hero.jpg",
        alt: "Black Lamborghini Revuelto parked at night in front of a modern building",
        position: "50% 76%",
      },
      design: {
        src: "/images/cars/lamborghini-revuelto/design.jpg",
        alt: "Side profile of a Lamborghini Revuelto against a plain wall",
        position: "50% 60%",
      },
    },
    horsepower: { value: 1001, unit: "hp", note: "1,015 CV combined" },
    torque: { value: 725, unit: "Nm", note: "V12 only — combined figure not published" },
    acceleration: { value: 2.5, unit: "s", decimals: 1 },
    topSpeed: { value: 350, unit: "km/h", note: "Over 350 km/h (manufacturer figure)" },
    weight: { value: 1772, unit: "kg", note: "Dry weight" },
    engine: "6.5L V12 + three electric motors",
    engineShort: "V12 Hybrid",
    drivetrain: "All-wheel drive (electric front axle)",
    transmission: "8-speed dual-clutch",
    design: [
      {
        eyebrow: "Form",
        title: "A spaceship, drawn by hand.",
        body: "The Revuelto keeps the wedge — the profile Lamborghini has drawn since the Countach — and cuts it with Y-shaped light signatures, a V12 left exposed in an open engine bay and scissor doors that still open towards the sky.",
      },
      {
        eyebrow: "Structure",
        title: "Carbon from nose to tail.",
        body: "A carbon-fibre 'monofuselage' borrowed from aeronautics forms the front structure, with forged-composite elements throughout. The battery lives in the central tunnel, where the gearbox once was.",
      },
    ],
    features: [
      {
        title: "HPEV architecture",
        description:
          "A 6.5-litre naturally aspirated V12 paired with three electric motors — two on the front axle, one on the gearbox.",
      },
      {
        title: "Electric front axle",
        description:
          "Independent front motors enable all-wheel drive and torque vectoring, and allow pure-electric running.",
      },
      {
        title: "Carbon monofuselage",
        description: "An aeronautics-inspired carbon-fibre structure that is lighter and stiffer than the Aventador's.",
      },
      {
        title: "Active aerodynamics",
        description: "An active rear wing adjusts between low drag and high downforce depending on the drive mode.",
      },
      {
        title: "Thirteen driving modes",
        description: "Città, Strada, Sport and Corsa combine with Recharge, Hybrid and Performance settings.",
      },
      {
        title: "Carbon-ceramic brakes",
        description: "Standard carbon-ceramic system with ten-piston front calipers and brake-energy recovery.",
      },
    ],
    gallery: [
      {
        src: "/images/cars/lamborghini-revuelto/g1.jpg",
        alt: "Rear of a Lamborghini Revuelto with Revuelto badge and exposed engine",
        caption: "Exposed",
      },
      {
        src: "/images/cars/lamborghini-revuelto/g2.jpg",
        alt: "Rear diffuser and Y-shaped tail light of a Lamborghini Revuelto",
        caption: "Diffuser",
      },
      {
        src: "/images/cars/lamborghini-revuelto/g3.jpg",
        alt: "Lamborghini Revuelto with scissor doors raised",
        caption: "Doors up",
      },
      {
        src: "/images/cars/lamborghini-revuelto/g4.jpg",
        alt: "Revuelto script badge on the side of the car",
        caption: "Script",
      },
      {
        src: "/images/cars/lamborghini-revuelto/g5.jpg",
        alt: "Close-up of a Lamborghini Revuelto wheel and front fender",
        caption: "Stance",
      },
    ],
  },
];

/* ---------------------------------------------------------------- helpers */

export function getAllCars(): Car[] {
  return cars;
}

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((c) => c.slug === slug);
}

export function getAdjacentCar(slug: string, offset = 1): Car {
  const i = cars.findIndex((c) => c.slug === slug);
  return cars[(i + offset + cars.length) % cars.length];
}

/** Whether a higher value of a spec is "better" — used for compare highlighting. */
export const specDirection: Record<NumericSpecKey, "higher" | "lower"> = {
  horsepower: "higher",
  torque: "higher",
  acceleration: "lower",
  topSpeed: "higher",
  weight: "lower",
};

export const specLabels: Record<NumericSpecKey, string> = {
  horsepower: "Horsepower",
  torque: "Torque",
  acceleration: "0–100 km/h",
  topSpeed: "Top speed",
  weight: "Weight",
};

export function formatSpec(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export const combinedHorsepower = cars.reduce((sum, c) => sum + c.horsepower.value, 0);
