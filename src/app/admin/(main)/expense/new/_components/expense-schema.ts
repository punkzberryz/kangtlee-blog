import { z } from "zod";

type ExpenseCategory =
  | "Food"
  | "Grocery"
  | "Healthcare"
  | "Other"
  | "Entertainment"
  | "Utility"
  | "Transport"
  | "Education"
  | "Housing"
  | "Dada's Toys"
  | "Shopping";

export const expenseCategoryOptions: {
  value: ExpenseCategory;
  label: string;
}[] = [
  { value: "Food", label: "Food" },
  { value: "Transport", label: "Transport" },
  { value: "Shopping", label: "Shopping" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Grocery", label: "Grocery" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Dada's Toys", label: "Dada's Toys" },
  { value: "Housing", label: "Housing" },
  { value: "Utility", label: "Utility" },
  { value: "Other", label: "Other" },
];

const expenseCategorySchema = z.enum([
  expenseCategoryOptions[0].value,
  ...expenseCategoryOptions.slice(1).map((option) => option.value),
]);

export const expenseSchema = z.object({
  category: expenseCategorySchema,
  amount: z.string({ required_error: "Amount must be a number" }),
  description: z.string(),
});

export type ExpenseSchema = z.infer<typeof expenseSchema>;
