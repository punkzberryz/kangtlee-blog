import { MetadataRoute } from "next";
import { getPosts } from "./(main)/blog/_components/fetch-post";
import { config } from "@/lib/config";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  let blogUrls: MetadataRoute.Sitemap = [];
  let tagUrls: MetadataRoute.Sitemap = [];
  try {
    const postsReq = getPosts({ includeNotPublished: false });
    const tagsReq = db.postTag.findMany();
    const [tags, { posts }] = await Promise.all([tagsReq, postsReq]);

    if (posts) {
      blogUrls = posts.map((p) => ({
        url: `${config.baseUrl}/blog/${p.slug}`,
        lastModified: p.updatedAt,
      }));
    }
    if (tags) {
      tagUrls = tags.map((t) => ({
        url: `${config.baseUrl}/blog/tags/${t.name}`,
        lastModified,
      }));
    }
  } catch (err) {}
  const routes: MetadataRoute.Sitemap = ([] = [
    "",
    "/ic-design",
    "/contact",
    "/tools/buddhist-year-to-current-year",
    "/tools/image-background-remove",
    "/tools/invoice-generator",
  ].map((r) => ({
    url: `${config.baseUrl}${r}`,
    lastModified,
  })));
  return [...routes, ...blogUrls, ...tagUrls];
}
