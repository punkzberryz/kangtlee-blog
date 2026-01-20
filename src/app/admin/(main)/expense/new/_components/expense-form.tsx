"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CustomInputField } from "@/components/custom-form-fields";
import { CustomSelectField } from "@/components/custom-form-fields/custom-select-field";
import { CustomTextAreaField } from "@/components/custom-form-fields/custom-textarea-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingBars } from "@/components/ui/loading-bars";
import { addNewExpenseAction } from "./expense-action";
import {
  ExpenseSchema,
  expenseCategoryOptions,
  expenseSchema,
} from "./expense-schema";

export const ExpenseForm = () => {
  const [loading, setLoading] = useState(false);
  const [successLink, setSuccessLink] = useState<string | null>(null);
  const form = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      category: "Food",
      description: "",
    },
  });

  const onSubmit = async (data: ExpenseSchema) => {
    const amount = parseFloat(data.amount);
    if (Number.isNaN(amount)) {
      toast.error("Amount must be a number");
      return;
    }

    setLoading(true);
    setSuccessLink(null);
    const { error, data: responseData } = await addNewExpenseAction(data);
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (responseData) {
      const { spreadsheetId, sheetId } = responseData;
      setSuccessLink(
        `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=${sheetId}`
      );
    }

    toast.success("Transaction Added!!");
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onSubmitError)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <CustomSelectField
            control={form.control}
            name="category"
            label="Category"
            options={expenseCategoryOptions.map((cat) => ({
              label: cat.label,
              value: cat.value,
            }))}
          />
          <CustomTextAreaField
            control={form.control}
            label="Description"
            name="description"
          />
          <CustomInputField
            type="number"
            control={form.control}
            name="amount"
            label="Amount"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row-reverse">
          <Button type="submit" className="min-w-[150px]" disabled={loading}>
            {loading ? <LoadingBars /> : "Submit"}
          </Button>
          <Button
            className="min-w-[150px]"
            variant="secondary"
            onClick={() => form.reset()}
            disabled={loading}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
      {successLink && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-900 dark:bg-green-900/20">
          <p className="mb-2 text-sm text-green-800 dark:text-green-200">
            Form submitted successfully!
          </p>
          <a
            href={successLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-green-600 hover:underline dark:text-green-400"
          >
            Open in Google Sheets ↗
          </a>
        </div>
      )}
    </Form>
  );
};

const onSubmitError = (_err: FieldErrors<ExpenseSchema>) => {
  toast.error("Please fill the form");
};
