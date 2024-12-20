import { Suspense } from "react";
import { BlogPreviewItem } from "./blog-preview-item";
import { getPosts } from "./fetch-post";
import { BlogPagination } from "./blog-pagination";
import { revalidatePath, unstable_cache } from "next/cache";

export const FetchBlogPage = ({ pageId }: { pageId: number }) => {
  return (
    <Suspense key={pageId} fallback={<BlogPagesSkeleton />}>
      <AsyncBlogPages pageId={pageId} />
    </Suspense>
  );
};

const AsyncBlogPages = async ({ pageId }: { pageId: number }) => {
  const { error, posts, totalPosts } = await unstable_cache(
    async () => {
      return getPosts({
        includeNotPublished: false,
        limit: LIMIT,
        pageId,
      });
    },
    ["fetchblogspage", pageId.toString()],
    {
      revalidate: 3600, // 1 hour
    },
  )();

  if (error || !posts || posts.length === 0 || !totalPosts) {
    revalidatePath("/");
    revalidatePath(`/blog/page/${pageId}`);
    return null;
  }
  const totalPages = Math.ceil(totalPosts / LIMIT);
  return (
    <>
      <ul className="flex flex-wrap gap-8">
        {posts.map((post) => (
          <BlogPreviewItem key={post.id} post={post} />
        ))}
      </ul>
      <BlogPagination currentPage={pageId} totalPages={totalPages} />
    </>
  );
};

const BlogPagesSkeleton = () => {
  return (
    <ul className="flex flex-wrap gap-8">
      <BlogPreviewItem.skeleton />
      <BlogPreviewItem.skeleton />
      <BlogPreviewItem.skeleton />
      <BlogPreviewItem.skeleton />
    </ul>
  );
};
const LIMIT = 20;
