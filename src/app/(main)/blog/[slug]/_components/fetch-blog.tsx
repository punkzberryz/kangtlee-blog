import { delay } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPost, getPostError } from "../../_components/fetch-post";
import { BlogContent } from "./blog-content";
import { Skeleton } from "@/components/ui/skeleton";

interface FetchBlogProps {
  slug: string;
}
export const FetchBlog = ({ slug }: FetchBlogProps) => {
  return (
    <Suspense fallback={<BlogSkeleton />}>
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

const BlogSkeleton = () => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col space-y-8 px-12">
      <div className="flex flex-col items-center space-y-4">
        {/* title */}
        <Skeleton className="h-20 w-full" />
        {/* author avatar */}
        <Skeleton className="h-10 w-1/2" />
      </div>

      {/* Hero Iamge */}
      <Skeleton className="h-48" />
      {/* Body content */}
      <Skeleton className="h-[500px]" />
      {/* Author Card */}
      <Skeleton className="h-36" />
    </div>
  );
};
