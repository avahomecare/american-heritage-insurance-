import { createFileRoute, Link } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { lines } from "@/lib/content";

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial insurance · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content:
          "General liability, commercial package, and commercial auto for businesses in the Denver metro.",
      },
    ],
  }),
  component: CommercialPage,
});

function CommercialPage() {
  const items = lines.filter((line) => line.group === "Commercial" && line.id !== "trucking");
  const extra = [
    {
      title: "Workers' Comp",
      text: "Colorado requires workers' comp for most employers, even with a single employee. We set up the policy around your payroll and job classifications, and help with certificates when a client or general contractor asks for proof.",
    },
    {
      title: "BOP",
      text: "A Business Owner's Policy combines property and liability coverage, and often business income, in one contract built for smaller shops and offices. We sort out what your landlord's policy already covers, so you only buy what you actually need.",
    },
    {
      title: "Commercial Umbrella",
      text: "Commercial umbrella coverage adds higher limits on top of your general liability and commercial auto policies. It's often what a lease or contract calls for when the required limits exceed your base policy.",
    },
  ];
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-business.jpg" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
        <h1 className="max-w-3xl text-4xl text-ink md:text-5xl">Business Insurance</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Every business is unique — the work you do, your employees, your contracts. We compare
          quotes from multiple major carriers and shape coverage around what your business actually
          does. That includes General Liability, Workers' Comp, Commercial Auto, BOP, Umbrella, and
          more. Licensed in Colorado since 2007.
        </p>
        <Link
          to="/quote/commercial"
          className="mt-8 inline-flex min-h-11 items-center bg-navy px-5 text-sm font-medium text-cream"
        >
          Get a business quote
        </Link>
        </div>
      </section>
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-3 md:py-16">
          {items.map((line) => (
            <article key={line.id} className="border border-line p-6">
              <h2 className="font-display text-2xl text-ink">{line.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{line.detail}</p>
            </article>
          ))}
          {extra.map((card) => (
            <article key={card.title} className="border border-line p-6">
              <h2 className="font-display text-2xl text-ink">{card.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
