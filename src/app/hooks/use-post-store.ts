import { JSONContent } from "novel";
import { create } from "zustand";
import { persist } from "zustand/middleware";

//Post props
interface PostProps {
  isPublished: boolean;
  title: string;
  slug: string;
  htmlContent: string;
  jsonContent: JSONContent;
}
type PostStoreProps = {
  post: PostProps;
  setPost: (post: Partial<PostProps>) => void;
};
export const usePostStore = create<PostStoreProps>()(
  persist(
    (set, get) => ({
      post: {
        htmlContent: "",
        jsonContent: {},
        slug: "",
        title: "",
        isPublished: false,
      },
      setPost: (post) => {
        const { post: currentPost } = get();
        set({
          post: {
            htmlContent: post.htmlContent || currentPost.htmlContent,
            isPublished: post.isPublished || currentPost.isPublished,
            jsonContent: post.jsonContent || currentPost.jsonContent,
            slug: post.slug || currentPost.slug,
            title: post.title || currentPost.title,
          },
        });
      },
    }),
    {
      name: "kangtlee-post-store",
    },
  ),
);
