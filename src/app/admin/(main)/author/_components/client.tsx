"use client";
import { DataTable } from "@/components/table/data-table";
import { User } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TablePageLimit } from "@/components/table/table-page-limit";
import { TablePaginationButtons } from "@/components/table/table-pagination-buttons";
import { getManyAuthorsAction } from "./author-action";
import { authorColumnDef } from "./author-column-def";
interface ClientProps {
  limit: number;
  initialData: { authors: User[]; hasMore: boolean };
}
export const Client = ({ initialData, limit }: ClientProps) => {
  const queryClient = useQueryClient();
  const [pageId, setPageId] = useState(1);
  const [pageLimit, setPageLimit] = useState(limit);
  const { data, refetch, isPlaceholderData } = useQuery({
    // We add initialData so that when we delete data in this table, it will clear query-cache.
    // But what if the data is on second page??
    queryKey: ["getManyAuthorsAction", pageId, pageLimit, initialData],
    queryFn: () => getManyAuthors({ pageId: pageId, limit: pageLimit }),
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
        queryKey: ["getManyAuthorsAction", pageId + 1],
        queryFn: () => getManyAuthors({ pageId: pageId + 1, limit: pageLimit }),
      });
    }
  }, [data, isPlaceholderData, pageId, queryClient, pageLimit]);
  return (
    <div className="flex flex-col space-y-8">
      <DataTable data={data.authors} columns={authorColumnDef} />
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
const getManyAuthors = async ({
  pageId,
  limit,
}: {
  pageId: number;
  limit: number;
}) => {
  const { authors, error } = await getManyAuthorsAction({ pageId, limit });
  if (error) {
    throw new Error(error.message);
  }
  return { authors, hasMore: authors.length === limit };
};
