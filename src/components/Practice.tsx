import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Button } from "@/components/Button";
import { practiceGroups, practiceIntro, practiceTagline } from "@/lib/content";

/**
 * Practice directory on the landing page.
 * Displays only the names of the practice areas as clean, direct links
 * that open directly into the detailed practice page.
 * Compact spacing optimized for mobile & small screens.
 */
export function Practice() {
  return (
    <section id="practice" className="bg-forest py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-line pb-8 sm:pb-10">
          <div className="max-w-2xl">
            {/* Section label */}
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-6 sm:w-8 bg-gilt opacity-70" aria-hidden />
              <span className="t-label text-gilt">What we do</span>
            </div>

            <h2 className="display t-section" data-split>
              Practice areas
            </h2>
            <p data-reveal className="mt-3 t-label text-gilt/80">
              {practiceTagline}
            </p>
            <p data-reveal className="mt-3 max-w-xl text-[0.9875rem] sm:text-[1.0625rem] text-stone">
              {practiceIntro}
            </p>
          </div>

          <div data-reveal className="shrink-0">
            <Button href="/practice" size="sm">
              View all 10 areas
            </Button>
          </div>
        </div>

        {/* 2-Column List of Practice Area Names - Compact row heights */}
        <div className="mt-6 sm:mt-10 grid gap-x-12 gap-y-0 md:grid-cols-2">
          {practiceGroups.map((group, i) => (
            <Link
              key={group.slug}
              to={`/practice#${group.slug}`}
              className="group flex items-center justify-between gap-4 border-b border-line py-3.5 sm:py-4.5 transition-colors duration-500 hover:border-gilt/60"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="t-label text-stone/40 text-[0.75rem] sm:text-[0.8125rem] transition-colors duration-500 group-hover:text-gilt shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-[clamp(1.25rem,1.8vw,1.75rem)] font-light leading-[1.25] text-ivory transition-transform duration-500 ease-lux group-hover:translate-x-1.5 group-hover:text-gilt-soft truncate">
                  {group.name}
                </span>
              </div>

              <span
                aria-hidden
                className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-full border border-line text-stone transition-[transform,background-color,border-color,color] duration-500 ease-lux group-hover:border-gilt group-hover:bg-gilt group-hover:text-ink group-hover:scale-105"
              >
                <ArrowUpRight size={15} weight="light" />
              </span>
            </Link>
          ))}
        </div>

        {/* Bottom prompt */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-line bg-ink/40 p-5 sm:p-6">
          <div>
            <p className="text-ivory text-[0.9875rem] font-light">
              Need counsel on a matter not listed here?
            </p>
            <p className="mt-0.5 text-[0.8125rem] text-stone">
              Our advocates advise across all subordinate and superior courts of Pakistan.
            </p>
          </div>
          <Link
            to="/practice"
            className="inline-flex items-center gap-2 text-[0.875rem] text-gilt hover:text-gilt-soft underline underline-offset-4 decoration-line hover:decoration-gilt transition-colors shrink-0"
          >
            <span>Read full practice scope</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
