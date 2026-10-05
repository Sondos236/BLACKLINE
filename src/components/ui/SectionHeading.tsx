import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "split";
  as?: "h1" | "h2";
  className?: string;
}

/** Editorial section header: index + eyebrow, large title, optional lead. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("grid gap-6", align === "split" && "lg:grid-cols-12 lg:items-end lg:gap-10", className)}>
      <div className={cn(align === "split" && "lg:col-span-7")}>
        <p className="t-meta mb-5 flex items-center gap-3" data-reveal="fade">
          {index && <span className="text-fg">{index}</span>}
          {index && <span aria-hidden="true" className="h-px w-8 bg-line-strong" />}
          <span>{eyebrow}</span>
        </p>
        <Tag className="t-heading" data-reveal="lines">
          {title}
        </Tag>
      </div>
      {lead && (
        <p
          className={cn("t-lead max-w-xl", align === "split" && "lg:col-span-5 lg:justify-self-end")}
          data-reveal="up"
          data-reveal-delay="0.15"
        >
          {lead}
        </p>
      )}
    </header>
  );
}
