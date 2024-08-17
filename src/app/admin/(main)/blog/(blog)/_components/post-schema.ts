import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Link can only contain lowercase a-z and/or '-', e.g. this-is-a-book",
    }),
  description: z.string().min(1, { message: "description is required" }),
  keywords: z.string(),
  htmlContent: z.string(),
  isPublished: z.boolean(),
  imgUrl: z.string().min(1, { message: "Image is required" }),
  categoryId: z.string().min(1, { message: "category is required" }),
  tagIds: z.array(z.string()).default([]),
});
export type PostSchema = z.infer<typeof postSchema>;
