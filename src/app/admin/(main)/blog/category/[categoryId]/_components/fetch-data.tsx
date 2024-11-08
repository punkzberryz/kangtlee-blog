import { Skeleton } from "@/components/ui/skeleton";
import { validateRequestOnServerComponent } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { Suspense } from "react";
import { CategoryForm } from "./category-form";

interface FetchDataProps {
  isNew?: boolean;
  categoryId: number;
  title: string;
}
export const FetchData = ({ categoryId, title, isNew }: FetchDataProps) => {
  return (
    <Suspense fallback={<FetchDataSkeleton title={title} isNew={isNew} />}>
      <FetchDataAsync categoryId={categoryId} title={title} isNew={isNew} />
    </Suspense>
  );
};

async function FetchDataAsync({ categoryId, title, isNew }: FetchDataProps) {
  //fetch all categories
  const categoryReq = isNew
    ? null
    : db.postCategory.findUnique({
        where: { id: categoryId },
      });
  //validate user
  const userReq = validateRequestOnServerComponent();
  const [category, { user }] = await Promise.all([categoryReq, userReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  return <CategoryForm initialData={category} isNew={isNew} title={title} />;
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
