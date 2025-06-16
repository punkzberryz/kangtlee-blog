import queryString from "query-string";
import { Suspense } from "react";
import { BlogPreviewItem } from "../../_components/blog-preview-item";
import { unstable_noStore } from "next/cache";
import { getPosts, getPostsByTagName } from "../../_components/fetch-post";
import { Metadata } from "next";

interface BlogsByTagPageProps {
  params: Promise<{
    tagName: string;
  }>;
}
const BlogsByTagPage = async (props: BlogsByTagPageProps) => {
  const params = await props.params;
  const parsed = queryString.parse(params.tagName);
  let tagName = "";
  Object.keys(parsed).forEach((key) => {
    if (key !== "") tagName = key;
  });
  if (tagName === "") return null;
  return (
    <div className="mx-auto max-w-screen-2xl space-y-10">
      <h1>บทความ</h1>
      <Suspense fallback={<BlogPagesSkeleton />}>
        <AsyncBlogPages tagName={tagName} />
      </Suspense>
    </div>
  );
};

export default BlogsByTagPage;

export async function generateMetadata(props: BlogsByTagPageProps): Promise<Metadata> {
  const params = await props.params;
  const parsed = queryString.parse(params.tagName);
  let tagName = "";
  Object.keys(parsed).forEach((key) => {
    if (key !== "") tagName = key;
  });
  if (tagName === "")
    return {
      title: "ไม่พบบทความจาก tag นี้",
      description: "ไม่พบบทความจาก tag นี้",
    };
  return {
    title: `บทความจาก tag: ${tagName}`,
    description: `บทความทั้งหมดที่มี tag: ${tagName}`,
  };
}

const AsyncBlogPages = async ({ tagName }: { tagName: string }) => {
  unstable_noStore();
  // const posts = await db.post.findMany();
  const { posts } = await getPostsByTagName(tagName);
  if (!posts) return;
  if (posts.length === 0) return <p>ไม่พบบทความ</p>;
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
