import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/quote/")({
  validateSearch: (search: Record<string, unknown>): { kind?: string } =>
    typeof search.kind === "string" ? { kind: search.kind } : {},
  beforeLoad: ({ search }) => {
    if (search.kind === "business") throw redirect({ to: "/quote/commercial" });
    if (search.kind === "personal") throw redirect({ to: "/quote/personal" });
  },
  head: () => ({
    meta: [
      { title: "Get a quote · American Heritage Insurance Brokers, Inc." },
      {
        name: "description",
        content: "Request a personal or commercial insurance quote. A request does not bind a policy.",
      },
    ],
  }),
  component: QuoteChooser,
});

const choices = [
  {
    to: "/quote/personal" as const,
    title: "Personal",
    body: "Auto and home insurance for you and your family.",
    cta: "Start a personal quote",
  },
  {
    to: "/quote/commercial" as const,
    title: "Commercial",
    body: "General Liability, Workers' Comp, Commercial Auto, BOP, Professional / E&O and Umbrella.",
    cta: "Start a commercial quote",
  },
];

function QuoteChooser() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <FadedAside src="/aside-quote.jpg" />
        <div className="relative mx-auto max-w-6xl px-5 py-12 md:py-16">
          <p className="text-xs tracking-widest uppercase text-gold">Get a quote</p>
          <h1 className="mt-3 max-w-3xl text-4xl text-ink md:text-5xl">What would you like us to quote?</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
            Pick a form. It goes to the office by email. It is a request for a conversation, not an
            application that binds coverage. Prefer to talk?{" "}
            <a href="tel:7207483893" className="text-gold underline-offset-4 hover:underline">
              Call 720.748.3893
            </a>
            .
          </p>
          <div className="relative z-10 mt-10 grid gap-6 md:grid-cols-2">
            {choices.map((c) => (
              <article key={c.to} className="border border-line bg-cream p-6 md:p-8">
                <h2 className="text-3xl text-ink">{c.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{c.body}</p>
                <Link
                  to={c.to}
                  className="mt-6 inline-flex min-h-11 items-center bg-navy px-5 text-sm font-medium text-cream transition-colors duration-200 hover:bg-ink-soft"
                >
                  {c.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
