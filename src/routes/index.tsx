import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Handshake, Phone, Shield, Users } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { cities, lines, office } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content:
          "American Heritage Insurance Brokers, Inc. is an independent agency in Aurora, Colorado.",
      },
    ],
  }),
  component: Home,
});

const points = [
  {
    icon: Shield,
    title: "",
    body: "Comprehensive coverage — home, auto, and commercial coverage placed with the carriers that fit.",
  },
  {
    icon: Users,
    title: "Independent agency",
    body: "We compare quotes from multiple major carriers so you don't have to.",
  },
  {
    icon: Handshake,
    title: "Local office",
    body: office.address,
  },
];

function Home() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-paper">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-3/5 md:block">
          <img
            src="/hero-building.jpg"
            alt=""
            className="h-full w-full object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/75 to-paper/5" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-xs tracking-widest text-gold uppercase">
              Since {office.founded} · Independent agency
            </p>
            <h1 className="mt-4 max-w-xl text-5xl leading-tight text-ink md:text-6xl">
              Insurance protection. Peace of mind.
            </h1>
            <div className="mt-6 h-px w-16 bg-gold" />
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Personalized coverage for your home, family, and business. We compare quotes from
              multiple major carriers so you don't have to.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                to="/quote"
                className="inline-flex min-h-12 items-center gap-3 bg-navy px-6 text-xs tracking-widest text-cream uppercase transition-colors duration-200 hover:bg-ink-soft"
              >
                Get a quote
                <ArrowRight aria-hidden size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-12 items-center gap-2 text-xs tracking-widest text-gold uppercase"
              >
                Learn more
                <ArrowRight aria-hidden size={14} />
              </Link>
            </div>
          </div>
          <div className="relative flex flex-col items-center md:items-end md:pr-8">
            <img
              src="/hero-building.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover md:hidden"
            />
            <div className="absolute inset-0 bg-paper/55 md:hidden" />
            <img src="/logo-mark.svg" alt="" className="relative h-56 w-auto md:h-72" />
            <p className="relative mt-4 max-w-52 text-center text-xs tracking-widest text-gold uppercase">
              Trusted protection. Personalized advice.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="mx-auto grid max-w-7xl md:grid-cols-4">
          {points.map((point) => (
            <div key={point.title} className="flex gap-4 border-b border-line px-5 py-6 md:border-r md:border-b-0">
              <point.icon aria-hidden className="mt-0.5 shrink-0 text-gold" size={28} strokeWidth={1.25} />
              <div>
                {point.title ? (
                  <p className="text-xs tracking-widest text-ink uppercase">{point.title}</p>
                ) : null}
                <p className={`text-sm leading-relaxed text-muted ${point.title ? "mt-1" : ""}`}>{point.body}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-4 px-5 py-6">
            <Phone aria-hidden className="mt-0.5 shrink-0 text-gold" size={28} strokeWidth={1.25} />
            <div>
              <p className="text-sm text-ink-soft">Talk with the office</p>
              <a href={office.phoneHref} className="mt-1 inline-flex text-lg text-ink">
                {office.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs tracking-widest text-gold uppercase">Google reviews</p>
              <p className="mt-2 font-display text-4xl text-ink">4.4</p>
              <p className="mt-1 text-base text-ink-soft">Google rating · 7 reviews</p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="inline-flex min-h-11 items-center border border-gold px-4 text-base text-ink">
                Leave us a review
              </span>
              <span className="inline-flex min-h-11 items-center text-base text-gold">
                Read all reviews on Google
              </span>
              <p className="text-base text-ink">[add Google review link]</p>
            </div>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {["1", "2", "3", "4"].map((slot) => (
              <li key={slot} className="border border-line bg-paper p-5 text-base text-ink">
                [add real Google review]
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <h2 className="text-3xl text-ink md:text-4xl">Why an independent agency</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            "We compare quotes from multiple major carriers so you don't have to.",
            "One agency for all your policies.",
            "Local help with claims.",
            "We work for you, not for one insurance company.",
          ].map((item) => (
            <li key={item} className="border border-line px-5 py-5 text-base leading-relaxed text-ink">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="text-3xl text-ink md:text-4xl">Colorado, close to home</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <article>
              <h3 className="text-2xl text-ink">Hail</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                Front Range hail often comes with a separate wind-and-hail deductible, sometimes a
                percentage of the dwelling limit. We look at that deductible and the roof coverage
                before a storm claim is filed.
              </p>
            </article>
            <article>
              <h3 className="text-2xl text-ink">SR-22</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                An SR-22 is a Colorado filing, not a policy by itself. We place an auto policy that
                can carry the filing and match it to the notice from the state.
              </p>
            </article>
            <article>
              <h3 className="text-2xl text-ink">Where we work</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {cities.join(", ")}, and nearby.
              </p>
            </article>
          </div>
          <Link to="/faq" className="mt-8 inline-flex text-base text-gold underline-offset-4 hover:underline">
            Hail, SR-22, and other questions
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-3xl text-ink md:text-4xl">What we place</h2>
          <Link to="/coverage" className="hidden text-xs tracking-widest text-gold uppercase md:inline">
            All lines
          </Link>
        </div>
        <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {lines.map((line) => (
            <li key={line.id} className="bg-paper">
              <Link
                to={line.id === "trucking" ? "/transportation" : "/coverage"}
                hash={line.id === "trucking" ? undefined : line.id}
                className="block px-5 py-5 hover:bg-cream"
              >
                <p className="text-xs tracking-widest text-gold uppercase">{line.group}</p>
                <p className="mt-2 font-display text-xl text-ink">{line.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{line.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
