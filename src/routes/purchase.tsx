import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero, Section } from "@/components/site-layout";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { products, lengths, colours, payments } from "@/lib/orders";
import { submitOrder } from "@/lib/orders.functions";
import { COMPANY_EMAIL, PICKUP_LOCATION } from "@/lib/company";

export const Route = createFileRoute("/purchase")({
  head: () => ({
    meta: [
      { title: "Purchase — LoopE Leashes" },
      { name: "description", content: "Order your LoopE leash for pickup at the SAS High School Office." },
      { property: "og:title", content: "Purchase — LoopE Leashes" },
      { property: "og:description", content: "Order your LoopE leash for pickup at the SAS High School Office." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Purchase,
});

const input = "w-full rounded-lg border border-border bg-card px-4 py-2.5 text-foreground outline-none focus:border-accent";

function Purchase() {
  const [product, setProduct] = useState(0);
  const [qty, setQty] = useState(1);
  const [length, setLength] = useState(0);
  const [colour, setColour] = useState(0);
  const [pay, setPay] = useState<(typeof payments)[number]>(payments[0]);
  const [done, setDone] = useState<{ id: string; total: number; product: string } | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const saveOrder = useServerFn(submitOrder);
  const selectedProduct = products[product] ?? products[0];
  const selectedLength = lengths[length] ?? lengths[0];
  const selectedColour = colours[colour] ?? colours[0];
  if (!selectedProduct || !selectedLength || !selectedColour) return null;
  const unit = selectedProduct.price + selectedLength.extra + selectedColour.extra;
  const total = unit * qty;

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;
    const form = new FormData(e.currentTarget);
    const id = orderId ?? crypto.randomUUID();
    setOrderId(id);
    setPending(true);
    setError("");
    try {
      const result = await saveOrder({ data: {
        id, name: String(form.get("name") ?? ""), email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        product, quantity: qty, length, colour, payment: pay,
      } });
      setDone(result);
      window.scrollTo({ top: 0 });
    } catch {
      setError("Your order could not be sent. Please try again or email us at " + COMPANY_EMAIL + ".");
    } finally {
      setPending(false);
    }
  };

  if (done)
    return (
      <PageHero eyebrow="Thank you" title="Order Received">
        Your order of {qty} × {done.product} (S${done.total}) has been sent to the LoopE team. Reference: {done.id.slice(0, 8)}.
        Pick it up at the {PICKUP_LOCATION} and pay there by {pay === "Cash" ? "cash" : "PayNow"}. We'll send you a
        follow-up email with your pickup date. Questions? Email {COMPANY_EMAIL}.
      </PageHero>
    );

  return (
    <>
      <PageHero eyebrow="Purchase" title="Your Order">Fill in your details and customise your leash. Orders are collected and paid for in person at the {PICKUP_LOCATION}.</PageHero>
      <Section>
        <form onSubmit={submit} className="grid gap-10 md:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <fieldset className="space-y-3">
              <legend className="mb-3 text-xl uppercase">Your details</legend>
              <input name="name" aria-label="Full name" autoComplete="name" required maxLength={100} placeholder="Full name" className={input} />
              <input name="email" aria-label="Email" autoComplete="email" required type="email" maxLength={255} placeholder="Email" className={input} />
              <input name="phone" aria-label="Phone number" autoComplete="tel" required type="tel" maxLength={20} placeholder="Phone number" className={input} />
            </fieldset>
            <fieldset className="space-y-3">
              <legend className="mb-3 text-xl uppercase">Product</legend>
              <select aria-label="Product" value={product} onChange={(e) => setProduct(+e.target.value)} className={input}>
                {products.map((p, i) => <option key={p.name} value={i}>{p.name} — S${p.price}</option>)}
              </select>
              <input type="number" min={1} max={20} value={qty} onChange={(e) => setQty(Math.max(1, Math.min(20, +e.target.value || 1)))} className={input} aria-label="Quantity" />
            </fieldset>
            <fieldset className="space-y-3">
              <legend className="mb-1 text-xl uppercase">Customise <span className="text-sm normal-case text-muted-foreground">(optional, adds extra)</span></legend>
              <label className="block text-sm text-muted-foreground">Preferred length
                <select value={length} onChange={(e) => setLength(+e.target.value)} className={`${input} mt-1`}>
                  {lengths.map((l, i) => <option key={l.label} value={i}>{l.label}{l.extra ? ` (+S$${l.extra})` : ""}</option>)}
                </select>
              </label>
              <label className="block text-sm text-muted-foreground">Preferred colour
                <select value={colour} onChange={(e) => setColour(+e.target.value)} className={`${input} mt-1`}>
                  {colours.map((c, i) => <option key={c.label} value={i}>{c.label}{c.extra ? ` (+S$${c.extra})` : ""}</option>)}
                </select>
              </label>
            </fieldset>
          </div>
          <aside className="h-fit space-y-4 rounded-xl border border-border bg-card p-6 md:sticky md:top-28">
            <h2 className="text-xl uppercase">Pickup</h2>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{PICKUP_LOCATION}</span>. We'll email you a pickup date
              after you order.
            </p>
            <h2 className="border-t border-border pt-4 text-xl uppercase">Pay at pickup</h2>
            {payments.map((p) => (
              <label key={p} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 ${pay === p ? "border-accent" : "border-border"}`}>
                <input type="radio" name="pay" checked={pay === p} onChange={() => setPay(p)} className="accent-[var(--accent)]" />
                <span className="text-sm">{p}</span>
              </label>
            ))}
            <div className="space-y-1 border-t border-border pt-4 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Leash</span><span>S${selectedProduct.price}</span></div>
              <div className="flex justify-between"><span>Extras</span><span>S${selectedLength.extra + selectedColour.extra}</span></div>
              <div className="flex justify-between"><span>Quantity</span><span>× {qty}</span></div>
              <div className="flex justify-between pt-2 text-lg font-semibold text-foreground"><span>Total</span><span>S${total}</span></div>
            </div>
            <p className="text-sm text-muted-foreground">Nothing is charged online. You pay when you collect your order.</p>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={pending} className="h-auto w-full rounded-full px-6 py-3 font-semibold hover:bg-accent hover:text-accent-foreground">{pending ? "Sending order…" : "Place Order"}</Button>
          </aside>
        </form>
      </Section>
    </>
  );
}
