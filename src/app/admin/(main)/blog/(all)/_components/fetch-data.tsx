import { DataTableSkeleton } from "@/components/table/data-table-skeleton";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/db";
import { UnauthorizedError, UnauthorizedMessageCode } from "@/lib/error";
import { Suspense } from "react";
// import { Client } from "./client";

export const FetchData = () => {
  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <FetchBlogs />
    </Suspense>
  );
};

const FetchBlogs = async () => {
  const blogsReq = db.post.findMany({
    skip: (BLOGS_PAGE_ID - 1) * BLOGS_LIMIT,
    take: BLOGS_LIMIT,
    orderBy: {
      id: "desc",
    },
  });
  const userReq = validateRequest();
  const [blogs, { user }] = await Promise.all([blogsReq, userReq]);
  if (!user) throw new UnauthorizedError(UnauthorizedMessageCode.notAuthorized);
  const hasMore = blogs.length === BLOGS_LIMIT;
  return (
    <div className="flex flex-col space-y-2">
      {/* <Client
        initialData={{
          blogs,
          hasMore,
        }}
        limit={BLOGS_LIMIT}
      /> */}
    </div>
  );
};
const BLOGS_LIMIT = 100;
const BLOGS_PAGE_ID = 1;
