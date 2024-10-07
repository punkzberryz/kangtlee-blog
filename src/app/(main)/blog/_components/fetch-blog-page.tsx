import { Suspense } from "react";
import { BlogPreviewItem } from "./blog-preview-item";
import { getPosts } from "./fetch-post";
import { notFound } from "next/navigation";
import { BlogPagination } from "./blog-pagination";

export const FetchBlogPage = ({ pageId }: { pageId: number }) => {
  return (
    <Suspense key={pageId} fallback={<BlogPagesSkeleton />}>
      <AsyncBlogPages pageId={pageId} />
    </Suspense>
  );
};

const AsyncBlogPages = async ({ pageId }: { pageId: number }) => {
  const { posts, totalPosts, error } = await getPosts({
    includeNotPublished: false,
    limit: LIMIT,
    pageId,
  });
  if (error || !posts || posts.length === 0 || !totalPosts) {
    return notFound();
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
