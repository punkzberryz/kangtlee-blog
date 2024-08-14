import { z } from "zod";
export const signUpSchema = z.object({
  adminSecret: z.string().min(1, { message: "Admin secret is required" }),
});
export type SignUpSchema = z.infer<typeof signUpSchema>;
