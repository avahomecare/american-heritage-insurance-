import { createFileRoute } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms · American Heritage Insurance Brokers, Inc." },
      { name: "description", content: "What this website does and does not do." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <article className="relative overflow-hidden">
        <FadedAside src="/hero-building.jpg" />
        <div className="relative mx-auto max-w-3xl px-5 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-gold">Terms</p>
        <h1 className="mt-3 text-4xl text-ink">Terms of use</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            This website is published by American Heritage Insurance Brokers, Inc., an independent
            brokerage in Aurora, Colorado. We are not an insurance company. Descriptions of
            coverage on these pages are general. The policy contract controls.
          </p>
          <p>
            Sending a form does not bind coverage, change a policy, start a claim, or create an
            agency relationship. A policy starts only after you accept a proposal and the carrier
            agrees in writing.
          </p>
          <p>
            Quotes depend on the information you give us and on carrier underwriting. A number
            discussed by phone is not a binder.
          </p>
          <p>
            Colorado law applies to disputes about this website. These terms are not a substitute
            for advice from your own lawyer.
          </p>
        </div>
        </div>
      </article>
    </PageShell>
  );
}
