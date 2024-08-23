"use client";
import { CancelMaxWidthWrapper } from "@/components/max-width-wrapper";
import { Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { fetchRelatedArticles } from "./action";
import { BlogPreviewItem } from "../../_components/blog-preview-item";

interface RelatedArticlesProps {
  post: Post;
}
export const RelatedArticles = ({ post }: RelatedArticlesProps) => {
  const { data, error, isLoading } = useRelatedArticles({ post });
  return (
    <CancelMaxWidthWrapper className="mt-10 flex flex-col items-center gap-8 bg-gray-100 px-2 py-10 dark:bg-gray-900 md:px-20">
      <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        บทความที่เกี่ยวข้อง
      </h4>
      <ul className="flex gap-8">
        <RelatedArticleList posts={data} isLoading={isLoading} />
        {/* <BlogPreviewItem.skeleton /> */}
      </ul>
    </CancelMaxWidthWrapper>
  );
};

const RelatedArticleList = ({
  posts,
  isLoading,
}: {
  posts: Post[] | undefined;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <>
        <BlogPreviewItem.skeleton />
        <BlogPreviewItem.skeleton />
        <BlogPreviewItem.skeleton />
      </>
    );
  }
  if (!posts || !posts.length) {
    return (
      <div className="flex min-h-20 flex-col justify-center">
        ไม่มีบทความที่เกี่ยวข้อง...
      </div>
    );
  }
  return (
    <>
      {posts.map((p) => (
        <BlogPreviewItem key={p.id} post={p} />
      ))}
    </>
  );
};

const useRelatedArticles = ({ post }: { post: Post }) => {
  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchRelatedArticles", post.id],
    queryFn: async () => {
      const { error, posts } = await fetchRelatedArticles({ post });

      // throw new Error("not implemented");
      if (error) throw new Error(error.message);
      if (!posts) throw new Error("posts not found");
      return posts;
    },
  });

  return { data, isLoading, error };
};
