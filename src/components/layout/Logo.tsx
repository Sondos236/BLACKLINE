import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="BLACKLINE — home" className={cn("group inline-flex items-center gap-3", className)}>
      <span aria-hidden="true" className="relative block h-3 w-6 overflow-hidden">
        <span className="absolute inset-x-0 top-0 h-px bg-current" />
        <span className="absolute top-1/2 left-0 h-px w-full origin-left -translate-y-1/2 scale-x-[0.66] bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
        <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-[0.33] bg-current transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
      </span>
      <span className="font-display text-[0.95rem] font-semibold tracking-[0.32em] [font-variation-settings:'wdth'_118]">
        BLACKLINE
      </span>
    </Link>
  );
}
