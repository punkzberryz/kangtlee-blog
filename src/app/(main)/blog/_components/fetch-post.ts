import { cache } from "react";
import path from "path";
import fs from "fs/promises";

import { Post } from "./post-schema";
export const getPosts = cache(async () => {
  const posts = await fs.readdir("./src/markdown/");
  return Promise.all(
    posts
      .filter((file) => path.extname(file) === ".mdx")
      .map(async (file) => {
        const filePath = `./src/markdown/${file}`;
        const postContent = await fs.readFile(filePath, "utf8");
      }),
  );
});

export const getPost = async (slug: string) => {
  const posts = await getPosts();

  // return posts.find((p) => p?.slug === slug) ?? null;
};
