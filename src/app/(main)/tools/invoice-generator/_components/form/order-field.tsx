"use client";

import { UseFormReturn } from "react-hook-form";
import { InvoiceFormSchema } from "./invoice-schema";
import { DataTable } from "@/components/table/data-table";
import { orderColumnDef } from "./table/order-column-def";

export const dummyOrderItem = {
  id: 1,
  name: "สินค้าที่ A",
  description: "",
  price: 100,
  quantity: 1,
  total: 100,
};

export const OrderField = ({
  form,
}: {
  form: UseFormReturn<InvoiceFormSchema>;
}) => {
  const orderItems = form.watch("orderItems");
  return (
    <div>
      <DataTable
        data={orderItems}
        columns={orderColumnDef}
        onAddNewClick={() => {
          form.setValue("orderItems", [
            ...orderItems,
            {
              id: orderItems.length + 1,
              name: "",
              description: "",
              price: 100,
              quantity: 1,
              total: 100,
            },
          ]);
          const totalPrice = calculateSubTotal(orderItems) + 100;
          form.setValue("orderSummary.subTotal", totalPrice);
        }}
        onDeleteRow={(rowIndex) => {
          const updatedData = orderItems.filter(
            (_, index) => index !== rowIndex,
          );
          form.setValue("orderItems", updatedData);
          const totalPrice = calculateSubTotal(updatedData);
          form.setValue("orderSummary.subTotal", totalPrice);
        }}
        onUpdateData={(rowIndex, columnId, value) => {
          const updatedData = orderItems.map((item, index) => {
            if (index === rowIndex) {
              if (columnId === "quantity") {
                const quantity = value as number;
                return {
                  ...item,
                  [columnId]: quantity,
                  total: item.price * quantity,
                };
              }
              if (columnId === "price") {
                const price = value as number;
                return {
                  ...item,
                  [columnId]: price,
                  total: item.quantity * price,
                };
              }
              return {
                ...item,
                [columnId]: value,
              };
            }
            return item;
          });

          form.setValue("orderItems", updatedData);
          const totalPrice = calculateSubTotal(updatedData);
          form.setValue("orderSummary.subTotal", totalPrice);
        }}
      />
    </div>
  );
};

const calculateSubTotal = (
  orderItems: {
    total: number;
    quantity: number;
    price: number;
  }[],
) => {
  return orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
};
