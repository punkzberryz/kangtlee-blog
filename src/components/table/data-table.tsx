"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import * as t from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    onUpdateData: (rowIndex: number, columnId: string, value: any) => void;
    onDeleteRow: (rowIndex: number) => void;
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAddNewClick?: () => void;
  onUpdateData: (rowIndex: number, columnId: string, value: TValue) => void;
  onDeleteRow: (rowIndex: number) => void;
  showSearchBar?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onAddNewClick,
  onDeleteRow,
  onUpdateData,
  showSearchBar = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    meta: {
      onUpdateData,
      onDeleteRow,
    },
  });

  useEffect(() => {
    setSorting([]);
  }, []);

  return (
    <div className="group space-y-4">
      {/* <TableToolbar table={table} showSearchBar={showSearchBar} /> */}
      <div className="rounded-md border">
        <t.Table>
          <t.TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <t.TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <t.TableHead
                      // className="border"
                      key={header.id}
                      style={{
                        minWidth: header.column.columnDef.size,
                        maxWidth: header.column.columnDef.size,
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </t.TableHead>
                  );
                })}
              </t.TableRow>
            ))}
          </t.TableHeader>
          <t.TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <t.TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group/row relative"
                >
                  {row.getVisibleCells().map((cell) => (
                    <t.TableCell
                      key={cell.id}
                      className="align-top"
                      // className="border"
                      // style={{
                      //   minWidth: cell.column.columnDef.size,
                      //   maxWidth: cell.column.columnDef.size,
                      // }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </t.TableCell>
                  ))}
                </t.TableRow>
              ))
            ) : (
              <t.TableRow>
                <t.TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  ไม่พบข้อมูล
                </t.TableCell>
              </t.TableRow>
            )}
          </t.TableBody>
        </t.Table>
      </div>
      {onAddNewClick ? (
        <AddNewDataButton onAddNewClick={onAddNewClick} />
      ) : null}
    </div>
  );
}

const AddNewDataButton = ({ onAddNewClick }: { onAddNewClick: () => void }) => {
  return (
    <div
      className="flex items-center justify-center rounded-md border-gray-200 py-4 hover:bg-muted/50"
      onClick={onAddNewClick}
    >
      <PlusCircle className="h-5 w-5 -translate-y-3 text-gray-500 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
    </div>
  );
};
