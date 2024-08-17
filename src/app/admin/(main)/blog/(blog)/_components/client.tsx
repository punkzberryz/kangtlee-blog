"use client";
import { DataTable } from "@/components/table/data-table";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TablePageLimit } from "@/components/table/table-page-limit";
import { TablePaginationButtons } from "@/components/table/table-pagination-buttons";
import { Post } from "@prisma/client";
import { getManyPostAction } from "./post-action";
import { blogColumnDef } from "./blog-column-def";

interface ClientProps {
  limit: number;
  initialData: { posts: Post[]; hasMore: boolean };
}

export const Client = ({ initialData, limit }: ClientProps) => {
  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const { data, refetch, isPlaceholderData } = useQuery({
    // We add initialData so that when we delete data in this table, it will clear query-cache.
    // But what if the data is on second page??
    queryKey: ["getManyPostAction", pageId, pageLimit, initialData],
    queryFn: () => getManyPosts({ pageId: pageId, limit: pageLimit }),
    refetchOnMount: false,
    // placeholderData: keepPreviousData,
    initialData,
  });
  useEffect(() => {
    refetch();
  }, [pageLimit, refetch]);
  //prefetch next page
  useEffect(() => {
    if (!isPlaceholderData && data.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["getManyPostAction", pageId + 1],
        queryFn: () => getManyPosts({ pageId: pageId + 1, limit: pageLimit }),
      });
    }
  }, [data, isPlaceholderData, pageId, queryClient, pageLimit]);
  return (
    <div className="flex flex-col space-y-8">
      <DataTable data={data.posts} columns={blogColumnDef} />
      <div className="items-cente mt-5 flex justify-end space-x-6">
        <TablePageLimit setPageLimit={setPageLimit} />
        <TablePaginationButtons
          hasMore={data.hasMore}
          pageId={pageId}
          setPageId={setPageId}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </div>
  );
};
const getManyPosts = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  const { posts, error } = await getManyPostAction({ pageId, limit });
  if (error) {
    throw new Error(error.message);
  }
  return { posts, hasMore: posts.length === limit };
};
