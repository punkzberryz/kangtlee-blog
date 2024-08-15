import { Suspense } from "react";
import { BlogForm } from "./blog-form";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { validateRequest } from "@/lib/auth";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { FetchPostById } from "../../_components/fetch-data";

interface FetchDataProps {
  isNew?: boolean;
  blogId: number;
  title: string;
}
export const FetchData = ({ blogId, title, isNew }: FetchDataProps) => {
  return (
    <Suspense fallback={<FetchDataSkeleton title={title} isNew={isNew} />}>
      <FetchDataAsync title={title} isNew={isNew} blogId={blogId} />
    </Suspense>
  );
};
async function FetchDataAsync({ blogId, title, isNew }: FetchDataProps) {
  //fetch all categories and tags
  const tagsReq = db.postTag.findMany({
    orderBy: { id: "desc" },
  });
  const categoriesReq = db.postCategory.findMany({
    orderBy: { id: "desc" },
  });
  const userReq = validateRequest();
  const postReq = isNew
    ? null
    : db.post.findUnique({
        where: { id: blogId },
        include: { TagsOnPosts: true },
      });
  const [tags, categories, { user }, post] = await Promise.all([
    tagsReq,
    categoriesReq,
    userReq,
    postReq,
  ]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  const fetchedPost: FetchPostById | null = post
    ? { ...post, tags: post.TagsOnPosts.map((t) => ({ id: t.tagId })) }
    : null;
  return (
    <BlogForm
      initialData={fetchedPost}
      title={title}
      isNew={isNew}
      categories={categories}
      tags={tags}
    />
  );
}
function FetchDataSkeleton({
  title,
  isNew,
}: {
  title: string;
  isNew?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Skeleton className="font-semibold text-transparent md:text-3xl">
          {title}
        </Skeleton>
        {isNew ? null : <Skeleton className="h-10 w-10" />}
      </div>
      <Skeleton className="h-20" />
    </div>
  );
}
