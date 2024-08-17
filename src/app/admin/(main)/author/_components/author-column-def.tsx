"use client";

import { TableColumnHeader } from "@/components/table/table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ColumnEditButton } from "@/components/table/column-edit-and-delete-buttons";
import { User } from "@prisma/client";
export const authorColumnDef: ColumnDef<User>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="id" column={column} />,
    accessorKey: "id",
    size: 20,
    cell: ({ row }) => (
      <Link href={`/admin/author/${row.original.id}`}>{row.original.id}</Link>
    ),
  },
  {
    accessorKey: "name",
    header: "Display Name",
    cell: ({ row }) => row.original.displayName,
  },
  {
    header: "แก้ไข",
    accessorKey: "edit",
    cell: ({ row }) => (
      <ColumnEditButton href={`/admin/author/${row.original.id}`} />
    ),
    size: 40,
  },
];
