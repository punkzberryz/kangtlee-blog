import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import { Suspense } from "react";
import { getPosts } from "../blog/_components/fetch-post";
import { BlogPreviewItem } from "../blog/_components/blog-preview-item";

const BlogsPage = () => {
  return (
    <div className="space-y-10">
      <h1>บทความ2</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncBlogPages />
      </Suspense>
    </div>
  );
};

const AsyncBlogPages = async () => {
  unstable_noStore();
  // const posts = await db.post.findMany();
  const { posts } = await getPosts({ includeNotPublished: true });
  if (!posts) return;
  return (
    <ul className="flex flex-wrap gap-8">
      {posts.map((post) => (
        <BlogPreviewItem key={post.id} post={post} />
      ))}
    </ul>
  );
};
export default BlogsPage;
export const metadata: Metadata = {
  title: "บทความ",
  description: "บทความทั้งหมด",
};
