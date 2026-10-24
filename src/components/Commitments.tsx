import {
  ChatCircleText,
  LockKey,
  PhoneCall,
  Receipt,
} from "@phosphor-icons/react";
import { commitments } from "@/lib/content";

const icons = {
  lock: LockKey,
  receipt: Receipt,
  chat: ChatCircleText,
  phone: PhoneCall,
} as const;

export function Commitments() {
  return (
    <section aria-label="Our commitments" className="border-t border-line bg-ink py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Section header */}
        <div className="mb-8 sm:mb-12 flex items-center gap-4">
          <span className="h-px w-6 sm:w-8 bg-gilt opacity-70" aria-hidden />
          <span className="t-label text-gilt">Our commitments</span>
        </div>

        <ul
          data-stagger
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line"
        >
          {commitments.map((c, i) => {
            const Icon = icons[c.icon];
            return (
              <li key={c.title} className="group rounded-xl border border-line/40 bg-forest/15 p-5 sm:p-6 lg:border-none lg:bg-transparent lg:p-0 lg:px-9 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-start justify-between">
                  <Icon size={26} weight="light" className="text-gilt" aria-hidden />
                  <span className="t-label text-stone/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="display mt-4 sm:mt-5 text-[1.4rem] sm:text-[1.55rem] leading-[1.2]">{c.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-stone">{c.body}</p>
                <div className="mt-4 h-px w-0 bg-gilt transition-[width] duration-700 ease-lux group-hover:w-10" aria-hidden />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}