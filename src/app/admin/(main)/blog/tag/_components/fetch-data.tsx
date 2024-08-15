import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { Suspense } from "react";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { Client } from "./client";

export const FetchData = () => {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <FetchTags />
    </Suspense>
  );
};

const FetchTags = async () => {
  const tagsReq = db.postTag.findMany({
    skip: (TAGS_PAGE_ID - 1) * TAGS_LIMIT,
    take: TAGS_LIMIT,
    orderBy: {
      id: "desc",
    },
  });
  const userReq = validateRequest();
  const [tags, { user }] = await Promise.all([tagsReq, userReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  const hasMore = tags.length === TAGS_LIMIT;
  return (
    <div className="flex flex-col space-y-2">
      <Client
        initialData={{
          tags,
          hasMore,
        }}
        limit={TAGS_LIMIT}
      />
    </div>
  );
};
const TAGS_LIMIT = 100;
const TAGS_PAGE_ID = 1;
