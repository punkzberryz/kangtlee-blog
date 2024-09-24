/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.pic.in.th",
        pathname: "**",
      },

      {
        protocol: "http",
        hostname: "localhost*",
        pathname: "**",
      },
    ],
  },
  // redirects: async () => {
  //   return [
  //     {
  //       source: "/:path*",
  //       has: [{ type: "header", key: "host", value: "www.kangtlee.com" }],
  //       destination: "https://kangtlee.com/:path*",
  //       permanent: true,
  //     },
  //   ];
  // },
  // …
};

// Merge MDX config with Next.js config
export default nextConfig;
