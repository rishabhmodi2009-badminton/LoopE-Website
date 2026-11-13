import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHead, Section, Swatch } from "@/components/site-layout";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy — LoopE" },
      { name: "description", content: "How to order LoopE pet gear made from upcycled textiles." },
      { property: "og:title", content: "Buy — LoopE" },
      { property: "og:description", content: "How to order from LoopE." },
    ],
  }),
  component: Buy,
});

const steps = [
  { title: "Pick your gear", text: "Browse the range and choose what suits your pet." },
  { title: "Choose size and fabric", text: "Tell us your pet's measurements. We'll show you which fabrics are in stock this batch." },
  { title: "Check out", text: "Online checkout is on its way. Until then, message us and we'll sort it out by hand." },
  { title: "Get it home", text: "Delivery and pickup options in Singapore will be confirmed at launch." },
] as const;

function Buy() {
  return (
    <>
      <PageHead index="04" name="Buy" title="Getting one">
        Online checkout isn't live yet. Here's how ordering will work, and how to get one now.
      </PageHead>

      <Section>
        <div className="grid gap-16 md:grid-cols-12">
          <ol className="relative md:col-span-7">
            <div aria-hidden className="stitch-y absolute top-3 bottom-3 left-[0.95rem] text-moss" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[2rem_1fr] gap-6 pb-12 last:pb-0">
                <span className="label relative z-10 bg-paper py-1 text-center text-base text-moss">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-3xl sm:text-4xl">{s.title}</h2>
                  <p className="mt-3 text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="md:col-span-4 md:col-start-9">
            <Swatch label="packed orders" className="aspect-[3/4]" />
            <div className="mt-8 flex flex-col gap-4">
              <Link to="/contact" className="label bg-ink px-6 py-4 text-center text-paper hover:bg-moss">
                Order by message
              </Link>
              <Link to="/shop" className="label link-under self-start">
                Back to the range
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
