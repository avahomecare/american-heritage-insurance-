import { createFileRoute } from "@tanstack/react-router";
import { FadedAside } from "@/components/faded-aside";
import { PageShell } from "@/components/page-shell";
import { office } from "@/lib/content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy · American Heritage Insurance Brokers, Inc." },
      { name: "description", content: "How this website handles a quote request." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <article className="relative overflow-hidden">
        <FadedAside src="/hero-building.jpg" />
        <div className="relative mx-auto max-w-3xl px-5 py-12 md:py-16">
        <p className="text-xs tracking-widest uppercase text-gold">Privacy</p>
        <h1 className="mt-3 text-4xl text-ink">Privacy policy</h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            American Heritage Insurance Brokers, Inc. uses this site to take quote requests and to
            publish office information. We do not sell the details you type into the form.
          </p>
          <p>
            A quote request — your name, phone, email, and the description of the risk — is emailed
            to {office.email}. Delivery uses FormSubmit, which processes that message so it can
            reach the office. Do not put a Social Security number, a full bank account, or a
            medical history in the form.
          </p>
          <p>
            If you become a client, the carrier application is a separate form. That application
            is governed by the carrier’s privacy notice and by Colorado insurance privacy rules,
            not only by this page.
          </p>
          <p>
            To ask what we have from a web request, email {office.email} or call {office.phoneDisplay}.
          </p>
        </div>
        </div>
      </article>
    </PageShell>
  );
}
