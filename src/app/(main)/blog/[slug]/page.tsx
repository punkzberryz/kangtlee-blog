import { Metadata } from "next";
import { FetchBlog } from "./_components/fetch-blog";
import { config } from "@/lib/config";
import { getPost, getPosts } from "../_components/fetch-post";

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
  const { posts, error } = await getPosts();
  if (error) {
    console.error({ error });
  }
  if (!posts) return [];
  return posts.map((p) => ({ slug: p?.slug }));
}

export async function generateMetadata({
  params: { slug },
}: BlogPageBySlugProps): Promise<Metadata> {
  const { post, error } = await getPost(slug);
  if (error) {
    return metadataNotFound;
  }
  if (!post) {
    return metadataNotFound;
  }
  const { title, keywords, description, imgUrl } = post;
  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    openGraph: {
      title: {
        absolute: title,
      },
      description,
      url: config.baseUrl + "/blog/" + slug,
      siteName: "KangTLee Blog",
      locale: "th_TH",
      type: "article",
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      title: {
        absolute: title,
      },
      description,
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      card: "summary_large_image",
      creator: "@KangTLee1",
    },
  };
}

const metadataNotFound: Metadata = {
  title: "ไม่พบหน้าที่คุณต้องการ | KangTLee Blog",
  description: "ไม่พบหน้าที่คุณต้องการ",
};
