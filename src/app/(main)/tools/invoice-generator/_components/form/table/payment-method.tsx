"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerWithoutIcon,
  SelectValue,
} from "@/components/ui/select";
import { bahttext } from "bahttext";
import { InvoiceFormSchema, paymentMethodOptions } from "../invoice-schema";

export const PaymentMethod = ({
  form,
}: {
  form: UseFormReturn<InvoiceFormSchema>;
}) => {
  const total = form.watch("orderSummary.total");

  return (
    <div className="flex flex-col justify-between">
      <FormField
        name="paymentMethod"
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2 space-y-0">
            <FormLabel className="text-lg font-normal">ชำระเงินโดย</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTriggerWithoutIcon className="w-[180px] border-none bg-blue-50 text-lg">
                  <SelectValue />
                </SelectTriggerWithoutIcon>
                <SelectContent>
                  {paymentMethodOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex items-center space-x-2 pb-2">
        <p className="text-base">(ตัวอักษร)</p>
        <p className="text-lg font-semibold">{bahttext(total)}</p>
      </div>
    </div>
  );
};
