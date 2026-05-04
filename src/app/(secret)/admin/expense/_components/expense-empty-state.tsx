import { ReceiptText } from "lucide-react";

type ExpenseEmptyStateProps = {
  year: string;
};

export const ExpenseEmptyState = ({ year }: ExpenseEmptyStateProps) => {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-slate-100">
        <ReceiptText className="size-5 text-slate-500" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-950">
        No expenses found for {year}
      </h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        The dashboard is connected, but there are no valid expense rows to
        visualize for this year.
      </p>
    </div>
  );
};
