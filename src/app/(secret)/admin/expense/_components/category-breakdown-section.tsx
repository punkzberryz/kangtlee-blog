"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ExpenseRow } from "@/lib/google-sheets";
import { CategoryBreakdownChart } from "./category-breakdown-chart";
import { CategoryDetailsTable } from "./category-details-table";
import { CategoryPurchaseTimeline } from "./category-purchase-timeline";
import {
  getCategoryBreakdownData,
  getCategoryItemBreakdownData,
  getDefaultCategorySelection,
  MONTH_LABELS,
} from "../_lib/expense-aggregations";

type CategoryBreakdownSectionProps = {
  rows: ExpenseRow[];
  selectedYear: string;
};

const ALL_YEAR_VALUE = "all";

export const CategoryBreakdownSection = ({
  rows,
  selectedYear,
}: CategoryBreakdownSectionProps) => {
  const [selectedMonth, setSelectedMonth] = useState(ALL_YEAR_VALUE);
  const monthIndex =
    selectedMonth === ALL_YEAR_VALUE ? null : Number(selectedMonth);
  const categoryBreakdownData = useMemo(
    () => getCategoryBreakdownData(rows, selectedYear, monthIndex),
    [rows, selectedYear, monthIndex],
  );
  const [selectedCategoryPreference, setSelectedCategoryPreference] = useState<
    string | null
  >(null);
  const scopeLabel =
    monthIndex === null
      ? selectedYear
      : `${MONTH_LABELS[monthIndex]} ${selectedYear}`;
  const selectedCategory = useMemo(() => {
    if (
      selectedCategoryPreference &&
      categoryBreakdownData.categoryData.some(
        (entry) => entry.category === selectedCategoryPreference,
      )
    ) {
      return selectedCategoryPreference;
    }

    return getDefaultCategorySelection(categoryBreakdownData.categoryData);
  }, [categoryBreakdownData.categoryData, selectedCategoryPreference]);
  const selectedCategoryData = useMemo(
    () =>
      categoryBreakdownData.categoryData.find(
        (entry) => entry.category === selectedCategory,
      ) ?? null,
    [categoryBreakdownData.categoryData, selectedCategory],
  );
  const selectedCategoryItems = useMemo(
    () =>
      selectedCategory
        ? getCategoryItemBreakdownData(
            rows,
            selectedYear,
            selectedCategory,
            monthIndex,
          )
        : [],
    [rows, selectedYear, selectedCategory, monthIndex],
  );

  return (
    <Card className="min-w-0 rounded-lg border border-slate-200 bg-white shadow-sm">
      <CardHeader className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-lg text-slate-950">
              Category breakdown
            </CardTitle>
            <CardDescription className="mt-1 text-slate-500">
              Categories sorted by total spending for {scopeLabel}.
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="h-9 w-[148px] border-slate-200 bg-white text-slate-950">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_YEAR_VALUE}>Whole year</SelectItem>
                {MONTH_LABELS.map((month, index) => (
                  <SelectItem key={month} value={String(index)}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              {categoryBreakdownData.categoriesWithSpend} categories
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-w-0 p-5 pt-0">
        {categoryBreakdownData.categoryData.length > 0 ? (
          <div className="space-y-6">
            <CategoryBreakdownChart data={categoryBreakdownData.categoryData} />
            <div className="grid min-w-0 gap-6 2xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <CategoryDetailsTable
                categoryData={categoryBreakdownData.categoryData}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategoryPreference}
              />
              {selectedCategoryData ? (
                <CategoryPurchaseTimeline
                  category={selectedCategoryData}
                  itemData={selectedCategoryItems}
                />
              ) : (
                <div className="rounded-lg border border-dashed border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
                  Select a category to load its purchase timeline.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex h-[360px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-6 text-center text-sm text-slate-500">
            No category spending found for {scopeLabel}.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
