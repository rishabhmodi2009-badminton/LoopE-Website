import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Placeholder, Section } from "@/components/site-layout";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — LoopE Leashes" },
      { name: "description", content: "Browse LoopE recyclable leashes, collars and harnesses." },
      { property: "og:title", content: "Shop — LoopE Leashes" },
      { property: "og:description", content: "Recyclable leashes, collars and harnesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

const products = [
  { name: "Classic Loop Leash", price: "$29" },
  { name: "Trail Rope Leash", price: "$34" },
  { name: "City Short Leash", price: "$24" },
  { name: "Hands-Free Loop", price: "$39" },
  { name: "Loop Collar", price: "$19" },
  { name: "Comfort Harness", price: "$45" },
];

function Shop() {
  return (
    <>
      <PageHero eyebrow="Shop" title="Our Leashes">Every product is made from recycled plastics and can be recycled again.</PageHero>
      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-card p-4">
              <Placeholder label="Product image" />
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-base uppercase">{p.name}</h2>
                <span className="font-semibold text-accent">{p.price}</span>
              </div>
              <Link to="/purchase" className="mt-3 inline-block text-sm text-muted-foreground hover:text-accent">Buy now →</Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
