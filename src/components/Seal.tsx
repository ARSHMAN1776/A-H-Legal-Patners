import { SEAL, SEAL_VIEWBOX } from "@/assets/logo-paths";
import { cn } from "@/lib/cn";

/**
 * The A&H seal, drawn from the same vector data used for print (brand/logo.py).
 * Class names (seal-line, seal-key, ...) are hooks for the intro animation in
 * MotionProvider; they do nothing on their own.
 */
export function Seal({ className, label = "A&H Legal Partners" }: { className?: string; label?: string }) {
  return (
    <svg viewBox={SEAL_VIEWBOX} role="img" aria-label={label} className={cn("seal block", className)} fill="none">
      <path className="seal-panel fill-gilt" fillOpacity={0.06} d={SEAL.panel} />
      <path className="seal-line stroke-gilt" pathLength={1} strokeWidth={2.4} d={SEAL.outer} />
      <path className="seal-line stroke-gilt" pathLength={1} strokeWidth={1.3} strokeOpacity={0.75} d={SEAL.inner} />
      <path className="seal-line stroke-gilt" pathLength={1} strokeWidth={2.4} d={SEAL.ground} />
      <path className="seal-key fill-gilt" d={SEAL.key} />
      <path className="seal-letter fill-ivory" d={SEAL.A} />
      <path className="seal-letter fill-gilt" d={SEAL.AMP} />
      <path className="seal-letter fill-ivory" d={SEAL.H} />
      <path className="seal-rule stroke-gilt" strokeWidth={1.1} strokeOpacity={0.8} d={SEAL.rule} />
      <path className="seal-lp fill-gilt-soft" d={SEAL.lp} />
    </svg>
  );
}

/** The archway on its own, with heavier lines so it stays legible at small sizes. */
export function SymbolMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-12 -4 424 512" aria-hidden className={cn("block", className)} fill="none">
      <path className="stroke-gilt" strokeWidth={22} d={SEAL.outer} />
      <path className="stroke-gilt" strokeWidth={11} strokeOpacity={0.7} d={SEAL.inner} />
      <path className="fill-gilt" d="M182 -4H218L209 32H191Z" />
    </svg>
  );
}
