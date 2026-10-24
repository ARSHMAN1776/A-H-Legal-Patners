import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

type Crumb = {
  label: string;
  href?: string;
};

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: Crumb[];
  children?: ReactNode;
  className?: string;
};

export function PageHeader({
  badge,
  title,
  subtitle,
  breadcrumbs,
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-line bg-gradient-to-b from-forest to-ink pt-32 pb-16 md:pt-44 md:pb-24",
        className,
      )}
    >
      {/* Subtle background ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-gilt/[0.04] blur-3xl"
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Breadcrumb row */}
        <nav aria-label="Breadcrumbs" className="mb-8 flex items-center gap-2 text-[0.8125rem]">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <div key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <CaretRight size={12} weight="bold" className="text-stone/40" />}
                {crumb.href && !isLast ? (
                  <Link
                    to={crumb.href}
                    className="text-stone transition-colors duration-500 hover:text-ivory"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gilt font-medium">{crumb.label}</span>
                )}
              </div>
            );
          })}
        </nav>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {badge && (
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-6 bg-gilt" aria-hidden />
                <span className="t-label text-gilt">{badge}</span>
              </div>
            )}
            <h1 className="display text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.08] text-ivory">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.75] text-stone">
                {subtitle}
              </p>
            )}
          </div>

          {children && (
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
