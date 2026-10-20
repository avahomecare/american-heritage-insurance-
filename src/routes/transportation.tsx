import { createFileRoute, Link } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/transportation")({
  head: () => ({
    meta: [
      { title: "Transportation · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content:
          "Liability, cargo, and filings for for-hire and private haulers based in Colorado.",
      },
    ],
  }),
  component: TransportationPage,
});

const needs = [
  {
    title: "Liability and filings",
    body: "We match your liability limits and filings to your freight and your routes. Hauling for hire and hauling your own goods have different requirements.",
  },
  {
    title: "Cargo",
    body: "Cargo coverage depends on what's in the trailer. Tell us what you haul first, so the quote fits your actual loads.",
  },
  {
    title: "Drivers and units",
    body: "The quote starts with the vehicle list, the driver list, and the DOT number if you have one.",
  },
];

function TransportationPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-transportation.jpg" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-gold">Transportation</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-ink md:text-5xl">
          Transportation insurance for haulers who need the filing to match the freight.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          We work with for-hire truckers, owner-operators, and private carriers. We place auto
          liability, cargo, and the state and federal filings that prove the vehicle carries enough
          coverage, and we collect the units, drivers, and commodities before we go to a carrier.
          Licensed in Colorado since 2007.
        </p>
        <Link
          to="/quote/commercial"
          className="mt-8 inline-flex min-h-11 items-center bg-navy px-5 text-sm font-medium text-cream"
        >
          Get a transportation quote
        </Link>
        </div>
      </section>
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3 md:py-16">
          {needs.map((item) => (
            <article key={item.title} className="border border-line p-6">
              <h2 className="font-display text-2xl text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
