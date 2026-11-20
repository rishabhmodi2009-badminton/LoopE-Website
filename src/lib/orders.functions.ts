import { createServerFn } from "@tanstack/react-start";
import { COMPANY_EMAIL, CUSTOMER_SENDER, PICKUP_LOCATION } from "./company";
import { orderDetails, orderSchema } from "./orders";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const table = (rows: [string, string][]) =>
  `<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${escape(v)}</strong></td></tr>`)
    .join("")}</table>`;

async function sendEmail(apiKey: string, idempotencyKey: string, email: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // A retry of the same order (same id) won't send a second email.
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(email),
  });
  if (!res.ok) console.error("Resend rejected an email", idempotencyKey, res.status, await res.text());
  return res.ok;
}

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
    const items: [string, string][] = [
      ["Product", product.name],
      ["Quantity", String(order.quantity)],
      ["Length", length.label],
      ["Colour", colour.label],
      ["Total", `S$${total}`],
      ["Pickup", PICKUP_LOCATION],
      ["Paying at pickup by", order.payment],
    ];
    const rows: [string, string][] = [
      ["Reference", ref],
      ["Name", order.name],
      ["Email", order.email],
      ["Phone", order.phone],
      ...items,
      ["Unit price", `S$${unitPrice}`],
    ];

    // Both emails share a subject and the confirmation points back at the order email's
    // Message-ID, so Gmail keeps the order, the confirmation and all replies in one thread.
    const subject = `LoopE order ${ref}: ${order.quantity} × ${product.name} (S$${total})`;
    const orderMessageId = `<order-${order.id}@loope-leashes.com>`;

    // The sender must stay as-is: the LoopE Gmail filter labels orders by it.
    const sentToLoope = await sendEmail(apiKey, `order-${order.id}`, {
      from: "LoopE Orders <onboarding@resend.dev>",
      to: [COMPANY_EMAIL],
      reply_to: order.email,
      subject,
      headers: { "Message-ID": orderMessageId },
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<h2>New LoopE order</h2>${table(rows)}<p>Reply to this email to send the customer their pickup date.</p>`,
    });
    if (!sentToLoope) throw new Error("Order email failed");

    const intro = `Hi ${order.name}, thanks for your order! We've received it, and someone from the LoopE team will reach out to you soon about when it will be ready for pickup.`;
    const outro = `You'll pay by ${order.payment === "Cash" ? "cash" : "PayNow"} when you collect it at the ${PICKUP_LOCATION}. Questions? Just reply to this email.`;
    // The order already reached LoopE, so a failed confirmation shouldn't fail the order.
    const confirmed = await sendEmail(apiKey, `confirm-${order.id}`, {
      from: CUSTOMER_SENDER,
      to: [order.email],
      reply_to: COMPANY_EMAIL,
      subject,
      headers: { "In-Reply-To": orderMessageId, References: orderMessageId },
      text: [intro, "", ...[["Reference", ref], ...items].map(([k, v]) => `${k}: ${v}`), "", outro, "", "The LoopE team"].join("\n"),
      html: `<p>${escape(intro)}</p>${table([["Reference", ref], ...items])}<p>${escape(outro)}</p><p>The LoopE team</p>`,
    });

    return { id: order.id, total, product: product.name, confirmed };
  });
