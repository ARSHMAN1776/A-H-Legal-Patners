import { unsplash } from "@/lib/content";
import { cn } from "@/lib/cn";

type Props = {
  /** Unsplash photo id (see lib/content.ts). */
  id: string;
  alt: string;
  /** Standard `sizes` attribute, so the browser picks the right width. */
  sizes: string;
  /** Eager + high fetch priority for the single above-the-fold image. */
  priority?: boolean;
  className?: string;
};

export const IMG_WIDTHS = [480, 800, 1200, 1600, 2000];

/** Responsive image that fills its (positioned, sized) parent. */
export function Img({ id, alt, sizes, priority = false, className }: Props) {
  const srcSet = IMG_WIDTHS.map((w) => `${unsplash(id, w)} ${w}w`).join(", ");
  return (
    <img
      src={unsplash(id, 1200)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
