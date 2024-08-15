import { db } from "@/lib/db";
import { Metadata } from "next";
import { FetchBlog } from "./_components/fetch-blog";
import { getPost } from "./_components/get-post";
interface BlogPageBySlugProps {
  params: {
    slug: string;
  };
}

const BlogPageBySlug = ({ params: { slug } }: BlogPageBySlugProps) => {
  return <FetchBlog slug={slug} />;
};

export default BlogPageBySlug;

export async function generateStaticParams() {
  const posts = await db.post.findMany();
  return posts.map((p) => ({ slug: p?.slug }));
}

export async function generateMetadata({
  params: { slug },
}: BlogPageBySlugProps): Promise<Metadata> {
  const { post, error } = await getPost(slug);
  if (error) {
    return {};
  }
  if (!post.content) {
    return {};
  }
  return {
    title: "Blog",
    description: "Blog description",
    openGraph: {
      title: "Blog",
      description: "Blog description",
      url: "https://example.com/blog",
      siteName: "Blog",
      locale: "th_TH",
      type: "website",
      images: [
        {
          url: "https://example.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Og Image Alt",
        },
      ],
    },
    twitter: {
      title: "Blog",
      card: "summary_large_image",
      creator: "@creator",
    },
    icons: {
      shortcut: "/favicon.ico",
    },
  };
}
