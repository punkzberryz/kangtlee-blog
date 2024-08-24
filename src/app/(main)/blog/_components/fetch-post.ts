import { cache } from "react";
import { db } from "@/lib/db";
import { InternalServerError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";

export const getPosts = cache(
  async (options: { includeNotPublished?: boolean } = {}) => {
    try {
      const posts = await db.post.findMany({
        orderBy: {
          id: "desc",
        },
        where: {
          isPublished: options.includeNotPublished ? undefined : true,
        },
      });
      return { posts };
    } catch (err) {
      const error = catchErrorForServerActionHelper(err);
      return { error };
    }
  },
);

export const getPost = cache(
  async (
    slug: string,
    options: {
      includeNotPublished?: boolean;
    } = {},
  ) => {
    try {
      const post = await db.post.findUnique({
        where: {
          slug,
          isPublished: options.includeNotPublished ? undefined : true,
        },
        include: {
          author: true,
          category: true,
          TagsOnPosts: {
            select: { tag: true },
          },
        },
      });

      if (!post) throw new InternalServerError(getPostError.postNotFound);

      return { post };
    } catch (err) {
      const error = catchErrorForServerActionHelper(err);
      console.log({ error, message: "get post error" });
      return { error };
    }
  },
);

export const enum getPostError {
  postNotFound = "post not found",
}

export type GetPostResponse = NonNullable<
  Awaited<ReturnType<typeof getPost>>["post"]
>;
