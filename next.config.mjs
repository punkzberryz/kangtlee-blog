import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  //  transpilePackages: ["next-mdx-remote"]
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
