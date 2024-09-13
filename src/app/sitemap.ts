import { MetadataRoute } from "next";
import { getPosts } from "./(main)/blog/_components/fetch-post";
import { config } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await getPosts({ includeNotPublished: false });
    if (posts) {
      blogUrls = posts.map((p) => ({
        url: `${config.baseUrl}/blog/${p.slug}`,
        lastModified: p.updatedAt,
      }));
    }
  } catch (err) {}
  const routes: MetadataRoute.Sitemap = ([] = [
    "",
    "/contact",
    "/tools/buddhist-year-to-current-year",
    "/tools/image-background-remove",
    "/tools/invoice-generator",
  ].map((r) => ({
    url: `${config.baseUrl}${r}`,
    lastModified,
  })));
  return [...routes, ...blogUrls];
}
