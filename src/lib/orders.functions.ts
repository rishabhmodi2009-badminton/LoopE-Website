import { createServerFn } from "@tanstack/react-start";
import { COMPANY_EMAIL } from "./company";
import { orderDetails, orderSchema } from "./orders";

// Public checkout accepts validated orders, never exposes private order reads.
export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => orderSchema.parse(input))
  .handler(async ({ data }) => {
    const { order, product, length, colour, unitPrice, total } = orderDetails(data);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("purchase_orders").insert({
      id: order.id,
      customer_name: order.name,
      customer_email: order.email,
      phone: order.phone,
      delivery_address: order.address,
      postal_code: order.postalCode,
      product: product.name,
      quantity: order.quantity,
      preferred_length: length.label,
      preferred_colour: colour.label,
      payment_method: order.payment,
      unit_price: unitPrice,
      total,
      notification_recipient: COMPANY_EMAIL,
    });
    // A retry with the same event ID must not create another order.
    if (error && error.code !== "23505") {
      console.error("Order storage failed", error.code);
      throw new Error("Your order could not be saved. Please try again.");
    }
    return { id: order.id, total, product: product.name, notification: "not_configured" as const };
  });
