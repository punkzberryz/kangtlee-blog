"use client";

import { UseFormReturn } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerWithoutIcon,
} from "@/components/ui/select";
import { InvoiceFormSchema } from "./invoice-schema";
import { formatPrice } from "@/lib/format/format-price";

export const OrderSummaryField = ({
  form,
}: {
  form: UseFormReturn<InvoiceFormSchema>;
}) => {
  const [orderSummary, orderItems] = form.watch(["orderSummary", "orderItems"]);
  const [taxOption, setTaxOption] = useState(TaxOption.deductBy3);
  const [preSubTotal, setPreSubTotal] = useState(0);

  useEffect(() => {
    /*
      We need to update subtotal value every time orderItems change
      then we can pass subtotal value to calculateOrderSummary function
    */
    const subtotal = orderItems.reduce((acc, item) => acc + item.total, 0);
    setPreSubTotal(subtotal);
  }, [orderItems]);

  useEffect(() => {
    /*
      Note that we explicitly create preSubTotal state to store subtotal value
      because if we use orderItems array instead, useEffect will not know if
      "orderItems" are changed or not, it will always be executed every time

      but if we use preSubTotal state, useEffect will only be executed when
      preSubTotal value is changed
     */
    const { subTotal, tax, total } = calculateOrderSummary(
      preSubTotal,
      orderSummary.discount,
      taxOption,
    );
    form.setValue("orderSummary.subTotal", subTotal);
    form.setValue("orderSummary.tax", tax);
    form.setValue("orderSummary.total", total);
  }, [preSubTotal, orderSummary.discount, taxOption, form]);

  return (
    <div className="w-fit">
      <div className="grid grid-cols-2 items-center space-x-4 text-lg">
        <p>รวมจำนวนเงิน</p>
        <p className="px-3 py-2 text-lg">
          {formatPrice(orderSummary.subTotal)} บาท
        </p>
      </div>
      <FormField
        control={form.control}
        name="orderSummary.discount"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-2 items-center space-x-4 text-lg">
              <FormLabel className="text-lg font-normal">ส่วนลด</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="0"
                  variant="naked"
                  className="w-[180px] bg-blue-50 text-lg"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="orderSummary.tax"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-cols-2 items-center space-x-4 text-lg">
              <FormLabel className="text-lg font-normal">
                ภาษีหัก ณ ที่จ่าย
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(val) => {
                    setTaxOption(val as TaxOption);
                  }}
                >
                  <SelectTriggerWithoutIcon className="w-[180px] border-none bg-blue-50 text-lg">
                    {orderSummary.tax}
                  </SelectTriggerWithoutIcon>
                  <SelectContent>
                    <SelectItem value={TaxOption.none}>-</SelectItem>
                    <SelectItem value={TaxOption.deductBy3}>หัก 3%</SelectItem>
                    <SelectItem value={TaxOption.increaseBy3}>
                      เพิ่ม 3%
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 items-center space-x-4 text-lg">
        <p>ยอดรวมทั้งสิ้น</p>
        <p className="px-3 py-2 text-lg">
          {formatPrice(orderSummary.total)} บาท
        </p>
      </div>
    </div>
  );
};

enum TaxOption {
  none = "none",
  deductBy3 = "deductBy3",
  increaseBy3 = "increaseBy3",
}

function calculateOrderSummary(
  preSubTotal: number,
  discount: number,
  taxOption: TaxOption,
) {
  switch (taxOption) {
    case TaxOption.deductBy3: {
      const total = preSubTotal - discount;
      const tax = Math.ceil(preSubTotal * (1 - 0.97) * 0.97 * 100) / 100;
      const finalSubTotal = preSubTotal - tax;
      return {
        subTotal: finalSubTotal,
        tax,
        total,
      };
    }
    case TaxOption.increaseBy3: {
      const total = preSubTotal - discount;
      const tax = Math.ceil(preSubTotal * 0.03 * 100) / 100;
      const finalTotal = total + tax;
      return {
        subTotal: preSubTotal,
        tax,
        total: finalTotal,
      };
    }
    default:
      // TaxOption.none
      return {
        subTotal: preSubTotal,
        tax: 0,
        total: preSubTotal,
      };
  }
}
