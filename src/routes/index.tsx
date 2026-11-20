import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Placeholder } from "@/components/site-layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LoopE Leashes — Recyclable Dog Leashes" },
      { name: "description", content: "LoopE makes durable dog leashes from recycled materials that can be recycled again." },
      { property: "og:title", content: "LoopE Leashes — Recyclable Dog Leashes" },
      { property: "og:description", content: "Durable dog leashes made to loop back into new ones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const summaries = [
  { to: "/about", title: "About", text: "Who we are and why we started LoopE." },
  { to: "/why-choose-us", title: "Why Choose Us", text: "Strong, comfortable, and fully recyclable." },
  { to: "/purchase", title: "Buy", text: "Order online, then pick up and pay at the SAS High School Office." },
  { to: "/contact", title: "Contact", text: "Questions? We'd love to hear from you." },
] as const;

const overview = [
  { eyebrow: "Impact", title: "Less waste, every walk", text: "Each LoopE leash reuses recycled plastic that would otherwise sit in landfill or oceans, and our take-back program keeps old leashes out of the bin.", to: "/about" },
  { eyebrow: "How they're made", title: "From bottles to leashes", text: "We collect and clean recycled plastics, spin them into strong fibres, and weave them into durable, soft leashes — then recycle them again when they wear out.", to: "/about" },
  { eyebrow: "Why choose us", title: "Strong, comfy, circular", text: "Built to handle pullers and long adventures, gentle on your hands, and designed to loop back into new gear.", to: "/why-choose-us" },
] as const;

function Index() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Recyclable dog leashes</p>
          <h1 className="mt-3 text-5xl uppercase leading-tight sm:text-6xl">
            Walk With <span className="text-accent">Purpose</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Leashes made from recycled materials — and when they retire, we turn them into new ones.
          </p>
          <Link to="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground">
            Shop leashes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Placeholder label="Hero image" />
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaries.map((s) => (
          <Link key={s.to} to={s.to} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent">
            <h2 className="text-lg uppercase">{s.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            <ArrowRight className="mt-4 h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </section>
      {overview.map((o, i) => (
        <section key={o.title} className="mx-auto mt-24 grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
          <div className={i % 2 ? "md:order-2" : ""}>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{o.eyebrow}</p>
            <h2 className="mt-3 text-3xl uppercase sm:text-4xl">{o.title}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{o.text}</p>
            <Link to={o.to} className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Placeholder label={`${o.eyebrow} image`} />
        </section>
      ))}
    </>
  );
}
