import { notFound } from "next/navigation";
import { getPost, getPosts } from "../_components/fetch-post";

const BlogPageBySlug = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const post = await getPost(slug);
  if (!post) return notFound();

  return <div>{post.body}</div>;
};

export default BlogPageBySlug;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p?.slug }));
}
