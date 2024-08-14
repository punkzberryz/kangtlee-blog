import { db } from "@/lib/db";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

const BlogsPage = () => {
  return (
    <div>
      <h1>Blog page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncBlogPages />
      </Suspense>
    </div>
  );
};

const AsyncBlogPages = async () => {
  unstable_noStore();
  const posts = await db.post.findMany();
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
      ))}
    </div>
  );
};
export default BlogsPage;
