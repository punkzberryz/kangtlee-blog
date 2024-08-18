"use client";
import { ColumnEditButton } from "@/components/table/column-edit-and-delete-buttons";
import { TableColumnHeader } from "@/components/table/table-column-header";
import { Button } from "@/components/ui/button";
import { Post } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpRightFromSquare, LinkIcon, Pencil } from "lucide-react";
import Link from "next/link";

export const blogColumnDef: ColumnDef<Post>[] = [
  {
    header: ({ column }) => <TableColumnHeader title="id" column={column} />,
    accessorKey: "id",
    size: 20,
    cell: ({ row }) => (
      <Link href={`/admin/blog/${row.original.id}`}>{row.original.id}</Link>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <TableColumnHeader title="หัวข้อ" column={column} />
    ),
    cell: ({ row }) => row.original.title,
  },
  {
    header: "แก้ไข",
    accessorKey: "edit",
    cell: ({ row }) => (
      <ColumnEditButton href={`/admin/blog/${row.original.id}`} />
    ),
    size: 40,
  },
  {
    header: "ดูบทความ",
    accessorKey: "link",
    cell: ({ row }) => (
      <Button className="-my-2 h-8 rounded-md px-2" asChild variant="secondary">
        <Link
          href={`/blog/${row.original.slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ArrowUpRightFromSquare className="h-3 w-3" />
        </Link>
      </Button>
    ),
    size: 40,
  },
];
// ["autumn Instagram captions","autumn photo captions","cozy fall captions","fall captions","seasonal Instagram captions"]
