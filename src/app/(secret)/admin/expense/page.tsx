import { AlertTriangle } from "lucide-react";
import {
  fetchAvailableExpenseYears,
  fetchExpenseRowsByYear,
} from "@/lib/google-sheets";
import { validateRequestOnServerComponent } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ExpenseDashboard } from "./_components/expense-dashboard";

type ExpensePageProps = {
  searchParams?: Promise<{
    year?: string | string[];
  }>;
};

const getSelectedYear = async (
  searchParams?: ExpensePageProps["searchParams"]
) => {
  const params = await searchParams;
  const year = Array.isArray(params?.year) ? params?.year[0] : params?.year;

  return year ?? new Date().getFullYear().toString();
};

const ExpensePage = async ({ searchParams }: ExpensePageProps) => {
  const selectedYear = await getSelectedYear(searchParams);
  const { user } = await validateRequestOnServerComponent();
  if (!user) {
    redirect("/admin/signin");
  }

  let dashboardProps:
    | {
        rows: Awaited<ReturnType<typeof fetchExpenseRowsByYear>>["rows"];
        selectedYear: string;
        availableYears: string[];
        sheetUrl: string;
      }
    | null = null;
  let errorMessage = "";

  try {
    const [availableYears, expenseResult] = await Promise.all([
      fetchAvailableExpenseYears(),
      fetchExpenseRowsByYear({ year: selectedYear }),
    ]);
    const years = Array.from(
      new Set([expenseResult.year, ...availableYears])
    ).sort((a, b) => Number(b) - Number(a));

    dashboardProps = {
      rows: expenseResult.rows,
      selectedYear: expenseResult.year,
      availableYears: years,
      sheetUrl: expenseResult.sheetUrl,
    };
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load expense data from Google Sheets.";
  }

  if (dashboardProps) {
    return <ExpenseDashboard {...dashboardProps} />;
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[520px] w-full max-w-3xl flex-col items-center justify-center rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-full bg-red-50">
            <AlertTriangle className="size-5 text-red-600" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-950">
            Expense data unavailable
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            {errorMessage}
          </p>
        </div>
      </main>
    );
  }

  return null;
};

export default ExpensePage;

export const metadata = {
  title: "Expense Dashboard",
  description: "Personal expense dashboard from Google Sheets",
};

export const dynamic = "force-dynamic";
