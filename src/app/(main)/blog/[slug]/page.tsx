import { notFound } from "next/navigation";
import { getPost, getPosts } from "../_components/fetch-post";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../_components/mdx-components";
import remarkGfm from "remark-gfm";
const BlogPageBySlug = async ({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) => {
  const post = await getPost(slug);
  const components = useMDXComponents({});
  if (!post) return notFound();
  return (
    <div>
      <MDXRemote
        source={post.body}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
};

export default BlogPageBySlug;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p?.slug }));
}
