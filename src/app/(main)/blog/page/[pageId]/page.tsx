import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { FetchBlogPage } from "../../_components/fetch-blog-page";
import { getPosts } from "../../_components/fetch-post";

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
      <h1>บทความ: หน้าที่ {id.toString()}</h1>
      <FetchBlogPage pageId={id} />
    </div>
  );
};

export default BlogsByPageId;

/**
 * Generates static parameters for blog pagination pages.
 *
 * This function is used by Next.js to statically generate blog pagination pages at build time.
 * It determines the total number of pages based on the total post count and generates
 * parameters for all pages except the first one.
 *
 * The first page (page 1) is not included in the generated params because it's handled
 * by the root route ('/') of the application.
 *
 * @returns An array of objects, each containing a 'page' property with the page number as a string.
 *          These objects are used by Next.js to create static pages for each pagination page.
 *
 * Note: This function assumes that the first page of blog posts is rendered at the root route,
 * and all subsequent pages follow the pattern '/blogs/[page]'.
 */
export async function generateStaticParams() {
  // Fetch the total number of posts
  const { totalPosts } = await getPosts({
    includeNotPublished: false,
    limit: 1,
    pageId: 1,
  });

  if (!totalPosts) return [];
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalPosts / LIMIT);

  // Generate params for pages 2 and above
  // We exclude page 1 because it will be handled by the root route
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(),
  }));
}

export function generateMetadata({ params }: BlogsByPageIdProps): Metadata {
  return {
    title: `บทความ - หน้า ${params.pageId}`,
    description:
      "สวัสดีครับ ผม KangTLee ผมชอบเขียนบทความเกี่ยวกับ Web development และ Lifestyle ครับ",
  };
}

const LIMIT = 20;
