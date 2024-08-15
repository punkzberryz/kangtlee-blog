import { Skeleton } from "@/components/ui/skeleton";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { Suspense } from "react";
import { TagForm } from "./tag-form";

interface FetchDataProps {
  isNew?: boolean;
  tagId: number;
  title: string;
}
export const FetchData = ({ tagId, title, isNew }: FetchDataProps) => {
  return (
    <Suspense fallback={<FetchDataSkeleton title={title} isNew={isNew} />}>
      <FetchDataAsync tagId={tagId} title={title} isNew={isNew} />
    </Suspense>
  );
};

async function FetchDataAsync({ tagId, title, isNew }: FetchDataProps) {
  //fetch all tags
  const tagReq = isNew
    ? null
    : db.postTag.findUnique({
        where: { id: tagId },
      });
  //validate user
  const userReq = validateRequest();
  const [tag, { user }] = await Promise.all([tagReq, userReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  return <TagForm initialData={tag} isNew={isNew} title={title} />;
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
