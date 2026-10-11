import { createFileRoute, Link } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { licenses, office } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content:
          "American Heritage Insurance Brokers, Inc. is an independent agency in Aurora, Colorado.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-about.jpg" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-gold">About the agency</p>
        <h1 className="mt-3 max-w-3xl text-4xl text-ink md:text-5xl">
          An independent agency that shops the market, then stays after the policy is bound.
        </h1>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-12 md:py-16">
          <h2 className="text-3xl text-ink">Our team</h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              We are American Heritage Insurance Brokers, Inc., an independent agency in Aurora.
              We've been here since 2007. We compare quotes from multiple major carriers so you don't have to. Our
              team places personal, commercial, and transportation coverage for households and
              businesses across the Denver metro.
            </p>
            <p>
              We explain a policy before it is bound, and we stay on the file after that. A
              driver change, a new location, a certificate, or help opening a claim with the
              carrier still comes through this office.
            </p>
          </div>
          <dl className="mt-8 border-t border-line pt-6 text-sm">
            <dt className="text-xs tracking-widest uppercase text-muted">Agency</dt>
            <dd className="mt-1 text-ink">
              {licenses.agencyName} — Colorado Agency License #{licenses.agencyNumber}
            </dd>
            <dd className="text-ink-soft">NPN {licenses.agencyNpn}</dd>
            <dd className="text-ink-soft">
              Licensed since {licenses.agencySince}.
            </dd>
          </dl>
        </div>
      </section>

      <section className="border-t border-line bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <h2 className="text-3xl text-ink">Where we work</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            The office is at {office.address}. We work throughout Colorado — most of our clients are
            in the Denver metro, but if the risk is in Colorado and it's a line we write, just ask.
            Call{" "}
            <a href={office.phoneHref} className="text-ink underline-offset-4 hover:underline">
              {office.phoneDisplay}
            </a>
            .
          </p>
          <Link
            to="/quote"
            className="mt-8 inline-flex min-h-11 items-center bg-navy px-5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-ink-soft"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
