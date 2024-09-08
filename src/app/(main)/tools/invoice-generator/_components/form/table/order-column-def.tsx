import { Button } from "@/components/ui/button";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NameCell } from "./name-cell";
import { DescriptionCell } from "./description-cell";
import { PriceCell } from "./price-cell";
import { QuantityCell } from "./quantity-cell";

export type OrderData = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
};
export const orderColumnDef: ColumnDef<OrderData>[] = [
  {
    header: () => <TableColumnHeader title="#" />,
    accessorKey: "id",
    cell: ({ row, table }) => {
      return (
        <div className="mt-2">
          <p className="text-base text-gray-500">{row.index + 1}</p>
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute left-2 top-2 h-fit w-fit p-1 opacity-0 transition-opacity ease-in-out group-hover/row:opacity-100"
            onClick={() => table.options.meta?.onDeleteRow(row.index)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    size: 40,
  },
  {
    header: () => <TableColumnHeader title="สินค้า" />,
    accessorKey: "name",
    cell: ({ row, column, table }) => (
      <NameCell row={row} column={column} table={table} />
    ),
  },
  {
    header: () => <TableColumnHeader title="รายละเอียด" />,
    accessorKey: "description",
    cell: ({ row, column, table }) => (
      <DescriptionCell row={row} column={column} table={table} />
    ),
  },
  {
    header: () => <TableColumnHeader title="ราคา" />,
    accessorKey: "price",
    cell: ({ row, column, table }) => (
      <PriceCell row={row} column={column} table={table} />
    ),
  },
  {
    header: () => <TableColumnHeader title="จำนวน" />,
    accessorKey: "quantity",
    cell: ({ row, column, table }) => (
      <QuantityCell row={row} column={column} table={table} />
    ),
  },
  {
    header: () => <TableColumnHeader title="รวม" />,
    accessorKey: "total",
    cell: ({ row, table }) => <TotalCell row={row} table={table} />,
  },
];

function TableColumnHeader({ title }: { title: string }) {
  return <div className="text-base">{title}</div>;
}

const TotalCell = ({
  row,
  table,
}: {
  row: Row<OrderData>;
  table: Table<OrderData>;
}) => {
  const [value, setValue] = useState(row.original.total);
  useEffect(() => {
    // When we delete one of the rows, setValue doesn't know about the new row.original.total
    // So we need to update the value when the row.original.total changes
    setValue(row.original.total);
  }, [row.original.total]);
  return <p className="min-w-[70px] text-lg">{value}</p>;
};
