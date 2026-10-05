import { formatSpec } from "@/data/cars";
import type { Car, Spec } from "@/types/car";
import { cn } from "@/lib/cn";

interface PerformanceStatsProps {
  car: Car;
  size?: "sm" | "lg";
  className?: string;
}

/** Compact three-up spec row: power, 0–100, top speed. */
export function PerformanceStats({ car, size = "sm", className }: PerformanceStatsProps) {
  const items: { label: string; spec: Spec }[] = [
    { label: "Power", spec: car.horsepower },
    { label: "0–100 km/h", spec: car.acceleration },
    { label: "Top speed", spec: car.topSpeed },
  ];

  return (
    <dl className={cn("grid grid-cols-3", className)}>
      {items.map(({ label, spec }) => (
        <div key={label} className="flex flex-col border-l border-line pl-3 first:border-l-0 first:pl-0 sm:pl-4">
          <dt className="t-meta order-2 mt-2 text-[0.625rem] sm:text-[0.6875rem]">{label}</dt>
          <dd
            className={cn(
              "t-num order-1",
              size === "lg" ? "text-[clamp(1.75rem,3.4vw,3rem)]" : "text-[clamp(1.375rem,2.2vw,1.875rem)]",
            )}
          >
            {spec.approx && <span className="text-fg-muted">≈</span>}
            {formatSpec(spec.value, spec.decimals)}
            <span className="ml-1 text-[0.4em] tracking-normal text-fg-muted">{spec.unit}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
