import { createFileRoute, Link } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { lines } from "@/lib/content";

export const Route = createFileRoute("/coverage")({
  head: () => ({
    meta: [
      { title: "Coverage · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content:
          "Personal auto, home, renters, umbrella, and life coverage from American Heritage Insurance Brokers, Inc.",
      },
    ],
  }),
  component: CoveragePage,
});

function CoveragePage() {
  const personal = lines.filter((line) => line.group === "Personal");
  const personalAuto =
    "Colorado sets minimum liability limits, but most drivers should carry more — rising medical costs and lawsuits mean those minimums don't go far. We help you set limits that match your income and assets so a bad accident doesn't put them at risk. And if you bundle your auto with home or condo coverage, most carriers offer a multi-policy discount — sometimes up to twenty percent. We compare forms across multiple major carriers, because each one is different, and the right fit depends on how you actually drive and what you own.";

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-personal.jpg" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-gold">Coverage</p>
        <h1 className="mt-3 max-w-2xl text-4xl text-ink md:text-5xl">Personal coverage, start to finish.</h1>
        <p className="mt-4 max-w-2xl text-2xl text-ink">From the car in the driveway to the roof over your head.</p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          We place personal lines across multiple major carriers and help you choose what actually fits.
        </p>
        </div>
      </section>

      <section id="personal" className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {personal.map((line) => (
              <article id={line.id} key={line.id} className="scroll-mt-28 border border-line bg-cream p-6">
                <p className="font-display text-sm text-gold">{line.index}</p>
                <h3 className="mt-2 text-2xl text-ink">
                  {line.id === "auto" ? "Personal Auto Insurance" : line.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {line.id === "auto" ? personalAuto : line.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-gold-soft">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-lg text-ink">Tell us which line you need. We will say if it is one we place.</p>
          <Link
            to="/quote"
            className="inline-flex min-h-11 items-center bg-navy px-5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-ink-soft"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
