import { db } from "@/lib/db";
import { cn, delay } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPost, getPostError } from "../../_components/fetch-post";

interface FetchBlogProps {
  slug: string;
}
export const FetchBlog = ({ slug }: FetchBlogProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FetchBlogAsync slug={slug} />
    </Suspense>
  );
};

const FetchBlogAsync = async ({ slug }: FetchBlogProps) => {
  await delay(2000);
  const { post, error } = await getPost(slug);
  if (error) {
    if (error.message === getPostError.postNotFound) {
      return notFound();
    }
    throw new Error();
  }
  if (!post.content) {
    return notFound();
  }
  console.log("found post!!");
  // console.log({ post });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: post.content }}
      className={cn(
        "ProseMirror",
        "relative min-h-[500px] w-full max-w-screen-lg border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg",
        "prose-headings:font-title font-default prose prose-lg max-w-full dark:prose-invert focus:outline-none",
      )}
    ></div>
  );
};
