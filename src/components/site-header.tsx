import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { office } from "@/lib/content";

const nav = [
  { to: "/coverage", hash: "personal", label: "Personal" },
  { to: "/commercial", hash: undefined, label: "Business" },
  { to: "/transportation", hash: undefined, label: "Transportation" },
  { to: "/about", hash: undefined, label: "About" },
] as const;

const clientLinks = [
  { hash: "claims", label: "Claims questions" },
  { hash: "id-card", label: "ID card" },
  { hash: "certificate", label: "Certificate" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [resources, setResources] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#c4a36a] bg-navy text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-6 sm:px-5">
        <Link
          to="/"
          className="min-w-0"
          aria-label="American Heritage Insurance Brokers, Inc. home"
          onClick={() => setOpen(false)}
        >
          <span className="flex min-w-0 flex-col">
            <Logo variant="header" />
            <span className="mt-4 hidden text-xs tracking-widest text-[#c4a36a] uppercase lg:block">
              Protecting what matters. Since {office.founded}.
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className="text-xs tracking-widest text-white uppercase"
              activeOptions={{ exact: false, includeHash: true }}
              activeProps={{ className: "text-xs tracking-widest text-[#c4a36a] uppercase" }}
            >
              {item.label}
            </Link>
          ))}
          <div className="relative">
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-1 text-xs tracking-widest text-white uppercase"
              aria-expanded={resources}
              onClick={() => setResources((v) => !v)}
            >
              Clients
              <ChevronDown aria-hidden size={14} />
            </button>
            {resources ? (
              <ul className="absolute right-0 z-20 mt-2 w-56 border border-[#c4a36a]/40 bg-navy py-2 shadow-sm">
                {clientLinks.map((item) => (
                  <li key={item.hash}>
                    <Link
                      to="/clients"
                      hash={item.hash}
                      className="block px-4 py-2 text-sm text-white hover:bg-white/10"
                      onClick={() => setResources(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <Link
            to="/quote"
            className="inline-flex min-h-11 items-center border border-[#c4a36a] px-4 text-xs tracking-widest text-[#c4a36a] uppercase transition-colors duration-200 hover:bg-white/10"
          >
            Get a quote
          </Link>
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center border border-white/30 text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-white/15 bg-navy px-5 py-3 lg:hidden" aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={item.hash}
                  className="flex min-h-11 items-center text-sm tracking-wide text-white uppercase"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/clients"
                className="flex min-h-11 items-center text-sm tracking-wide text-white uppercase"
                onClick={() => setOpen(false)}
              >
                For clients
              </Link>
            </li>
            <li>
              <Link
                to="/quote"
                className="flex min-h-11 items-center text-sm tracking-wide text-[#c4a36a] uppercase"
                onClick={() => setOpen(false)}
              >
                Get a quote
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
