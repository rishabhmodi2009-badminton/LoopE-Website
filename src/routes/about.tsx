import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Placeholder, Section } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LoopE Leashes" },
      { name: "description", content: "The story behind LoopE and our mission for recyclable pet gear." },
      { property: "og:title", content: "About — LoopE Leashes" },
      { property: "og:description", content: "The story behind LoopE." },
    ],
  }),
  component: About,
});

const vps = ["VP of Operations", "VP of Product", "VP of Marketing", "VP of Sustainability"];

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="Our Story" />
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Placeholder label="Team photo" />
          <div className="space-y-4 text-muted-foreground">
            <p>LoopE started with a simple question: why do worn-out leashes end up in landfill?</p>
            <p>We design leashes from recycled materials and take them back at the end of their life, turning them into new leashes. A closed loop — just like the name.</p>
            <p>We're a small team of dog lovers who believe every walk can be a little kinder to the planet.</p>
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="mt-24 text-3xl uppercase">Our Leadership</h2>
        <div className="mt-8 grid items-center gap-8 rounded-xl border border-border bg-card p-6 md:grid-cols-[280px_1fr]">
          <Placeholder label="CEO photo" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Chief Executive Officer</p>
            <h3 className="mt-2 text-2xl uppercase">CEO Name</h3>
            <p className="mt-3 text-muted-foreground">A short bio about the CEO, their background and their vision for LoopE.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vps.map((v) => (
            <div key={v} className="rounded-xl border border-border bg-card p-4">
              <Placeholder label="VP photo" />
              <h3 className="mt-4 text-lg uppercase">VP Name</h3>
              <p className="text-sm text-accent">{v}</p>
              <p className="mt-2 text-sm text-muted-foreground">A short bio goes here.</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
