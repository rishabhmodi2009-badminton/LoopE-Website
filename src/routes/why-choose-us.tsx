import { createFileRoute } from "@tanstack/react-router";
import { Recycle, ShieldCheck, Heart, RotateCcw } from "lucide-react";
import { PageHero, Placeholder, Section } from "@/components/site-layout";

export const Route = createFileRoute("/why-choose-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Us — LoopE Leashes" },
      { name: "description", content: "Why LoopE leashes are stronger, comfier and better for the planet." },
      { property: "og:title", content: "Why Choose LoopE" },
      { property: "og:description", content: "Strong, comfortable and fully recyclable leashes." },
    ],
  }),
  component: Why,
});

const reasons = [
  { icon: Recycle, title: "Fully recyclable", text: "Made from recycled materials and recyclable again.", detail: "Every strand of a LoopE leash comes from recycled plastic. When it finally wears out, it can be broken down and remade into new gear, so nothing goes to waste." },
  { icon: ShieldCheck, title: "Built strong", text: "Tested for pullers, big dogs and daily adventures.", detail: "Our tightly woven webbing and reinforced stitching are tested well beyond everyday loads, with sturdy metal clips that won't let go when your dog does." },
  { icon: Heart, title: "Comfortable grip", text: "Soft handles that are easy on your hands.", detail: "Padded, ergonomic handles keep your grip comfortable on long walks and help prevent rope burn when your pup gets excited." },
  { icon: RotateCcw, title: "Take-back program", text: "Send your old leash back and we'll recycle it.", detail: "When your leash reaches the end of its life, send it back to us. We recycle it into new products and give you a discount on your next order." },
];

function Why() {
  return (
    <>
      <PageHero eyebrow="Why Choose Us" title="Better for dogs. Better for Earth." />
      <Section>
        <div className="space-y-20">
          {reasons.map((r, i) => (
            <div key={r.title} className="grid items-center gap-10 md:grid-cols-2">
              <div className={i % 2 ? "md:order-2" : ""}>
                <r.icon className="h-8 w-8 text-accent" />
                <h2 className="mt-4 text-3xl uppercase">{r.title}</h2>
                <p className="mt-2 font-medium text-foreground">{r.text}</p>
                <p className="mt-4 text-muted-foreground">{r.detail}</p>
              </div>
              <Placeholder label={`${r.title} image`} />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
