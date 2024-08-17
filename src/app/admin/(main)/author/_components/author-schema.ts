import { z } from "zod";

export const authorSchema = z.object({
  displayName: z.string().min(1, { message: "displayName is required" }),
  bio: z.string().or(z.literal("")).optional(),
  imgUrl: z.string().or(z.literal("")),
});
export type AuthorSchema = z.infer<typeof authorSchema>;
