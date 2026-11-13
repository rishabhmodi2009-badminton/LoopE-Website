import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, Placeholder, Section } from "@/components/site-layout";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy — LoopE Leashes" },
      { name: "description", content: "Order your recyclable LoopE leash." },
      { property: "og:title", content: "Buy — LoopE Leashes" },
      { property: "og:description", content: "Order your recyclable LoopE leash." },
    ],
  }),
  component: Buy,
});

const steps = ["Choose your leash", "Pick a colour and length", "Check out securely", "Get it delivered"];

function Buy() {
  return (
    <>
      <PageHero eyebrow="Buy" title="Get Your Leash">Ordering is simple. Online checkout is coming soon.</PageHero>
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-primary-foreground">{i + 1}</span>
                <span className="font-medium">{s}</span>
              </li>
            ))}
          </ol>
          <Link to="/shop" className="inline-flex w-fit rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground md:col-span-2 md:order-last">
            Browse the shop →
          </Link>
          <Placeholder label="Checkout image" />
        </div>
      </Section>
    </>
  );
}
