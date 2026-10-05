"use client";

import { useReveals } from "@/hooks/useReveals";

type RevealProps = {
  as?: "section" | "div" | "article" | "header";
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/** Lets server components opt into `data-reveal` / `data-parallax` animations. */
export function Reveal({ as: Tag = "div", children, ...rest }: RevealProps) {
  const ref = useReveals<HTMLElement>();
  return (
    <Tag ref={ref as React.Ref<never>} {...rest}>
      {children}
    </Tag>
  );
}
