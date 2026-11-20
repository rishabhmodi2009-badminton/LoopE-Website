import { createServerFn } from "@tanstack/react-start";
import { COMPANY_EMAIL, PICKUP_LOCATION } from "./company";
import { orderDetails, orderSchema } from "./orders";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const { order, product, length, colour, unitPrice, total } = orderDetails(data);
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set, so the order email cannot be sent");
      throw new Error("Order email is not configured");
    }

    const ref = order.id.slice(0, 8);
    const rows: [string, string][] = [
      ["Reference", ref],
      ["Name", order.name],
      ["Email", order.email],
      ["Phone", order.phone],
      ["Pickup", PICKUP_LOCATION],
      ["Product", product.name],
      ["Quantity", String(order.quantity)],
      ["Length", length.label],
      ["Colour", colour.label],
      ["Paying at pickup by", order.payment],
      ["Unit price", `S$${unitPrice}`],
      ["Total", `S$${total}`],
    ];

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // A retry of the same order (same id) won't send a second email.
        "Idempotency-Key": `order-${order.id}`,
      },
      body: JSON.stringify({
        from: "LoopE Orders <onboarding@resend.dev>",
        to: [COMPANY_EMAIL],
        reply_to: order.email,
        subject: `New order ${ref}: ${order.quantity} × ${product.name} (S$${total})`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html: `<h2>New LoopE order</h2><table cellpadding="6" style="border-collapse:collapse">${rows
          .map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escape(v)}</strong></td></tr>`)
          .join("")}</table><p>Reply to this email to send the customer their pickup date.</p>`,
      }),
    });

    if (!res.ok) {
      console.error("Resend rejected the order email", res.status, await res.text());
      throw new Error("Order email failed");
    }
    return { id: order.id, total, product: product.name };
  });
