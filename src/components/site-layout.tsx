import { Link } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/about", label: "About" },
  { to: "/why-choose-us", label: "Why Choose Us" },
  { to: "/purchase", label: "Buy" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-3">
        <Link to="/" aria-label="LoopE home" className="block bg-background">
          <img src="/loope-logo.png" alt="LoopE Leashes logo" className="h-16 w-auto mix-blend-lighten sm:h-20" />
        </Link>
        <nav className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-primary text-primary-foreground hover:bg-primary" }}
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
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <span>© 2026 LoopE Leashes. Walk With Purpose.</span>
        <span className="text-accent">♻ 100% recyclable</span>
      </div>
    </footer>
  );
}

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-primary/50 bg-secondary text-muted-foreground ${className}`}
    >
      <ImageIcon className="h-8 w-8 text-accent" />
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h1 className="mt-3 text-4xl uppercase sm:text-6xl">{title}</h1>
      {children && <div className="mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div>}
    </section>
  );
}

export const Section = ({ children }: { children: ReactNode }) => (
  <section className="mx-auto max-w-6xl px-6">{children}</section>
);
