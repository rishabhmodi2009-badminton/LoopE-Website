import { createFileRoute } from "@tanstack/react-router";
import { PageHead, Section, Swatch } from "@/components/site-layout";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why LoopE" },
      {
        name: "description",
        content:
          "Why LoopE: pet gear made from local discarded textiles, designed with pet owners and built to last.",
      },
      { property: "og:title", content: "Why LoopE" },
      { property: "og:description", content: "Gear that started as someone else's waste." },
    ],
  }),
  component: Why,
});

const reasons = [
  {
    title: "It was going to be rubbish",
    text: "Every LoopE product starts as fabric a Singapore supplier was about to throw out. Buying one keeps that material in use instead of in an incinerator.",
    swatch: "sorted offcuts",
  },
  {
    title: "Owners designed it",
    text: "We test ideas with local pet owners before anything goes into production. If your dog chews through clips or your cat hates collars, that changes what we make.",
    swatch: "a fitting session",
  },
  {
    title: "It has to survive a puller",
    text: "Recycled shouldn't mean flimsy. Fabric that can't hold a dog lunging at a pigeon doesn't make the cut, and the points that take the strain get extra stitching.",
    swatch: "stitching detail",
  },
  {
    title: "Your money stays local",
    text: "Suppliers, makers and the sustainability groups we support are all here. Buying LoopE puts money into Singapore's circular economy rather than a container ship.",
    swatch: "a partner workshop",
  },
] as const;

function Why() {
  return (
    <>
      <PageHead index="03" name="Why LoopE" title="Good for the walk. Good for the island.">
        Plenty of pet gear calls itself eco-friendly. Here's what we can point to.
      </PageHead>

      <Section>
        <ol className="border-t-2 border-ink">
          {reasons.map((r, i) => (
            <li key={r.title} className="grid gap-8 border-b border-ink/20 py-12 md:grid-cols-12 md:gap-10">
              <span className="font-display text-7xl leading-none font-extrabold text-moss [font-stretch:75%] md:col-span-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-5">
                <h2 className="text-4xl sm:text-5xl">{r.title}</h2>
                <p className="mt-5 text-ink-soft">{r.text}</p>
              </div>
              <Swatch label={r.swatch} className="h-56 md:col-span-4 md:col-start-9" />
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
