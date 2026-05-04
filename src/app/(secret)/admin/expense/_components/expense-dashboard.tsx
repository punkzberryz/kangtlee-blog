import Link from "next/link";
import { ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/format/format-price";
import type { ExpenseRow } from "@/lib/google-sheets";
import { CategoryBreakdownSection } from "./category-breakdown-section";
import { ExpenseEmptyState } from "./expense-empty-state";
import { ExpenseSummaryCards } from "./expense-summary-cards";
import { MonthlySpendingChart } from "./monthly-spending-chart";
import { MonthlyTransactionsTable } from "./monthly-transactions-table";
import { YearSelector } from "./year-selector";
import { getExpenseDashboardData } from "../_lib/expense-aggregations";

type ExpenseDashboardProps = {
  rows: ExpenseRow[];
  selectedYear: string;
  availableYears: string[];
  sheetUrl: string;
};

const formatCurrency = (value: number) =>
  formatPrice(value, {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });

export const ExpenseDashboard = ({
  rows,
  selectedYear,
  availableYears,
  sheetUrl,
}: ExpenseDashboardProps) => {
  const dashboardData = getExpenseDashboardData(rows, selectedYear);
  const hasSpending = dashboardData.totalSpend > 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal-700">
              Personal expense dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Expense overview
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Visual spending summary from the Google Sheet tab for{" "}
              {selectedYear}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <YearSelector years={availableYears} selectedYear={selectedYear} />
            <Button
              asChild
              variant="outline"
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            >
              <a href={sheetUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 size-4" />
                Sheet
              </a>
            </Button>
            <Button asChild className="bg-slate-950 text-white hover:bg-slate-800">
              <Link href="/admin/expense/new">
                <Plus className="mr-2 size-4" />
                Add
              </Link>
            </Button>
          </div>
        </div>

        {hasSpending ? (
          <>
            <ExpenseSummaryCards data={dashboardData} />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.9fr)]">
              <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
                <CardHeader className="p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <CardTitle className="text-lg text-slate-950">
                        Monthly spending
                      </CardTitle>
                      <CardDescription className="mt-1 text-slate-500">
                        Twelve-month spending cadence for {selectedYear}.
                      </CardDescription>
                    </div>
                    <div className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
                      {formatCurrency(dashboardData.averageMonthlySpend)} avg
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <MonthlySpendingChart data={dashboardData.monthlyData} />
                </CardContent>
              </Card>

              <CategoryBreakdownSection
                rows={rows}
                selectedYear={selectedYear}
              />
            </div>

            <Card className="rounded-lg border border-slate-200 bg-white shadow-sm">
              <CardHeader className="p-5">
                <CardTitle className="text-lg text-slate-950">
                  Monthly transactions
                </CardTitle>
                <CardDescription className="mt-1 text-slate-500">
                  Select a month, search transactions, and filter by category.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <MonthlyTransactionsTable
                  rows={rows}
                  selectedYear={selectedYear}
                />
              </CardContent>
            </Card>
          </>
        ) : (
          <ExpenseEmptyState year={selectedYear} />
        )}
      </div>
    </main>
  );
};
