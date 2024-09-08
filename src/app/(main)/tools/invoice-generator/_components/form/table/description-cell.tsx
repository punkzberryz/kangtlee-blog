"use client";
import { Column, Row, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { OrderData } from "./order-column-def";

const DescriptionCell = ({
  row,
  table,
  column,
}: {
  row: Row<OrderData>;
  column: Column<OrderData, unknown>;
  table: Table<OrderData>;
}) => {
  const [value, setValue] = useState(row.original.description);
  useEffect(() => {
    // When we delete one of the rows, setValue doesn't know about the new row.original.description
    // So we need to update the value when the row.original.description changes
    setValue(row.original.description);
  }, [row.original.description]);
  return (
    <Input
      value={value}
      onBlur={() =>
        table.options.meta?.onUpdateData(row.index, column.id, value)
      }
      onChange={(e) => setValue(e.target.value)}
      variant="naked"
      className="w-[200px] bg-blue-50 text-lg"
    />
  );
};

export { DescriptionCell };
