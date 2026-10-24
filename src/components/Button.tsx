import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "link";
  size?: "md" | "sm";
  /** Applied to the outer wrapper (layout, visibility). */
  className?: string;
  onClick?: () => void;
};

/**
 * Primary: pill with a nested circular arrow ("button in button").
 * If href is internal (starts with "/"), uses React Router Link.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: Props) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (variant === "link") {
    if (isInternal) {
      return (
        <Link
          to={href}
          onClick={onClick}
          className={cn("link-line text-[0.9375rem] tracking-wide", className)}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        onClick={onClick}
        className={cn("link-line text-[0.9375rem] tracking-wide", className)}
      >
        {children}
      </a>
    );
  }

  const sm = size === "sm";
  const pillClasses = cn(
    "group inline-flex items-center rounded-full bg-gilt font-medium tracking-wide text-ink",
    "transition-[transform,background-color] duration-700 ease-lux hover:bg-gilt-soft active:scale-[0.98]",
    sm ? "gap-3 py-1.5 pl-5 pr-1.5 text-[0.8125rem]" : "gap-5 py-2 pl-7 pr-2 text-[0.9375rem]",
  );

  const innerContent = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      <span
        className={cn(
          "grid place-items-center rounded-full bg-ink text-gilt",
          "transition-transform duration-700 ease-lux group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105",
          sm ? "size-8" : "size-10",
        )}
      >
        <ArrowUpRight size={sm ? 15 : 18} weight="light" aria-hidden />
      </span>
    </>
  );

  return (
    <span data-magnetic className={cn("inline-block", className)}>
      {isInternal ? (
        <Link to={href} onClick={onClick} className={pillClasses}>
          {innerContent}
        </Link>
      ) : (
        <a href={href} onClick={onClick} className={pillClasses}>
          {innerContent}
        </a>
      )}
    </span>
  );
}
