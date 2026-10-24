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
    <section aria-label="Our commitments" className="border-t border-line bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Section header */}
        <div className="mb-14 flex items-center gap-4">
          <span className="h-px w-8 bg-gilt opacity-70" aria-hidden />
          <span className="t-label text-gilt">Our commitments</span>
        </div>

        <ul
          data-stagger
          className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-line"
        >
          {commitments.map((c, i) => {
            const Icon = icons[c.icon];
            return (
              <li key={c.title} className="group lg:px-9 lg:first:pl-0 lg:last:pr-0">
                <div className="flex items-start justify-between">
                  <Icon size={30} weight="light" className="text-gilt" aria-hidden />
                  <span className="t-label text-stone/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="display mt-7 text-[1.65rem] leading-[1.15]">{c.title}</h3>
                <p className="mt-3 max-w-[22rem] text-[0.9875rem] leading-[1.7]">{c.body}</p>
                <div className="mt-6 h-px w-0 bg-gilt transition-[width] duration-700 ease-lux group-hover:w-12" aria-hidden />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}