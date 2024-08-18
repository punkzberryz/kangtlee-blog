import { db } from "@/lib/db";
import { cn, delay } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPost, getPostError } from "../../_components/fetch-post";
import { BlogContent } from "./blog-content";

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
  // await delay(2000);
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

  return <BlogContent post={post} />;
};
