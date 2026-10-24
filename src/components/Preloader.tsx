import { brand } from "@/lib/brand";
import { Seal } from "@/components/Seal";

/**
 * Intro curtain. Hidden by CSS unless JS is running, motion is allowed and the
 * visitor has not already seen it this session (see the inline script in
 * index.html). MotionProvider draws the seal, then lifts the curtain and
 * reveals the hero.
 */
export function Preloader() {
  return (
    <div id="intro" className="intro" aria-hidden="true">
      <div className="flex flex-col items-center gap-7" data-intro-inner>
        <Seal className="h-[min(54dvh,28rem)] w-auto" label="" />
        <span data-intro-urdu lang="ur" dir="rtl" className="urdu text-[1.5rem] text-gilt-soft">
          {brand.urdu}
        </span>
      </div>
    </div>
  );
}
