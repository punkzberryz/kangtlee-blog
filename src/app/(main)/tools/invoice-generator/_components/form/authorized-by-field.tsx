"use client";

import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { InvoiceFormSchema } from "./invoice-schema";
import { SignatureField } from "./signature-field";

export const AuthorizedByField = ({
  form,
}: {
  form: UseFormReturn<InvoiceFormSchema>;
}) => {
  const [name, setName] = useState(
    "(" + form.getValues("authorizedBy.name") + ")",
  );
  return (
    <div className="ml-auto flex w-fit flex-col items-center space-y-4">
      <p className="text-lg">ขอแสดงความนับถือ</p>
      <SignatureField form={form} />
      <FormField
        name="authorizedBy.name"
        control={form.control}
        render={({ field }) => (
          <Input
            variant="naked"
            {...field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={(e) => {
              let value = e.target.value.replace(/\(/g, "");
              value = value.replace(/\)/g, "");
              setName(`(${value})`);
              field.onChange(value);
            }}
            className="bg-blue-50 text-center text-lg"
          />
        )}
      />
      <p className="text-lg">เจ้าหน้าที่ผู้มีอำนาจลงนาม</p>
    </div>
  );
};
