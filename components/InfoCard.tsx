import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

/** Generic InfoCard Container Component - Educational Demo Style */
export function InfoCard({ eyebrow, children, className = "" }: Props) {
  return (
    <section className={`relative ${className}`.trim()}>
      {eyebrow && (
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-linear-to-b from-(--accent-primary) to-(--accent-secondary) rounded-full"></div>
          <span className="text-xs font-semibold text-(--ink-muted) uppercase tracking-wider">
            {eyebrow}
          </span>
        </div>
      )}
      {children}
    </section>
  );
}
