import { useState } from "react";
import { Link } from "react-router-dom";
import { faq } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  // Show top 5 key questions on landing page, pointing to /questions for full catalogue
  const displayFaqs = faq.slice(0, 5);

  return (
    <section id="questions" className="bg-ink py-16 sm:py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            {/* Section label */}
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-6 sm:w-8 bg-gilt opacity-70" aria-hidden />
              <span className="t-label text-gilt">FAQ</span>
            </div>

            <h2 className="display t-section" data-split>
              Before you call
            </h2>
            <p data-reveal className="mt-4 sm:mt-6 max-w-sm text-[0.9875rem] text-stone">
              Straight answers to what most people ask first. For our full categorized advisory, browse our guidance directory.
            </p>

            <div data-reveal className="mt-6 sm:mt-8">
              <Link
                to="/questions"
                className="t-label inline-flex items-center gap-3 text-gilt hover:text-gilt-soft transition-colors duration-500"
              >
                <span>Browse all 16+ questions & guidance</span>
                <span className="h-px w-6 bg-current" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <ul data-stagger className="lg:col-span-7 lg:col-start-6">
          {displayFaqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line first:border-t">
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-5 py-4 sm:py-5 text-left"
                  >
                    <span
                      className={cn(
                        "display text-[clamp(1.2rem,1.8vw,1.65rem)] leading-[1.3] transition-colors duration-700 ease-lux",
                        isOpen ? "text-ivory" : "text-ivory/80 group-hover:text-ivory",
                      )}
                    >
                      {item.q}
                    </span>
                    <span aria-hidden className="relative block size-4.5 sm:size-5 shrink-0">
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gilt" />
                      <span
                        className={cn(
                          "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gilt",
                          "transition-transform duration-700 ease-lux",
                          isOpen && "rotate-90",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  inert={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-700 ease-lux",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-5 sm:pb-6 text-[0.9375rem] leading-[1.7] text-stone">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
