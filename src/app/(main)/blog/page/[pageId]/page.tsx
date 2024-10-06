import { notFound, redirect } from "next/navigation";
import { getPosts } from "../../_components/fetch-post";
import { BlogPreviewItem } from "../../_components/blog-preview-item";
import { Metadata } from "next";
import { Suspense } from "react";

interface BlogsByPageIdProps {
  params: { pageId: string };
}
const BlogsByPageId = ({ params }: BlogsByPageIdProps) => {
  const id = parseInt(params.pageId);
  if (isNaN(id)) {
    return notFound();
  }
  if (id <= 1) redirect("/");

  return (
    <div className="mx-auto max-w-screen-2xl space-y-10">
      <h1>บทความ</h1>
      <Suspense key={id} fallback={<BlogPagesSkeleton />}>
        <AsyncBlogPages pageId={id} />
      </Suspense>
    </div>
  );
};

const AsyncBlogPages = async ({ pageId }: { pageId: number }) => {
  const { posts } = await getPosts({
    includeNotPublished: false,
    limit: LIMIT,
    pageId,
  });
  if (!posts || posts.length === 0) {
    return notFound();
  }
  return (
    <ul className="flex flex-wrap gap-8">
      {posts.map((post) => (
        <BlogPreviewItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default BlogsByPageId;

const LIMIT = 20;

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

export const metadata: Metadata = {
  title: "บทความ",
  description:
    "สวัสดีครับ ผม KangTLee ผมชอบเขียนบทความเกี่ยวกับ Web development และ Lifestyle ครับ",
};
