import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "description is required" }),
  keywords: z.string(),
  htmlContent: z.string(),
  isPublished: z.boolean(),
  imgUrl: z.string().min(1, { message: "Image is required" }),
  categoryId: z.string().min(1, { message: "category is required" }),
  tagIds: z.array(z.string()).default([]),
});
export type PostSchema = z.infer<typeof postSchema>;
