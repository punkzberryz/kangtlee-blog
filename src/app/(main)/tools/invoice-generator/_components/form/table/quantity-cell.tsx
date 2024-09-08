"use client";
import { Column, Row, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { OrderData } from "./order-column-def";

const QuantityCell = ({
  row,
  table,
  column,
}: {
  row: Row<OrderData>;
  table: Table<OrderData>;
  column: Column<OrderData, unknown>;
}) => {
  const [value, setValue] = useState(row.original.quantity.toString());
  useEffect(() => {
    // When we delete one of the rows, setValue doesn't know about the new row.original.quantity
    // So we need to update the value when the row.original.quantity changes
    setValue(row.original.quantity.toString());
  }, [row.original.quantity]);
  return (
    <Input
      value={value}
      onBlur={() => {
        let quantity = parseInt(value);
        if (isNaN(quantity)) {
          quantity = 0;
        }
        table.options.meta?.onUpdateData(row.index, column.id, quantity);
      }}
      onChange={(e) => setValue(e.target.value)}
      variant="naked"
      className="min-w-[70px] bg-blue-50 text-lg"
    />
  );
};

export { QuantityCell };
