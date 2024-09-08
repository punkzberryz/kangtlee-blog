import { z } from "zod";

const billToSchema = z.object({
  name: z.string().min(1).max(255),
  addressLine1: z.string().min(1).max(255),
  addressLine2: z.string().min(1).max(255),
  taxId: z.string().min(1).max(13),
});

const orderItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(255),
  description: z.string().max(255),
  price: z.number(),
  quantity: z.number(),
  total: z.number(),
});

const orderSummarySchema = z.object({
  subTotal: z.number(),
  tax: z.number(),
  discount: z.number(),
  total: z.number(),
});

const authorizedBySchema = z.object({
  name: z.string().min(1).max(255),
  signatureUrl: z.string().optional(),
});

export const paymentMethodOptions = [
  {
    value: "cash",
    label: "เงินสด",
  },
  {
    value: "credit",
    label: "บัตรเครดิต",
  },
  {
    value: "bank",
    label: "โอนเงิน",
  },
  {
    value: "notAvailable",
    label: "ไม่ระบุ",
  },
] as const;

export const paymentMethodLabels = new Map(
  paymentMethodOptions.map((o) => [o.value, o.label]),
);

type PaymentMethodProps = (typeof paymentMethodOptions)[number]["value"];
const PaymentMethodArray: [PaymentMethodProps, ...PaymentMethodProps[]] = [
  paymentMethodOptions[0].value,
  ...paymentMethodOptions.slice(1).map((o) => o.value),
];

export const invoiceFormSchema = z.object({
  companyLogoUrl: z.string().optional(),
  companyName: z.string().min(1).max(255),
  addressLine1: z.string().min(1).max(255),
  addressLine2: z.string().min(1).max(255),
  taxId: z.string().min(1).max(13),
  refId: z.string().min(1).max(255),
  date: z.string().min(1).max(255),
  quoteId: z.string().min(1).max(255),
  billTo: billToSchema,
  orderItems: z.array(orderItemSchema),
  orderSummary: orderSummarySchema,
  paymentMethod: z.enum(PaymentMethodArray, {
    required_error: "กรุณาเลือกวิธีการชำระเงิน",
  }),
  authorizedBy: authorizedBySchema,
});
export type InvoiceFormSchema = z.infer<typeof invoiceFormSchema>;
