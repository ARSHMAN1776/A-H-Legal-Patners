import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass, Phone, ChatCircleText, ArrowUpRight } from "@phosphor-icons/react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { firm } from "@/lib/content";
import { cn } from "@/lib/cn";

type FAQItem = {
  q: string;
  a: string;
  category: "consultation" | "stay" | "fees" | "property" | "criminal" | "overseas";
};

const allFaqs: FAQItem[] = [
  {
    category: "consultation",
    q: "Is my initial consultation strictly confidential and protected by law?",
    a: "Yes. From the moment you contact our chambers, everything you disclose is protected by legal professional privilege under Article 9 of the Qanun-e-Shahadat Order 1984, as well as the Canons of Professional Conduct of the Punjab Bar Council. This privilege applies unconditionally, whether or not you ultimately decide to retain our firm.",
  },
  {
    category: "stay",
    q: "How quickly can an emergency stay order be obtained at the Lahore High Court?",
    a: "In genuine emergencies involving imminent demolition, unlawful arrest, illegal dispossessions, or auction of mortgaged assets, we draft, vet, and file urgent writ petitions on a motion basis. Subject to court working hours and registry scrutiny, matters can be brought before a motion bench of the High Court within 24 to 48 hours for immediate ad-interim injunctive relief.",
  },
  {
    category: "fees",
    q: "How are your legal fees structured and agreed upon?",
    a: "We operate with total transparency. Before a single hour of work begins, we agree on the fee basis in writing. Depending on the nature of the matter, fees are structured as fixed stage fees (e.g. initial filing, evidence stage, final arguments), an hourly rate for corporate advisory, or a capped litigation retainer. Out-of-pocket court fees and process expenses are stated separately without markups.",
  },
  {
    category: "consultation",
    q: "What documents should I bring to our first meeting?",
    a: "Bring all primary documents related to your matter: agreements, sale deeds, impugned notices, impugned court orders, police FIRs, or relevant correspondence. Also prepare a chronological summary of key dates and events. If you do not possess all certified records, we can facilitate expedited requisition from relevant court or revenue registries.",
  },
  {
    category: "consultation",
    q: "Do you advise and conduct proceedings in Urdu?",
    a: "Yes. We advise fluently in both Urdu and English. Client conferences, tactical advice, and case explanations can be conducted entirely in Urdu or Punjabi according to your preference, while court pleadings and superior court arguments are framed in English or Urdu as required by procedural rules.",
  },
  {
    category: "overseas",
    q: "How do you represent Overseas Pakistanis residing in the UK, USA, or Gulf?",
    a: "A substantial portion of our practice is dedicated to Overseas Pakistanis. We represent clients without requiring them to travel to Pakistan by utilizing Special Powers of Attorney (Mokhtarnama) attested via Pakistani High Commissions or Consulates abroad. All case updates, strategy meetings, and hearing debriefs are conducted via secure video conference and WhatsApp.",
  },
  {
    category: "stay",
    q: "What are the primary grounds for filing an Article 199 Constitutional Writ Petition?",
    a: "A Writ Petition under Article 199 is filed before the Lahore High Court against unlawful, arbitrary, or unconstitutional acts or omissions of state authorities, public functionaries, or statutory bodies (e.g., LDA, FBR, Police, Municipal Corporations, Universities) where no alternate efficacious remedy is provided by law, or to enforce fundamental human rights.",
  },
  {
    category: "criminal",
    q: "What is the difference between Pre-Arrest and Post-Arrest Bail?",
    a: "Pre-Arrest Bail (Bail before Arrest) is sought under Section 498 CrPC to safeguard an accused from imminent arrest in a cognizable offence where the motive is shown to be mala fide, harassment, or ulterior motive. Post-Arrest Bail is sought under Section 497 CrPC after the accused has been arrested and remanded, arguing lack of incriminating evidence, statutory delay, or further inquiry.",
  },
  {
    category: "criminal",
    q: "Can a false or malicious FIR be quashed by the High Court?",
    a: "Yes. Under Section 561-A of the Criminal Procedure Code (CrPC) or Article 199 of the Constitution, the Lahore High Court possesses inherent powers to quash an FIR where the allegations do not disclose the commission of any cognizable offence, where civil disputes are dressed up as criminal offences, or where the prosecution is manifestly malicious.",
  },
  {
    category: "property",
    q: "How long does a civil suit for property partition or specific performance take?",
    a: "Under the amended Civil Procedure Code (CPC) in Punjab, trial courts operate under expedited case management timelines. While traditional civil litigation historically experienced delays, interlocutory stay applications are resolved early. A contested trial through evidence typically spans 12 to 24 months, followed by decree execution.",
  },
  {
    category: "property",
    q: "How are Succession Certificates and Letters of Administration obtained?",
    a: "For movable assets (bank accounts, shares, savings certificates) and immovable estate, NADRA has instituted administrative succession certificates for uncontested heirs. Where a dispute, minor heir, or foreign property exists, we institute formal petition proceedings before the Civil Courts or District Judge under the Succession Act 1925 to obtain judicial Letters of Administration.",
  },
  {
    category: "stay",
    q: "What happens if an opposing party or authority violates a High Court stay order?",
    a: "Willful violation of a High Court injunction constitutes Contempt of Court under Article 204 of the Constitution and the Contempt of Court Ordinance. We file emergency contempt petitions seeking immediate notice, personal appearance of the contemnor, restoration of the status quo ante, and punitive measures.",
  },
  {
    category: "fees",
    q: "Do you offer corporate or commercial retainers for businesses?",
    a: "Yes. We advise mid-market corporations, family enterprises, and institutional clients on annual or monthly retainers. This includes routine contract vetting, employment advisory, SECP filings, pre-litigation notices, and priority representation in court disputes at preferential rates.",
  },
  {
    category: "criminal",
    q: "What immediate steps should be taken if summoned by NAB or FIA?",
    a: "Never attend an inquiry or interrogation before regulatory or accountability bodies like NAB or FIA without prior legal counsel. We review the call-up notice, prepare written replies establishing bona fides, and where apprehension of unlawful arrest exists, file for pre-arrest protective bail before the High Court.",
  },
  {
    category: "property",
    q: "Do you handle property title verification before land acquisition?",
    a: "Yes. Prior to property transactions or execution of sale agreements in Lahore and across Punjab, we conduct rigorous due diligence: examining Sub-Registrar records, Patwari mutation registries (Intiqal), LDA / DHA town-planning approvals, and court caveats to guarantee unencumbered title.",
  },
  {
    category: "overseas",
    q: "Do you handle appeals and revisions before benches outside Lahore?",
    a: "Our principal seat is at the Lahore High Court, but we actively appear before the Multan, Rawalpindi, and Bahawalpur benches of the High Court, as well as coordinate Civil & Criminal Petitions for Leave to Appeal (CPLA) before the Supreme Court of Pakistan in Islamabad.",
  },
];

const categoryLabels = [
  { label: "All Questions", key: "all" },
  { label: "Consultation & Privilege", key: "consultation" },
  { label: "High Court & Stays", key: "stay" },
  { label: "Fees & Retainers", key: "fees" },
  { label: "Property & Civil", key: "property" },
  { label: "Criminal & Bails", key: "criminal" },
  { label: "Overseas Pakistanis", key: "overseas" },
] as const;

export function QuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        search.trim() === "" ||
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <div className="bg-ink">
      <PageHeader
        badge="Client Guidance & Frequently Asked Questions"
        title="Questions & Legal Guidance"
        subtitle="Transparent answers regarding legal professional privilege, High Court stay proceedings, fee arrangements, property disputes, and our representation standards."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Questions & Guidance" },
        ]}
      >
        <Button href="/contact">Ask a specific question</Button>
      </PageHeader>

      {/* Filter & Search Bar */}
      <section className="relative border-b border-line bg-forest/25 py-6">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categoryLabels.map((cat) => {
                const active = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      setOpenIndex(0);
                    }}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-[0.8125rem] tracking-wide whitespace-nowrap transition-colors duration-500",
                      active
                        ? "bg-gilt text-ink font-medium"
                        : "border border-line text-stone hover:border-line-strong hover:text-ivory",
                    )}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative shrink-0 md:w-72">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search legal queries..."
                className="w-full rounded-full border border-line bg-forest/40 py-1.5 pl-9 pr-4 text-[0.875rem] text-ivory placeholder:text-stone/50 focus:border-gilt focus:outline-none"
              />
              <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Context Card */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-36 rounded-2xl border border-line bg-forest/30 p-8">
                <span className="t-label text-gilt">Plain-Spoken Counsel</span>
                <h2 className="display mt-3 text-2xl font-light text-ivory">
                  Clarity Before Instruction
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-stone">
                  Legal problems cause enough distress without the added burden of confusing jargon or unpredictable fees. We explain where you stand in plain English or Urdu.
                </p>

                <div className="mt-8 border-t border-line pt-6 space-y-4">
                  <div className="flex items-center gap-3 text-[0.875rem] text-stone">
                    <span className="h-2 w-2 rounded-full bg-gilt" />
                    <span>Showing {filteredFaqs.length} curated questions</span>
                  </div>
                  <div className="flex items-center gap-3 text-[0.875rem] text-stone">
                    <span className="h-2 w-2 rounded-full bg-gilt" />
                    <span>Direct partner answers</span>
                  </div>
                  <div className="flex items-center gap-3 text-[0.875rem] text-stone">
                    <span className="h-2 w-2 rounded-full bg-gilt" />
                    <span>Free initial confidential assessment</span>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={`tel:${firm.phones[0].tel}`}
                    className="flex items-center gap-3 text-[0.875rem] text-gilt hover:text-gilt-soft transition-colors"
                  >
                    <Phone size={16} />
                    <span>Call chambers: {firm.phones[0].display}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Questions Accordion */}
            <div className="lg:col-span-8">
              {filteredFaqs.length === 0 ? (
                <div className="rounded-xl border border-line p-12 text-center">
                  <p className="text-stone text-[1rem]">No questions match your search.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearch("");
                    }}
                    className="mt-4 text-gilt text-[0.875rem] underline"
                  >
                    Clear search filters
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {filteredFaqs.map((item, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <li
                        key={item.q}
                        className="rounded-xl border border-line bg-forest/20 overflow-hidden transition-colors duration-500 hover:border-line-strong"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-6 p-6 text-left"
                        >
                          <span
                            className={cn(
                              "display text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.3] transition-colors duration-500",
                              isOpen ? "text-gilt font-normal" : "text-ivory/90 hover:text-ivory",
                            )}
                          >
                            {item.q}
                          </span>
                          <span
                            aria-hidden
                            className={cn(
                              "relative grid size-8 shrink-0 place-items-center rounded-full border border-line transition-transform duration-500",
                              isOpen ? "rotate-45 border-gilt text-gilt" : "text-stone",
                            )}
                          >
                            <span className="h-3 w-px bg-current" />
                            <span className="absolute h-px w-3 bg-current" />
                          </span>
                        </button>

                        <div
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-500 ease-lux",
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t border-line/60 px-6 pb-6 pt-4 text-[0.9875rem] leading-[1.75] text-stone">
                              {item.a}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="border-t border-line bg-gradient-to-r from-forest via-moss to-ink py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="t-label text-gilt">Personalized Counsel</span>
            <h2 className="display mt-2 text-[clamp(2rem,3.5vw,2.8rem)] font-light text-ivory">
              Do you have a question not listed here?
            </h2>
            <p className="mt-2 text-stone max-w-xl text-[0.9875rem]">
              Every legal circumstance has unique nuances. Send us a confidential brief and a partner will address your specific scenario.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/contact">Ask an advocate</Button>
            <a
              href={`tel:${firm.phones[1].tel}`}
              className="text-[0.9375rem] text-stone hover:text-ivory underline underline-offset-4 decoration-line hover:decoration-gilt transition-colors"
            >
              Emergency Helpline: {firm.phones[1].display}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
