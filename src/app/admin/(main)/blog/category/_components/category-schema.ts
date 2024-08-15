import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, { message: "category is required" }),
});
export type CategorySchema = z.infer<typeof categorySchema>;
