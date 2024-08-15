import { cache } from "react";
import { db } from "@/lib/db";
import { InternalServerError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const getPosts = cache(async (options: {} = {}) => {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return { posts };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
});

export const getPost = async (slug: string) => {
  try {
    const post = await db.post.findUnique({ where: { slug } });
    if (!post) throw new InternalServerError(getPostError.postNotFound);
    return { post };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};

export const enum getPostError {
  postNotFound = "post not found",
}
