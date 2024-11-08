import { Skeleton } from "@/components/ui/skeleton";
import { validateRequestOnServerComponent } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  BadRequestError,
  UnauthorizedError,
  UnauthorizedMessageCode,
} from "@/lib/error";
import { Suspense } from "react";
import { AuthorForm } from "./author-form";

interface FetchDataProps {
  authorId: string;
  title: string;
}
export const FetchData = ({ authorId, title }: FetchDataProps) => {
  return (
    <Suspense fallback={<FetchDataSkeleton title={title} />}>
      <FetchDataAsync authorId={authorId} title={title} />
    </Suspense>
  );
};

async function FetchDataAsync({ authorId, title }: FetchDataProps) {
  //fetch all categories
  const authorReq = db.user.findUnique({ where: { id: authorId } });
  //validate user
  const userReq = validateRequestOnServerComponent();
  const [author, { user }] = await Promise.all([authorReq, userReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  if (!author) throw new BadRequestError();
  return <AuthorForm initialData={author} title={title} />;
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
