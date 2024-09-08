"use client";
import { Column, Row, Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { OrderData } from "./order-column-def";
import { formatPrice } from "@/lib/format/format-price";

const PriceCell = ({
  row,
  table,
  column,
}: {
  row: Row<OrderData>;
  table: Table<OrderData>;
  column: Column<OrderData, unknown>;
}) => {
  const [value, setValue] = useState(formatPrice(row.original.price, {}));
  useEffect(() => {
    // When we delete one of the rows, setValue doesn't know about the new row.original.price
    // So we need to update the value when the row.original.price changes
    setValue(row.original.price.toString());
  }, [row.original.price]);
  return (
    <Input
      value={value}
      onBlur={() => {
        let price = parseFloat(value);
        if (isNaN(price)) {
          price = 0;
        }
        table.options.meta?.onUpdateData(row.index, column.id, price);
      }}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      variant="naked"
      className="w-[200px] bg-blue-50 text-lg"
    />
  );
};

export { PriceCell };
