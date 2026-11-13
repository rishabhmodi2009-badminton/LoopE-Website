import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const tabs = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/why-choose-us", label: "Why LoopE" },
  { to: "/buy", label: "Buy" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-3 sm:px-8">
        <Link to="/" aria-label="LoopE home" className="-ml-2 shrink-0">
          <img src="/loope-logo.png" alt="LoopE Leashes" className="h-16 w-auto sm:h-20" />
        </Link>
        <nav className="label flex flex-wrap gap-x-6 gap-y-2">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="py-1 text-paper/70 transition-colors hover:text-paper"
              activeProps={{ className: "text-paper! border-b-2 border-moss" }}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="weave h-3" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-display text-4xl font-extrabold uppercase leading-none [font-stretch:75%] sm:text-5xl">
            Nothing here started new.
          </p>
          <p className="mt-4 max-w-md text-paper/70">
            LoopE makes pet gear from textiles Singapore was going to throw away.
          </p>
        </div>
        <ul className="label space-y-2 md:col-span-3 md:col-start-8">
          {tabs.map((t) => (
            <li key={t.to}>
              <Link to={t.to} className="text-paper/70 hover:text-paper">
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="label space-y-2 text-paper/70 md:col-span-2">
          <p>Singapore</p>
          <p>© {new Date().getFullYear()} LoopE</p>
        </div>
      </div>
    </footer>
  );
}

export function Swatch({ label, className = "" }: { label: string; className?: string }) {
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      <div className="weave h-full min-h-48 w-full" />
      <figcaption className="label absolute bottom-0 left-0 bg-paper px-2 py-1 text-ink">
        Photo to come: {label}
      </figcaption>
    </figure>
  );
}

export function PageHead({
  index,
  name,
  title,
  children,
}: {
  index: string;
  name: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 pb-12 sm:px-8 sm:pt-20">
      <p className="label text-ink-soft">
        {index} <span className="text-moss">/</span> {name}
      </p>
      <h1 className="mt-6 max-w-5xl text-[clamp(3rem,10vw,8rem)]">{title}</h1>
      {children && <div className="mt-8 max-w-2xl text-xl text-ink-soft">{children}</div>}
    </section>
  );
}

export const Section = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-8 ${className}`}>{children}</section>
);

export const Stitch = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`stitch w-full ${className}`} />
);
