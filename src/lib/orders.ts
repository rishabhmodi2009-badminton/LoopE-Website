import { z } from "zod";

export const products = [
  { name: "Classic Loop Leash", price: 29 },
  { name: "Trail Rope Leash", price: 34 },
  { name: "City Short Leash", price: 24 },
  { name: "Hands-Free Loop", price: 39 },
];
export const lengths = [{ label: "Standard (no extra)", extra: 0 }, { label: "1.2 m", extra: 3 }, { label: "1.8 m", extra: 5 }, { label: "3 m", extra: 8 }];
export const colours = [{ label: "Standard (no extra)", extra: 0 }, { label: "Forest Green", extra: 4 }, { label: "Midnight Black", extra: 4 }, { label: "Sage", extra: 4 }];
export const payments = ["Cash", "PayNow"] as const;

// Singapore numbers are 8 digits starting with 3, 6, 8 or 9 (optional +65);
// anything else must be a full international number starting with +.
export const PHONE_PATTERN = String.raw`(\+65[\s\-]?)?[3689]\d{3}[\s\-]?\d{4}|\+(?!65)[1-9][\d\s\-]{7,17}`;
export const EMAIL_PATTERN = String.raw`[^\s@]+@[^\s@]+\.[A-Za-z]{2,}`;

const text = (max: number) => z.string().trim().min(1).max(max);
export const orderSchema = z.object({
  id: z.string().uuid(),
  name: text(100),
  email: z.string().trim().max(255).email().regex(new RegExp(`^${EMAIL_PATTERN}$`)),
  phone: z.string().trim().max(20).regex(new RegExp(`^(?:${PHONE_PATTERN})$`)),
  product: z.number().int().min(0).max(products.length - 1),
  quantity: z.number().int().min(1).max(20),
  length: z.number().int().min(0).max(lengths.length - 1),
  colour: z.number().int().min(0).max(colours.length - 1),
  payment: z.enum(payments),
});

export function orderDetails(input: z.infer<typeof orderSchema>) {
  const order = orderSchema.parse(input);
  const product = products[order.product];
  const length = lengths[order.length];
  const colour = colours[order.colour];
  if (!product || !length || !colour) throw new Error("Invalid order options");
  const unitPrice = product.price + length.extra + colour.extra;
  return { order, product, length, colour, unitPrice, total: unitPrice * order.quantity };
}
