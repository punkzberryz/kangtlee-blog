"use server";

import { db } from "@/lib/db";
import { BadRequestError } from "@/lib/error";
import { catchErrorForServerActionHelper } from "@/lib/error/catch-error-action-helper";
import { Post } from "@prisma/client";

export const fetchRelatedArticles = async ({ post }: { post: Post }) => {
  try {
    //validate body
    if (!post.categoryId || !post.id) {
      throw new BadRequestError("category id not found");
    }
    //find post by category
    const postsReq = db.post.findMany({
      where: {
        categoryId: post.categoryId,
        NOT: {
          id: post.id,
        },
        isPublished: true,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        TagsOnPosts: true,
      },
      take: 20,
    });
    //fetch tags by this id
    const tagsReq = db.tagsOnPosts.findMany({
      where: {
        postId: post.id,
      },
      include: {
        tag: true,
      },
    });

    const [tags, posts] = await Promise.all([tagsReq, postsReq]);
    const tagIds = tags.map((t) => t.tagId);

    const relatedPosts = postsRelationRanking({ posts, tagIds });
    return { posts: relatedPosts };
  } catch (err) {
    const error = catchErrorForServerActionHelper(err);
    if (error.code !== 400) {
      console.log({ error, func: "fetchRelatedArticles" });
    }
    return { error };
  }
};

/*
    * Function to return the first 10 posts sorted by the number of tags that match the post
    
    
*/
function postsRelationRanking({
  posts,
  tagIds,
}: {
  posts: (Post & {
    TagsOnPosts: {
      postId: number;
      tagId: number;
    }[];
  })[];
  tagIds: number[];
}) {
  if (posts.length <= 10) {
    return posts;
  }
  const Scores = new Map<number, number>(); //Score[pistId] = score
  posts.forEach((p) => {
    //loop through tags
    p.TagsOnPosts.forEach((tags) => {
      let score = 0;
      if (tagIds.includes(tags.tagId)) {
        score += 1;
      }
      Scores.set(p.id, score);
    });
  });
  //sort Scores by score
  const sortedPosts = posts.sort((a, b) => {
    const scoreA = Scores.get(a.id) || 0;
    const scoreB = Scores.get(b.id) || 0;
    return scoreB - scoreA;
  });

  // Return the first 10 sorted posts
  return sortedPosts.slice(0, 10);
}
