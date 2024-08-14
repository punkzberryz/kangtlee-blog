import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { cn, delay } from "@/lib/utils";
import { Suspense } from "react";

const BlogAsync = async ({ slug }: { slug: string }) => {
  await delay(2000);
  const post = await db.post.findUnique({
    where: {
      slug: slug,
    },
  });
  if (!post?.content) {
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
        "prose prose-lg dark:prose-invert prose-headings:font-title font-default max-w-full focus:outline-none",
      )}
    ></div>
  );
};

const BlogPageBySlug = ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogAsync slug={slug} />
    </Suspense>
  );
};

export default BlogPageBySlug;

// export async function generateStaticParams() {
//   const posts = await getPosts();
//   return posts.map((p) => ({ slug: p?.slug }));
// }
export async function generateStaticParams() {
  console.log("fetching many posts");
  await delay(2000);
  const posts = await db.post.findMany();
  console.log("found many posts");
  return posts.map((p) => ({ slug: p?.slug }));
}
