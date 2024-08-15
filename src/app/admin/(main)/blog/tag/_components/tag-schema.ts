import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(1, { message: "tag is required" }),
});
export type TagSchema = z.infer<typeof tagSchema>;
