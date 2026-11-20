import { describe, expect, it } from "vitest";
import { COMPANY_EMAIL } from "@/lib/company";
import { orderDetails, orderSchema } from "@/lib/orders";

const order = {
  id: "204db1b9-3248-45d8-8fb1-1b5447aef951",
  name: "Test Customer", email: "test@example.com", phone: "81234567",
  product: 0, quantity: 2, length: 1, colour: 1, payment: "PayNow" as const,
};
describe("Purchase orders", () => {
  it("addresses order notifications to LoopE's company email", () => {
    expect(COMPANY_EMAIL).toBe("loope.leashes@gmail.com");
  });
  it("preserves customer details and paid customisation in the order copy", () => {
    const copy = orderDetails(order);
    expect(copy.order.email).toBe("test@example.com");
    expect(copy.length.label).toBe("1.2 m");
    expect(copy.colour.label).toBe("Forest Green");
    expect(copy.total).toBe(72);
  });
  it("rejects incomplete order copies", () => {
    expect(orderSchema.safeParse({ ...order, phone: "" }).success).toBe(false);
  });
});

describe("Contact details validation", () => {
  const ok = (patch: Partial<typeof order>) => orderSchema.safeParse({ ...order, ...patch }).success;
  it("accepts Singapore and international phone numbers", () => {
    for (const phone of ["81234567", "8123 4567", "+65 9123 4567", "+6561234567", "+1 415 555 0123"]) {
      expect(ok({ phone })).toBe(true);
    }
  });
  it("rejects invalid phone numbers", () => {
    for (const phone of ["1234", "12345678", "abcdefgh", "8123456", "+65 1234 5678", ""]) {
      expect(ok({ phone })).toBe(false);
    }
  });
  it("rejects invalid emails", () => {
    for (const email of ["test", "test@", "test@example", "a b@example.com", "test@example.c"]) {
      expect(ok({ email })).toBe(false);
    }
  });
});
