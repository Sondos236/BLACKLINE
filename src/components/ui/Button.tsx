"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "arrow-up" | "none";
  magnetic?: boolean;
  className?: string;
}

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">)
  );

const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-colors duration-500 ease-out-expo disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[0.9375rem]",
};

const variants: Record<Variant, string> = {
  solid: "border border-invert-bg bg-invert-bg text-invert-fg hover:text-fg",
  outline: "border border-line-strong text-fg hover:text-invert-fg hover:border-invert-bg",
  ghost: "px-0 h-auto text-fg",
};

// Fill that sweeps up from the bottom on hover.
const fills: Record<Variant, string | null> = {
  solid: "bg-bg",
  outline: "bg-invert-bg",
  ghost: null,
};

function Arrow({ kind }: { kind: "arrow" | "arrow-up" }) {
  const Icon = kind === "arrow" ? ArrowRight : ArrowUpRight;
  const out =
    kind === "arrow"
      ? "group-hover/btn:translate-x-[140%]"
      : "group-hover/btn:translate-x-[140%] group-hover/btn:-translate-y-[140%]";
  const into = kind === "arrow" ? "-translate-x-[140%]" : "-translate-x-[140%] translate-y-[140%]";
  return (
    <span aria-hidden="true" className="relative inline-flex size-4 overflow-hidden">
      <Icon
        className={cn("absolute inset-0 size-4 transition-transform duration-500 ease-out-expo", out)}
        strokeWidth={1.75}
      />
      <Icon
        className={cn(
          "absolute inset-0 size-4 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0",
          into,
        )}
        strokeWidth={1.75}
      />
    </span>
  );
}

export function Button(props: ButtonProps) {
  const { children, variant = "solid", size = "lg", icon = "arrow", magnetic = true, className, ...rest } = props;
  const magnetRef = useMagnetic<HTMLSpanElement>(magnetic ? 0.25 : 0);
  const fill = fills[variant];

  const content = (
    <>
      {fill && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-10 translate-y-full rounded-[inherit] transition-transform duration-500 ease-out-expo group-hover/btn:translate-y-0",
            fill,
          )}
        />
      )}
      <span className={cn(variant === "ghost" && "link-underline group-hover/btn:bg-[length:100%_1px]")}>
        {children}
      </span>
      {icon !== "none" && <Arrow kind={icon} />}
    </>
  );

  const classes = cn(base, sizes[size], variants[variant], className);

  return (
    <span ref={magnetRef} className="inline-flex">
      <motion.span className="inline-flex" whileTap={{ scale: 0.97 }}>
        {"href" in rest && rest.href !== undefined ? (
          <Link {...(rest as React.ComponentProps<typeof Link>)} className={classes}>
            {content}
          </Link>
        ) : (
          <button type="button" {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
            {content}
          </button>
        )}
      </motion.span>
    </span>
  );
}
