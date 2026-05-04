"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format/format-price";
import type { ExpenseRow } from "@/lib/google-sheets";
import { MONTH_LABELS } from "../_lib/expense-aggregations";

type MonthlyTransactionsTableProps = {
  rows: ExpenseRow[];
  selectedYear: string;
};

const getDefaultMonth = (selectedYear: string) => {
  const now = new Date();
  if (selectedYear === now.getFullYear().toString()) {
    return String(now.getMonth());
  }

  return "0";
};

const getRowMonthIndex = (row: ExpenseRow) => {
  const match = row.date.match(/^\d{4}-(\d{2})-\d{2}$/);
  if (!match) {
    return null;
  }

  return Number(match[1]) - 1;
};

const getRowYear = (row: ExpenseRow) => row.date.slice(0, 4);

const formatCurrency = (value: number) =>
  formatPrice(value, {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });

const globalExpenseFilter: FilterFn<ExpenseRow> = (row, columnId, value) => {
  const search = String(value ?? "")
    .trim()
    .toLowerCase();
  if (!search) {
    return true;
  }

  return String(row.getValue(columnId) ?? "")
    .toLowerCase()
    .includes(search);
};

export const MonthlyTransactionsTable = ({
  rows,
  selectedYear,
}: MonthlyTransactionsTableProps) => {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    getDefaultMonth(selectedYear),
  );
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const monthIndex = Number(selectedMonth);
  const monthlyRows = useMemo(
    () =>
      rows
        .filter(
          (row) =>
            getRowYear(row) === selectedYear &&
            getRowMonthIndex(row) === monthIndex,
        )
        .sort((a, b) => b.date.localeCompare(a.date) || b.amount - a.amount),
    [rows, selectedYear, monthIndex],
  );
  const monthlyTotal = monthlyRows.reduce((sum, row) => sum + row.amount, 0);

  const columns = useMemo<ColumnDef<ExpenseRow>[]>(
    () => [
      {
        accessorKey: "date",
        header: "Date",
        filterFn: "includesString",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "name",
        header: "Name",
        filterFn: "includesString",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "category",
        header: "Category",
        filterFn: "includesString",
        enableGlobalFilter: true,
      },
      {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        enableColumnFilter: false,
        enableGlobalFilter: false,
        cell: ({ getValue }) => (
          <div className="text-right font-medium text-slate-950">
            {formatCurrency(getValue<number>())}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        filterFn: "includesString",
        enableGlobalFilter: true,
        cell: ({ getValue }) => (
          <div className="min-w-[220px] text-slate-600">
            {getValue<string>() || "-"}
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: monthlyRows,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: globalExpenseFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  const filteredRowsCount = table.getFilteredRowModel().rows.length;

  return (
    <div className="min-w-0 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select
            value={selectedMonth}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="h-10 w-full border-slate-200 bg-white text-slate-950 sm:w-[150px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {MONTH_LABELS.map((month, index) => (
                <SelectItem key={month} value={String(index)}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Input
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="Search name, category, or description..."
          className="h-10 w-full border-slate-200 bg-white lg:max-w-sm"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <div>
          {filteredRowsCount.toLocaleString()} results in{" "}
          {MONTH_LABELS[monthIndex]} {selectedYear}
        </div>
        <div className="font-medium text-slate-700">
          Month total: {formatCurrency(monthlyTotal)}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table className="min-w-[780px]">
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-slate-500">
                    <div className="space-y-2">
                      <button
                        type="button"
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none text-left"
                            : "text-left"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        disabled={!header.column.getCanSort()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {{
                          asc: " ↑",
                          desc: " ↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                      {header.column.getCanFilter() ? (
                        <ColumnFilter column={header.column} />
                      ) : null}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-slate-700">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-500"
                >
                  No transactions found for this month.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ColumnFilter = ({ column }: { column: Column<ExpenseRow, unknown> }) => {
  const filterValue = (column.getFilterValue() ?? "") as string;

  return (
    <Input
      value={filterValue}
      onChange={(event) => column.setFilterValue(event.target.value)}
      placeholder="Filter..."
      className="h-8 min-w-[120px] border-slate-200 bg-white text-xs font-normal text-slate-700"
    />
  );
};
