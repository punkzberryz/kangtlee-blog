"use client";

import { TableColumnHeader } from "@/components/table/table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { deleteTagAction } from "./tag-action";
import Link from "next/link";
import {
  ColumnDeleteButton,
  ColumnEditButton,
} from "@/components/table/column-edit-and-delete-buttons";
import { PostTag } from "@prisma/client";
export const tagColumnDef: ColumnDef<PostTag>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="id" column={column} />,
    accessorKey: "id",
    size: 20,
    cell: ({ row }) => (
      <Link href={`/admin/blog/tag/${row.original.id}`}>{row.original.id}</Link>
    ),
  },
  {
    accessorKey: "name",
    header: "ชื่อหมวดหมู่",
    cell: ({ row }) => (
      <Link href={`/admin/blog/tag/${row.original.id}`}>
        {row.original.name}
      </Link>
    ),
  },
  {
    header: "แก้ไข",
    accessorKey: "edit",
    cell: ({ row }) => (
      <ColumnEditButton href={`/admin/blog/tag/${row.original.id}`} />
    ),
    size: 40,
  },
  {
    header: "ลบ",
    accessorKey: "delete",
    cell: ({ row }) => (
      <ColumnDeleteButton
        name={row.original.name}
        deleteAction={() => deleteTagAction({ id: row.original.id })}
      />
    ),
    size: 40,
  },
];
