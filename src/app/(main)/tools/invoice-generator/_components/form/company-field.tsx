"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { InvoiceFormSchema } from "./invoice-schema";

export const CompanyField = ({
  form,
}: {
  form: UseFormReturn<InvoiceFormSchema>;
}) => {
  return (
    <div className="flex w-[400px] flex-col rounded-md bg-blue-50">
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder="ชื่อบริษัท"
                {...field}
                variant="naked"
                className="text-2xl font-semibold"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="px-2">
        <Separator className="border border-gray-800" />
      </div>
      <div className="-space-y-2">
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ที่อยู่ (1)"
                  {...field}
                  variant="naked"
                  className="text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="ที่อยู่ (2)"
                  {...field}
                  variant="naked"
                  className="text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxId"
          render={({ field }) => (
            <FormItem className="relative space-y-0">
              <FormLabel className="absolute left-2.5 top-1.5 text-lg font-normal">
                เลขประจำตัวผู้เสียภาษีอากร
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="เลขประจำตัวผู้เสียภาษีอากร"
                  {...field}
                  variant="naked"
                  className="pl-56 text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="px-2">
        <Separator className="border border-gray-800" />
      </div>
    </div>
  );
};
