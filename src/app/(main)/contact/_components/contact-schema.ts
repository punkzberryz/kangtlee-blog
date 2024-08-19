import { z } from "zod";

export const contachSchema = z.object({
  name: z.string().min(1, { message: "โปรดระบุชื่อ" }).max(20),
  email: z
    .string()
    .min(1, { message: "โปรดระบุอีเมล" })
    .email({ message: "ต้องเป็นอีเมล" }),
  message: z.string().min(1, { message: "โปรดระบุข้อความ" }),
  phone: z.string().optional(),
});
export type ContactSchema = z.infer<typeof contachSchema>;
