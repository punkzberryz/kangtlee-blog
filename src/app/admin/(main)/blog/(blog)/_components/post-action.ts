"use server";

import { db } from "@/lib/db";
import { postSchema, PostSchema } from "./post-schema";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { validateRequest } from "@/lib/auth";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const createPost = async ({ data }: { data: PostSchema }) => {
  try {
    //validate data
    const parse = postSchema.safeParse(data);
    if (parse.error) throw new BadRequestError("invalid post body");
    const categoryId = parseInt(data.categoryId);
    if (isNaN(categoryId)) throw new BadRequestError();
    const tagIds = data.tagIds.map((id) => parseInt(id));
    if (tagIds.some((id) => isNaN(id))) throw new BadRequestError();

    //validate user
    const { user } = await validateRequest();
    if (!user)
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    const { description, htmlContent, isPublished, keywords, title, imgUrl } =
      data;
    const slug = title
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .trim() // Trim whitespace from both ends
      .replace(/\s+/g, "_"); // Replace spaces with underscores
    const post = await db.post.create({
      data: {
        title,
        keywords,
        isPublished,
        description,
        content: htmlContent,
        imgUrl,
        slug,
        categoryId,
        authorId: user.id,
        TagsOnPosts: {
          createMany: {
            data: [...tagIds.map((id) => ({ tagId: id }))],
          },
        },
      },
    });

    return { post };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
