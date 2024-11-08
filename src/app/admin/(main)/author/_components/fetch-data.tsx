import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { validateRequestOnServerComponent } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { Suspense } from "react";
import { Client } from "./client";

export const FetchData = () => {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <FetchAuthors />
    </Suspense>
  );
};
const FetchAuthors = async () => {
  const authorsReq = db.user.findMany({
    skip: (AUTHORS_PAGE_ID - 1) * AUTHORS_LIMIT,
    take: AUTHORS_LIMIT,
  });
  const userReq = validateRequestOnServerComponent();
  const [authors, { user }] = await Promise.all([authorsReq, userReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  const hasMore = authors.length === AUTHORS_LIMIT;
  return (
    <div className="flex flex-col space-y-2">
      <Client
        initialData={{
          authors,
          hasMore,
        }}
        limit={AUTHORS_LIMIT}
      />
    </div>
  );
};
const AUTHORS_LIMIT = 100;
const AUTHORS_PAGE_ID = 1;
