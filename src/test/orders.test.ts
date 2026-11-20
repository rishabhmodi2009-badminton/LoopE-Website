import { describe, expect, it } from "vitest";
import { COMPANY_EMAIL } from "@/lib/company";
import { orderDetails, orderSchema } from "@/lib/orders";

const order = {
  id: "204db1b9-3248-45d8-8fb1-1b5447aef951",
  name: "Test Customer", email: "test@example.com", phone: "81234567",
  address: "Test delivery address", postalCode: "123456",
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
    expect(orderSchema.safeParse({ ...order, address: "" }).success).toBe(false);
  });
});
