import { createFileRoute } from "@tanstack/react-router";
import { Placeholder, Section } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LoopE Leashes" },
      { name: "description", content: "LoopE's mission to transform discarded textiles in Singapore into quality pet accessories through local partnerships and community-led circular design." },
      { property: "og:title", content: "About — LoopE Leashes" },
      { property: "og:description", content: "LoopE's mission to transform discarded textiles in Singapore into quality pet accessories through local partnerships and community-led circular design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const vps = ["VP of Operations", "VP of Product", "VP of Marketing", "VP of Sustainability"];

function About() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">About</p>
        <h1 className="mt-2 text-3xl uppercase">Our Mission</h1>
      </section>
      <Section>
        <div className="space-y-3 text-lg leading-normal text-muted-foreground">
          <p>Our mission is to connect Singapore's pet-owning community with local sustainability initiatives by transforming discarded textiles into functional, durable, and high-quality pet accessories, while creating a meaningful connection between everyday pet ownership and environmental responsibility. Through sourcing recycled fabrics from local suppliers, collaborating with upcycling partners, and designing products that meet the practical needs of pet owners, LoopE aims to reduce textile waste while promoting more sustainable consumer habits. Beyond simply producing eco-friendly pet products, we strive to build a community in which pet owners can actively participate in reducing waste, supporting local environmental initiatives, and contributing to a more circular economy. Ultimately, we want to demonstrate that sustainability does not have to come at the expense of quality, convenience, or style, but can instead become a natural part of everyday life.</p>
        </div>
      </Section>
      <Section>
        <h2 className="mt-8 text-3xl uppercase">Core Principle</h2>
        <div className="mt-3 space-y-3 text-lg leading-normal text-muted-foreground">
          <p>We do not begin by assuming what pet owners want or what materials can be reused. We begin by listening to local pet owners, understanding their needs, and working with local textile partners to develop products that combine functionality, quality, and environmental responsibility.</p>
          <p>We envision a long-term circular system in which discarded textiles in Singapore are transformed into valuable everyday pet products, allowing sustainability to become a natural part of pet ownership. LoopE will build from a trusted network of local textile suppliers, upcycling partners, and pet owners toward a broader model of circular design that is practical, community-driven, and measurably sustainable.</p>
        </div>
      </Section>
      <Section>
        <h2 className="mt-10 text-3xl uppercase">Our Leadership</h2>
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
