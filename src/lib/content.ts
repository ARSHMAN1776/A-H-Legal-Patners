/**
 * Single source of truth for all copy and imagery.
 */

import { brand, brandFull } from "@/lib/brand";

export const firm = {
  name: brandFull,
  short: brand.mark,
  descriptor: "Advocates High Court, Lahore",
  phones: [
    { owner: "Azhaar Ahmad Choudhary", display: "0301 7466260", tel: "+923017466260" },
    { owner: "Haris Ali Choudhary", display: "0307 2058771", tel: "+923072058771" },
  ],
  email: "info@ahlegalpatners.com",
  address: ["1 Turner Road", "Near Lahore High Court, Lahore"],
  year: 2026,
  founded: "Est. 2018",
  barCouncil: "Punjab Bar Council",
};

export const phoneText = firm.phones.map((p) => p.display).join(" or ");

export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${w}`;

export const photography = {
  hero: {
    id: "1436450412740-6b988f486c6b",
    alt: "Neoclassical courthouse columns and carved stonework seen from below",
  },
  library: {
    id: "1481627834876-b7833e8f5570",
    alt: "A dim law library with warm lamps hanging above tall shelves of books",
  },
  contact: {
    id: "1479142506502-19b3a3b7ff33",
    alt: "Rows of leather-bound law books with gold lettering on their spines",
  },
};

export const nav = [
  { label: "Practice", href: "/practice" },
  { label: "Approach", href: "/approach" },
  { label: "Partners", href: "/counsel" },
  { label: "Questions", href: "/questions" },
];

export const cta = {
  label: "Book a consultation",
  href: "/contact",
};

export const hero = {
  headline: ["Measured advice.", "Decisive advocacy."],
  sub: `${brandFull} represents individuals, families and businesses before the Lahore High Court, with discretion and a plain-spoken approach.`,
  badge: "Punjab Bar Council · Lahore High Court",
  stats: [
    { value: "8+", label: "Years of practice" },
    { value: "10", label: "Areas of law" },
    { value: "2", label: "Founding partners" },
  ],
};

export const commitments = [
  {
    icon: "lock",
    title: "Confidential from day one",
    body: "Everything you share is protected by legal professional privilege, whether or not you decide to instruct us.",
  },
  {
    icon: "receipt",
    title: "Fees agreed in writing",
    body: "You know the exact basis of our fees — fixed, hourly or capped — before a single hour of work begins.",
  },
  {
    icon: "chat",
    title: "Clear advice, in English or Urdu",
    body: "Plain recommendations and realistic outcomes, in the language you prefer. No jargon, no ambiguity.",
  },
  {
    icon: "phone",
    title: "Your lawyer, directly",
    body: "A named partner leads your matter personally and takes your calls. You will never be handed to a junior.",
  },
] as const;

export const manifesto =
  "Good legal work is *quiet.* It anticipates problems, speaks plainly, and leaves our clients free to get on with their lives and their businesses.";

export const manifestoCaption =
  "That is the standard we hold ourselves to on every matter, from a straightforward contract review to the most complex constitutional petition.";

export const practiceIntro =
  "Ten practice areas, from the first notice to the final appeal. Every matter is led by a partner who stays with it from start to finish.";

export const practiceTagline = "Comprehensive counsel across the full spectrum of Pakistani law.";

export const practiceGroups = [
  {
    slug: "litigation",
    name: "Litigation & Trial Advocacy",
    description:
      "Representation in civil, commercial and property disputes, from the plaint to the final decree, with early and candid advice on risk and cost.",
    areas: [
      "Civil and property suits: declaration, injunction, partition, specific performance",
      "Commercial and company disputes",
      "Banking and recovery suits",
      "Rent and eviction proceedings",
      "Revenue and land matters",
      "Insolvency and winding up",
      "Labour and service disputes",
      "Execution of decrees and judgments",
    ],
    image: { id: "1589829545856-d10d557cf95f", alt: "A bronze statue of Lady Justice holding scales" },
  },
  {
    slug: "superior-courts",
    name: "Constitutional & Superior Courts",
    description:
      "Advocacy before the Lahore High Court and the Supreme Court of Pakistan, in constitutional, civil and fiscal matters.",
    areas: [
      "Writ petitions under Article 199",
      "Enforcement of fundamental rights",
      "Civil appeals and revisions",
      "Appeals before the Supreme Court of Pakistan",
      "Appeals from customs, tax, service and environmental tribunals",
      "Contempt proceedings",
      "Habeas corpus and urgent relief",
      "Public interest litigation",
    ],
    image: { id: "1436450412740-6b988f486c6b", alt: "Neoclassical courthouse columns and carved stonework seen from below" },
  },
  {
    slug: "corporate",
    name: "Corporate & Commercial",
    description:
      "Company formation, transactions and the everyday contracts a business runs on, drafted to hold up when tested.",
    areas: [
      "Incorporation of private, public, non-profit and foreign-branch companies",
      "Joint ventures, consortia and public-private partnerships",
      "Mergers, acquisitions and restructuring",
      "Shareholder and investment agreements",
      "Domestic and cross-border commercial contracts",
      "Distribution, franchising and licensing",
      "Company secretarial work and SECP filings",
      "Banking and finance documentation",
    ],
    image: { id: "1450101499163-c8848c66ca85", alt: "A hand signing a contract with a fountain pen" },
  },
  {
    slug: "tax",
    name: "Tax & Revenue",
    description:
      "Advice and representation on income tax, sales tax and customs, from planning through to references before the High Court.",
    areas: [
      "Income tax planning and advice",
      "Federal and provincial sales tax",
      "Appeals before the Commissioner (Appeals) and the Appellate Tribunal",
      "High Court tax references and fiscal writs",
      "Audits, notices and recovery proceedings",
      "Withholding tax compliance",
      "Cross-border taxation and double taxation treaties",
      "Customs valuation and tariff disputes",
    ],
    image: { id: "1423592707957-3b212afa6733", alt: "Stacked books beside an open notebook and a fountain pen" },
  },
  {
    slug: "advisory",
    name: "Advisory & Regulatory",
    description:
      "Considered legal opinions and regulatory guidance that help you decide well before a dispute begins.",
    areas: [
      "Formal legal opinions on complex questions of law",
      "Pre-litigation risk review",
      "Corporate governance and board advisory",
      "Regulatory approvals and liaison (SECP, SBP, CCP)",
      "Employment and labour advice",
      "Foreign investment and remittances",
      "Compliance programmes",
      "Contract review and corporate retainers",
    ],
    image: { id: "1486406146926-c627a92ad1ab", alt: "Glass towers rising against the sky seen from street level" },
  },
  {
    slug: "property",
    name: "Property & Conveyancing",
    description:
      "Property transactions and their documents, with careful title checks before any money changes hands.",
    areas: [
      "Sale deeds and agreements to sell",
      "Title scrutiny and due diligence",
      "Leases and tenancy agreements",
      "Mortgages and security documents",
      "Powers of attorney",
      "Partnership, settlement and gift deeds",
      "Housing scheme and development agreements",
      "Revenue records and mutation matters",
    ],
    image: { id: "1497366216548-37526070297c", alt: "A long, quiet interior corridor with glass-walled rooms" },
  },
  {
    slug: "arbitration",
    name: "Arbitration & Dispute Resolution",
    description:
      "Arbitration, mediation and negotiated settlement, for disputes that are better resolved outside a courtroom.",
    areas: [
      "Domestic arbitration",
      "Enforcing and challenging foreign arbitral awards",
      "Commercial mediation",
      "Court-annexed alternative dispute resolution",
      "Settlement negotiation and compromise deeds",
      "Challenging or defending arbitral awards",
      "Claims analysis and dispute strategy",
    ],
    image: { id: "1431540015161-0bf868a2d407", alt: "An empty boardroom with leather chairs around a long table" },
  },
  {
    slug: "family",
    name: "Family & Private Client",
    description:
      "Sensitive family and personal matters, handled with care, discretion and a firm grasp of the law.",
    areas: [
      "Dissolution of marriage and khula",
      "Guardianship and custody",
      "Maintenance and dower claims",
      "Succession and inheritance",
      "Succession certificates and probate",
      "Wills, gifts and family settlements",
      "Marriage registration and nikahnama disputes",
      "Property and family matters for overseas Pakistanis",
    ],
    image: { id: "1505664194779-8beaceb93744", alt: "Marble busts beside shelves of old books in a dark library" },
  },
  {
    slug: "criminal",
    name: "Criminal Defence",
    description:
      "Defence at every stage, from the first police inquiry to appeal, with prompt action when liberty is at stake.",
    areas: [
      "Pre-arrest and post-arrest bail",
      "Trial defence",
      "Quashing of FIRs",
      "Criminal appeals and revisions",
      "Cheque dishonour and financial crime",
      "NAB, FIA and anti-corruption proceedings",
      "Defence in tax and customs prosecutions",
      "Cybercrime proceedings",
    ],
    image: { id: "1575505586569-646b2ca898fc", alt: "A wooden judge's gavel resting on a dark surface" },
  },
  {
    slug: "intellectual-property",
    name: "Intellectual Property",
    description:
      "Protecting what you create: trademarks, copyright, licensing and confidential know-how.",
    areas: [
      "Trademark registration and renewal",
      "Copyright and design protection",
      "Licensing and assignment agreements",
      "Infringement and passing-off actions",
      "Confidentiality and non-compete agreements",
      "Domain names and online brand disputes",
      "Intellectual property due diligence",
    ],
    image: { id: "1527576539890-dfa815648363", alt: "A sweeping curved stairwell photographed from above in black and white" },
  },
] as const;

export type PracticeSlug = (typeof practiceGroups)[number]["slug"];

export const process = {
  title: "From first call to final outcome",
  body: "Every matter follows the same disciplined path, so you always know where you stand and what happens next.",
  tagline: "Structured. Transparent. Partner-led.",
  steps: [
    {
      number: "01",
      title: "Listen",
      body: "A confidential first conversation. We hear the facts, your concerns and what a good result looks like to you.",
      detail: "No commitment required. Your first call is free and fully confidential.",
    },
    {
      number: "02",
      title: "Assess",
      body: "We review the documents and the law, then tell you plainly where you stand, what it may cost and how long it may take.",
      detail: "Written assessment provided. Risk and timeline clearly stated.",
    },
    {
      number: "03",
      title: "Advise",
      body: "You receive a written strategy with options and realistic outcomes. Every decision stays with you.",
      detail: "Options ranked by probability of success. Costs capped where possible.",
    },
    {
      number: "04",
      title: "Act",
      body: "We negotiate, draft or advocate on your behalf, and report back at each significant step.",
      detail: "Regular updates. Partner-accessible throughout.",
    },
  ],
};

export const counsel = {
  title: "The partners behind the firm",
  body: "A&H is led by its two founding partners. You deal with them directly, from the first call to the final outcome.",
  tagline: "No hand-offs. No junior associates handling your matter without supervision.",
  people: [
    {
      name: "Azhaar Ahmad Choudhary",
      initial: "A",
      role: "Advocate High Court",
      phone: firm.phones[0],
      bio: "Azhaar Ahmad Choudhary is a senior advocate with deep expertise in constitutional law, civil litigation and corporate advisory. Called to the Punjab Bar and admitted before the Lahore High Court, he combines meticulous legal analysis with forthright client counsel.",
      specialisms: ["Constitutional Law", "Civil Litigation", "Corporate Advisory"],
    },
    {
      name: "Haris Ali Choudhary",
      initial: "H",
      role: "Advocate High Court",
      phone: firm.phones[1],
      bio: "Haris Ali Choudhary advises individuals, families and businesses on criminal defence, tax, property and family law. His practice is marked by careful preparation and direct, plain-spoken advice that empowers clients to make informed decisions.",
      specialisms: ["Criminal Defence", "Tax & Revenue", "Family Law"],
    },
  ],
};

export const faq = [
  {
    q: "Is my first conversation confidential?",
    a: "Yes. What you tell us is protected by our duty of confidentiality and by legal professional privilege under Article 9 of the Qanun-e-Shahadat Order 1984, whether or not you go on to instruct the firm.",
  },
  {
    q: "How are fees set?",
    a: "We agree the basis of our fees in writing before work begins. Depending on the matter that may be a fixed stage fee, an hourly advisory rate or a capped litigation budget. We do not begin billing until terms are signed.",
  },
  {
    q: "What should I bring to a first meeting?",
    a: "Any contracts, notices, registry documents, court orders, or previous correspondence related to the matter, along with a chronological note of events. If you don't have all documents yet, we will guide you on what to requisition from court records.",
  },
  {
    q: "How quickly can urgent stay relief be obtained at Lahore High Court?",
    a: "For urgent matters requiring emergency injunctive relief or restraining orders, we draft and move petitions on a motion basis before the High Court roster within 24 to 48 hours, subject to court working hours and registry scrutiny.",
  },
  {
    q: "Do you advise in Urdu as well as English?",
    a: "Yes. We advise fluently in both Urdu and English. All conferences, draft pleadings, and strategic explanations can be conducted in the language you are most comfortable with.",
  },
  {
    q: "Can overseas Pakistanis retain the firm remotely?",
    a: "Yes. We regularly represent overseas Pakistani clients residing in the UK, US, UAE, and Canada. We assist with drafting and attesting Special or General Powers of Attorney (Mokhtarnama) through Pakistani embassies or consulates, and conduct regular video consultations.",
  },
  {
    q: "Do you handle matters outside Lahore?",
    a: "Our principal seat is at the Lahore High Court, but we regularly appear before the Rawalpindi, Multan, and Bahawalpur benches, District Courts across Punjab, and coordinate Supreme Court of Pakistan appeals in Islamabad.",
  },
  {
    q: "What makes A&H Legal Partners different from large multi-partner firms?",
    a: "Direct partner leadership. At A&H, your case is not passed off to inexperienced junior associates. A founding partner personally drafts pleadings, advises on strategy, and appears in court to argue your matter.",
  },
];

export const contact = {
  title: "Tell us what is happening",
  body: "Share a few details and a partner will reply within one working day. Everything you send is confidential.",
  note: "Prefer to call? Reach us directly on the numbers below. Urgent matters are answered the same day.",
};

export const disclaimer =
  "The information on this website is general and does not constitute formal legal advice. Contacting the firm, or sending an enquiry through this site, does not create a lawyer-client relationship. Please do not include sensitive banking passwords or original documents in your first transmission.";

export const values = [
  {
    title: "Rigour",
    body: "Every document we draft, every submission we file, is checked by a partner before it leaves the office.",
  },
  {
    title: "Candour",
    body: "We tell you what we honestly think, not what you might prefer to hear. That is how you make good decisions.",
  },
  {
    title: "Discretion",
    body: "Client matters are discussed only within the firm, and only with those who need to know.",
  },
  {
    title: "Continuity",
    body: "The partner you meet at the outset is the partner who sees your matter through to the end.",
  },
];