import { cn } from "@/lib/cn";
import { brand } from "@/lib/brand";
import { SymbolMark } from "@/components/Seal";

/** Archway symbol + A&H + LEGAL PARTNERS: the wordmark arrangement for the navigation and tight spaces. */
export function Wordmark({ className, large = false }: { className?: string; large?: boolean }) {
  return (
    <span translate="no" className={cn("inline-flex items-center gap-3", className)}>
      <SymbolMark className={large ? "h-9 w-auto" : "h-7 w-auto"} />
      <span className="inline-flex items-baseline gap-2.5">
        <span
          className={cn(
            "display whitespace-nowrap font-medium leading-none",
            large ? "text-[2.5rem]" : "text-[1.85rem]",
          )}
        >
          A<span className="font-light italic text-gilt">&amp;</span>H
        </span>
        <span className="t-label whitespace-nowrap text-stone max-[420px]:hidden">{brand.suffix}</span>
      </span>
    </span>
  );
}
