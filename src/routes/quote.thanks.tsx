import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/quote/thanks")({
  head: () => ({
    meta: [
      { title: "Thank you · American Heritage Insurance Brokers, Inc." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Thanks,
});

const prepare = [
  "Driver licenses and dates of birth for every driver",
  "VINs for each vehicle",
  "Your current policy declarations page",
];

function Thanks() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <div className="border border-line bg-cream p-8 md:p-10">
          <p className="text-xs tracking-widest uppercase text-gold">Request received</p>
          <h1 className="mt-3 text-4xl text-ink">Thank you. The office has your request.</h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            We'll contact you within 24 hours (business days). Coverage is not bound until we confirm it with you.
          </p>
          <h2 className="mt-8 text-xs tracking-widest uppercase text-gold">To prepare for the call</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-ink-soft">
            {prepare.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-6 text-base text-ink-soft">
            Questions now?{" "}
            <a href="tel:7207483893" className="text-gold underline-offset-4 hover:underline">
              Call 720.748.3893
            </a>
            .
          </p>
          <Link to="/" className="mt-8 inline-flex min-h-11 items-center bg-navy px-5 text-sm font-medium text-cream">
            Back to home
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
