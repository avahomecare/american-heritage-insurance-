import { createFileRoute, Link } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";

const groups = [
  {
    heading: "Working with us",
    items: [
      {
        q: "What's the difference between an independent broker and a captive agent?",
        a: "A captive agent works for one insurance company and can only offer that company's policies. As an independent broker, we work for you. We compare quotes from multiple major carriers and recommend the one that fits your needs and budget.",
      },
      {
        q: "Does it cost me anything to use a broker, and how are you paid?",
        a: "No, you don't pay extra for our help. We're paid a commission by the insurance company you choose, and that's already built into the premium. Your price is the same as going to that carrier directly, plus you get someone comparing options for you.",
      },
      {
        q: "Will you help me if I have a claim?",
        a: "Yes. Call us first, and we'll help you report the claim to the carrier, explain what your policy covers, and follow up if things stall. You still deal with the carrier's adjuster, but you don't have to do it alone.",
      },
    ],
  },
  {
    heading: "Personal insurance",
    items: [
      {
        q: "What car insurance is required in Colorado?",
        a: "Colorado requires every driver to carry liability insurance for injuries and property damage you cause to others. Insurers must also offer uninsured and underinsured motorist coverage, and it stays on your policy unless you turn it down in writing. The state minimums are low for most households, so we usually recommend higher limits that match your income and assets.",
      },
      {
        q: "Does my homeowners policy cover hail and wildfire in Colorado?",
        a: "Most standard homeowners policies cover fire and hail damage, but the details matter. Many Colorado policies have a separate wind and hail deductible, often a percentage of your home's value, and some limit roof payouts based on the roof's age. We'll walk you through your deductibles and make sure your dwelling limit would actually cover a rebuild.",
      },
      {
        q: "How much umbrella coverage do I need?",
        a: "A good starting point is enough to protect what you own and what you earn. That usually means at least one million dollars, more if you have significant assets, a rental property, or a teen driver at home. Umbrella coverage is usually inexpensive for the protection it adds, and we'll make sure your auto and home limits line up with it.",
      },
    ],
  },
  {
    heading: "Business insurance",
    items: [
      {
        q: "What insurance does my small business or LLC need?",
        a: "Forming an LLC protects your personal assets from business debts, but it doesn't cover lawsuits or damage. Most small businesses start with general liability, and many combine it with property coverage in a business owner's policy. If you have employees, Colorado generally requires workers' compensation, and vehicles used for work need commercial auto.",
      },
      {
        q: "What drives the cost of business insurance, and what do you need from me for a quote?",
        a: "Price depends on what you do, your revenue and payroll, the number of employees, your location, and your claims history. For a quote, we'll ask for a short description of your operations, those numbers, any vehicles, and any contracts that require specific coverage. The more accurate the details, the more accurate the quote.",
      },
    ],
  },
  {
    heading: "Transportation",
    items: [
      {
        q: "What insurance do I need to start a trucking company or run as an owner-operator?",
        a: "For-hire carriers hauling regulated freight across state lines in vehicles of 10,001 pounds or more must carry at least $750,000 in liability coverage under federal rules, with higher amounts for hazardous materials. Most shippers and brokers also require cargo coverage, and you may need physical damage, general liability, and non-trucking liability if you're leased to a motor carrier. We'll match your coverage and filings to your freight and your routes.",
      },
      {
        q: "How much is trucking insurance, and what affects the price?",
        a: "There's no single price. It depends on your units, your drivers' experience and records, what you haul, how far you run, and your safety record, including your CSA scores. New authorities usually pay more in the first few years. Send us your vehicle list, driver list, DOT number if you have one, and the commodities you haul, and we'll shop it with the carriers that write your kind of freight.",
      },
    ],
  },
] as const;

const faqEntities = groups.flatMap((group) =>
  group.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
);

const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqEntities,
});

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content:
          "Questions about working with American Heritage Insurance Brokers, Inc., personal insurance, business insurance, and transportation.",
      },
    ],
    scripts: [{ type: "application/ld+json", children: faqJsonLd }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-faq.jpg" />
        <div className="relative mx-auto max-w-3xl px-5 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-gold">Questions</p>
          <h1 className="mt-3 text-4xl text-ink md:text-5xl">Frequently asked questions.</h1>
          <div className="mt-12 space-y-12">
            {groups.map((group) => (
              <section key={group.heading}>
                <h2 className="text-2xl text-ink">{group.heading}</h2>
                <div className="mt-4 border-t border-line">
                  {group.items.map((item) => (
                    <details key={item.q} className="group border-b border-line">
                      <summary className="flex min-h-14 cursor-pointer list-none items-start justify-between gap-4 py-4 text-lg text-ink [&::-webkit-details-marker]:hidden">
                        <span>{item.q}</span>
                        <span aria-hidden className="mt-1 shrink-0 text-gold group-open:hidden">
                          +
                        </span>
                        <span aria-hidden className="mt-1 hidden shrink-0 text-gold group-open:inline">
                          –
                        </span>
                      </summary>
                      <p className="pb-5 text-base leading-relaxed text-ink-soft">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <Link to="/quote" className="mt-8 inline-flex text-base text-gold underline-offset-4 hover:underline">
            Ask the office directly
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
