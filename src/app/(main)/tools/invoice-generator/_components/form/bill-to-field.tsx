"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InvoiceFormSchema } from "./invoice-schema";

export const BillToField = ({
  form,
}: {
  form: UseFormReturn<InvoiceFormSchema>;
}) => {
  return (
    <div className="flex w-[450px] flex-col -space-y-2 rounded-md bg-blue-50">
      <FormField
        control={form.control}
        name="billTo.name"
        render={({ field }) => (
          <FormItem className="relative space-y-0">
            <FormLabel className="absolute left-2.5 top-1.5 text-lg font-normal">
              ถึง
            </FormLabel>
            <FormControl>
              <Input
                placeholder="ชื่อบริษัท / ชื่อลูกค้า"
                {...field}
                variant="naked"
                className="pl-10 text-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="billTo.addressLine1"
        render={({ field }) => (
          <FormItem className="relative space-y-0">
            <FormControl>
              <Input
                placeholder="ที่อยู่ (บรรทัดที่ 1)"
                {...field}
                variant="naked"
                className="pl-10 text-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="billTo.addressLine2"
        render={({ field }) => (
          <FormItem className="relative space-y-0">
            <FormControl>
              <Input
                placeholder="ที่อยู่ (บรรทัดที่ 2)"
                {...field}
                variant="naked"
                className="pl-10 text-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="billTo.taxId"
        render={({ field }) => (
          <FormItem className="relative space-y-0">
            <FormLabel className="absolute left-2.5 top-1.5 ml-8 text-lg font-normal">
              เลขประจำตัวผู้เสียภาษีอากร
            </FormLabel>
            <FormControl>
              <Input
                placeholder="เลขประจำตัวผู้เสียภาษีอากร"
                {...field}
                variant="naked"
                className="pl-64 text-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
