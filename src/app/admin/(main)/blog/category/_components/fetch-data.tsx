import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { Suspense } from "react";
import { Client } from "./client";

export const FetchData = () => {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <FetchCategories />
    </Suspense>
  );
};

const FetchCategories = async () => {
  const categoriesReq = db.postCategory.findMany({
    skip: (CATEGORIES_PAGE_ID - 1) * CATEGORIES_LIMIT,
    take: CATEGORIES_LIMIT,
    orderBy: {
      id: "desc",
    },
  });
  const userReq = validateRequest();
  const [categories, { user }] = await Promise.all([categoriesReq, userReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  const hasMore = categories.length === CATEGORIES_LIMIT;
  return (
    <div className="flex flex-col space-y-2">
      <Client
        initialData={{
          categories,
          hasMore,
        }}
        limit={CATEGORIES_LIMIT}
      />
    </div>
  );
};
const CATEGORIES_LIMIT = 100;
const CATEGORIES_PAGE_ID = 1;
