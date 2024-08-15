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
    //validate user
    const { user } = await validateRequest();
    if (!user)
      throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
    const { description, htmlContent, isPublished, keywords, title } = data;
    const slug = title.toLowerCase().replaceAll(/ /g, "");
    const post = await db.post.create({
      data: {
        title,
        keywords,
        isPublished,
        description,
        content: htmlContent,
        imgUrl: "",
        slug,
        authorId: user.id,
      },
    });

    return { post };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
