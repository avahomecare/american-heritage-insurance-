import { createFileRoute, Link } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { licenses, office } from "@/lib/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tatsiana Tarasava | American Heritage Insurance Brokers" },
      {
        name: "description",
        content:
          "Tatsiana Tarasava is an independent insurance broker in Colorado helping business owners and families with commercial and personal insurance that fits.",
      },
      { property: "og:title", content: "About Tatsiana Tarasava | American Heritage Insurance Brokers" },
      { property: "og:image", content: "/images/tatsiana-tarasava.jpg" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-about.jpg" />
        <div className="relative mx-auto grid max-w-6xl items-start gap-10 px-5 py-12 md:grid-cols-12 md:gap-12 md:py-16">
          <div className="md:col-span-5">
            <img
              src="/images/tatsiana-tarasava.jpg"
              alt="Tatsiana Tarasava, Agent and Owner, American Heritage Insurance Brokers"
              width={800}
              height={1000}
              fetchPriority="high"
              decoding="async"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="relative z-10 aspect-[4/5] w-full max-w-md border border-line object-cover"
            />
          </div>
          <div className="relative z-10 md:col-span-7">
            <h1 className="text-4xl text-ink md:text-5xl">About Tatsiana Tarasava</h1>
            <p className="mt-3 text-xs tracking-widest uppercase text-gold">
              Agent and Owner, American Heritage Insurance Brokers, Inc.
            </p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Tatsiana has been helping Colorado business owners and families protect what matters most
                for over [уточнить] years. She specializes in commercial lines — General Liability,
                Workers' Compensation, Commercial Auto, Business Owner's Policies, Professional Liability,
                and Umbrella coverage — as well as personal policies including Auto, Home, Renters, and
                Life.
              </p>
              <p>
                Her clients range from home care agencies and contractors to individuals and families
                across Colorado.
              </p>
              <p>
                Tatsiana takes the time to understand each client's risks and finds coverage that fits,
                not just the cheapest option.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/quote"
                className="inline-flex min-h-11 items-center justify-center bg-navy px-5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-ink-soft"
              >
                Get a Quote
              </Link>
              <a
                href="tel:7207483893"
                className="inline-flex min-h-11 items-center justify-center border border-navy px-5 text-sm font-medium text-navy transition-colors duration-200 hover:bg-navy hover:text-cream"
              >
                Call 720.748.3893
              </a>
            </div>
          </div>
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
