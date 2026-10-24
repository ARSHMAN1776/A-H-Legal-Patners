import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "@/components/Button";
import { practiceGroups, practiceIntro, practiceTagline } from "@/lib/content";

/**
 * Practice directory on the landing page.
 * Displays only the names of the practice areas as clean, direct links
 * that open directly into the detailed practice page.
 * No changing/swapping content on the side.
 */
export function Practice() {
  return (
    <section id="practice" className="bg-forest py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-line pb-12">
          <div className="max-w-2xl">
            {/* Section label */}
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-gilt opacity-70" aria-hidden />
              <span className="t-label text-gilt">What we do</span>
            </div>

            <h2 className="display t-section" data-split>
              Practice areas
            </h2>
            <p data-reveal className="mt-4 t-label text-gilt/80">
              {practiceTagline}
            </p>
            <p data-reveal className="mt-4 max-w-xl text-[1.0625rem] text-stone">
              {practiceIntro}
            </p>
          </div>

          <div data-reveal className="shrink-0">
            <Button href="/practice">
              View all 10 practice areas
            </Button>
          </div>
        </div>

        {/* 2-Column List of Practice Area Names - No changing content on hover */}
        <div className="mt-12 grid gap-x-16 gap-y-0 md:grid-cols-2">
          {practiceGroups.map((group, i) => (
            <Link
              key={group.slug}
              to={`/practice#${group.slug}`}
              className="group flex items-center justify-between gap-6 border-b border-line py-5 lg:py-6 transition-colors duration-500 hover:border-gilt/60"
            >
              <div className="flex items-center gap-5 min-w-0">
                <span className="t-label text-stone/40 transition-colors duration-500 group-hover:text-gilt shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-[clamp(1.4rem,2vw,1.95rem)] font-light leading-[1.25] text-ivory transition-transform duration-500 ease-lux group-hover:translate-x-2 group-hover:text-gilt-soft truncate">
                  {group.name}
                </span>
              </div>

              <span
                aria-hidden
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-stone transition-[transform,background-color,border-color,color] duration-500 ease-lux group-hover:border-gilt group-hover:bg-gilt group-hover:text-ink group-hover:scale-105"
              >
                <ArrowUpRight size={17} weight="light" />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom prompt */}
        <div className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-line bg-ink/40 p-6 md:p-8">
          <div>
            <p className="text-ivory text-[1.0625rem] font-light">
              Need counsel on a matter not listed here?
            </p>
            <p className="mt-1 text-[0.875rem] text-stone">
              Our advocates advise across all subordinate and superior courts of Pakistan.
            </p>
          </div>
          <Link
            to="/practice"
            className="inline-flex items-center gap-3 text-[0.9375rem] text-gilt hover:text-gilt-soft underline underline-offset-4 decoration-line hover:decoration-gilt transition-colors shrink-0"
          >
            <span>Read full practice specifications</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
