"use server";

import { db } from "@/lib/db";

export const createPost = async ({
  data: { content, published, slug, title },
}: {
  data: {
    slug: string;
    title: string;
    content: string;
    published: boolean;
  };
}) => {
  try {
    const post = await db.post.create({
      data: {
        slug,
        title,
        content,
        published,
      },
    });
    return { post };
  } catch (err: any) {
    return { error: err.message as string };
  }
};
