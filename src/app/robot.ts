import { config } from "@/lib/config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "Googlebot",
      allow: "/",
      disallow: ["/admin", "/admin/signin", "/admin/signup"],
    },
    sitemap: `${config.baseUrl}/sitemap.xml`,
  };
}
