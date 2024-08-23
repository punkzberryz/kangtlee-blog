import { z } from "zod";

export const addCommentSchema = z.object({
  name: z.string().min(1, { message: "โปรดระบุชื่อ" }).max(20),
  email: z
    .string()
    .min(1, { message: "โปรดระบุอีเมล" })
    .email({ message: "ต้องเป็นอีเมล" }),
  comment: z
    .string()
    .min(1, { message: "โปรดระบุข้อความ" })
    .max(255, { message: "ข้อความต้องไม่เกิน 255 ตัวอักษร" }),
  phone: z.string().optional(), // For bot filter
  website: z.string().optional(),
});
export type AddCommentSchema = z.infer<typeof addCommentSchema>;
