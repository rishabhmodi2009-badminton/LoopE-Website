import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, Section, Swatch } from "@/components/site-layout";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — LoopE" },
      {
        name: "description",
        content: "LoopE leashes, collars and accessories made from upcycled textiles in Singapore.",
      },
      { property: "og:title", content: "Shop — LoopE" },
      { property: "og:description", content: "Pet gear made from upcycled textiles." },
    ],
  }),
  component: Shop,
});

const products = [
  { name: "Loop Leash", note: "Braided from fabric offcuts. Our first and main product." },
  { name: "Trail Rope Leash", note: "Longer and thicker, for park runs and bigger dogs." },
  { name: "Hands-Free Loop", note: "Worn across the body so both hands stay free." },
  { name: "Loop Collar", note: "Soft-edged and adjustable." },
  { name: "Comfort Harness", note: "Padded with scraps that would otherwise be too small to use." },
  { name: "Bag Pouch", note: "Clips to any leash. Made from what's left over from everything else." },
] as const;

function Shop() {
  return (
    <>
      <PageHead index="01" name="Shop" title="The range">
        Everything here is made from discarded textiles. Fabrics change batch to batch, so no two
        pieces look quite the same. Prices will be posted at launch.
      </PageHead>

      <Section>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {products.map((p, i) => (
            <article key={p.name} className={i % 2 ? "md:mt-24" : ""}>
              <Swatch label={p.name} className="aspect-[4/3]" />
              <div className="mt-5 flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
                <h2 className="text-3xl sm:text-4xl">{p.name}</h2>
                <span className="label shrink-0 text-ink-soft">Price at launch</span>
              </div>
              <p className="mt-4 text-ink-soft">{p.note}</p>
              <Link to="/buy" className="label link-under mt-4 inline-block">
                How to order
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
