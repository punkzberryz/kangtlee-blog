import { cache } from "react";
import { db } from "@/lib/db";
import { InternalServerError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
/**
 * Fetches paginated blog posts from the database.
 *
 * This function is cached to improve performance on repeated calls.
 * It supports pagination and can optionally include unpublished posts.
 *
 * @param options An object containing optional parameters:
 *   - includeNotPublished: If true, includes unpublished posts in the result.
 *   - limit: The number of posts to fetch per page (default: 20).
 *   - pageId: The page number to fetch (default: 1).
 *
 * @returns An object containing:
 *   - posts: An array of fetched blog posts.
 *   - totalPosts: The total count of posts (respecting the publication filter).
 *   - error: Any error that occurred during the fetch operation.
 *
 * The function uses Promise.all to concurrently fetch posts and the total count,
 * optimizing database queries. It also handles errors using a custom helper function.
 */
export const getPosts = cache(
  async (
    options: {
      includeNotPublished?: boolean;
      limit?: number;
      pageId?: number;
    } = {},
  ) => {
    // Set default values for pagination
    const pageId = options.pageId || 1;
    const limit = options.limit || 20;
    try {
      // Use Promise.all to concurrently fetch posts and total count
      const [posts, totalPosts] = await Promise.all([
        // Fetch paginated posts
        db.post.findMany({
          orderBy: {
            id: "desc", // Order by id descending (newest first)
          },
          where: {
            // Include unpublished posts if specified, otherwise only published
            isPublished: options.includeNotPublished ? undefined : true,
          },
          take: limit, // Number of posts per page
          skip: (pageId - 1) * limit, // Calculate offset for pagination
        }),
        // Count total number of posts (respecting the publication filter)
        db.post.count({
          where: {
            isPublished: options.includeNotPublished ? undefined : true,
          },
        }),
      ]);
      return { posts, totalPosts };
    } catch (err) {
      const error = catchErrorForServerActionHelper(err);
      return { error };
    }
  },
);
export const getPostsByTagName = async (tagName: string) => {
  try {
    const tagAndPost = await db.postTag.findUnique({
      where: { name: tagName },
      include: {
        TagsOnPosts: {
          include: { post: true },
          orderBy: { postId: "desc" },
        },
      },
    });
    if (!tagAndPost) throw new InternalServerError("tag not found");
    const posts = tagAndPost?.TagsOnPosts.map((tagOnPost) => tagOnPost.post);
    return { posts };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    return { error };
  }
};
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
