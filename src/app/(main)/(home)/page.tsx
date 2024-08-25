import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { getPosts } from "../blog/_components/fetch-post";
import { BlogPreviewItem } from "../blog/_components/blog-preview-item";

const BlogsPage = () => {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-10">
      <h1>บทความ</h1>
      <Suspense fallback={<BlogPagesSkeleton />}>
        <AsyncBlogPages />
      </Suspense>
    </div>
  );
};

const AsyncBlogPages = async () => {
  unstable_noStore();
  // const posts = await db.post.findMany();
  const { posts } = await getPosts({ includeNotPublished: false });
  if (!posts) return;
  return (
    <ul className="flex flex-wrap gap-8">
      {posts.map((post) => (
        <BlogPreviewItem key={post.id} post={post} />
      ))}
    </ul>
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
export default BlogsPage;
export const metadata: Metadata = {
  title: "บทความ",
  description:
    "สวัสดีครับ ผม KangTLee ผมชอบเขียนบทความเกี่ยวกับ Web development และ Lifestyle ครับ",
};
