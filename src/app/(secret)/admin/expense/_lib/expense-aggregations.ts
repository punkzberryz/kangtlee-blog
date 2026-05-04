import { endOfWeek, format, isMatch, isValid, parseISO, startOfWeek } from "date-fns";
import type { ExpenseRow } from "@/lib/google-sheets";

export const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type MonthlyExpenseDatum = {
  month: string;
  monthIndex: number;
  total: number;
  count: number;
  average: number;
  share: number;
};

export type CategoryExpenseDatum = {
  category: string;
  total: number;
  count: number;
  average: number;
  share: number;
};

export type ExpenseDashboardData = {
  monthlyData: MonthlyExpenseDatum[];
  categoryData: CategoryExpenseDatum[];
  totalSpend: number;
  totalTransactions: number;
  monthsWithSpend: number;
  categoriesWithSpend: number;
  averageMonthlySpend: number;
  averageTransaction: number;
  peakMonth: MonthlyExpenseDatum | null;
  topCategory: CategoryExpenseDatum | null;
};

export type CategoryBreakdownData = {
  categoryData: CategoryExpenseDatum[];
  totalSpend: number;
  totalTransactions: number;
  categoriesWithSpend: number;
  topCategory: CategoryExpenseDatum | null;
  averageTransaction: number;
};

export type CategoryItemDatum = {
  date: string;
  name: string;
  amount: number;
  description: string;
};

export type CategoryItemHighlightLevel = "normal" | "high" | "very-high";

export type HighlightedCategoryItemDatum = GroupedCategoryItemDatum & {
  highlightLevel: CategoryItemHighlightLevel;
};

export type CategoryItemGrouping = "day" | "week" | "month";

export type GroupedCategoryItemDatum = {
  bucketKey: string;
  label: string;
  date: string;
  amount: number;
  count: number;
  name: string;
  description: string;
  items: CategoryItemDatum[];
};

const parseYearMonth = (value: string) => {
  if (!isMatch(value, "yyyy-MM-dd")) {
    return null;
  }

  const parsed = parseISO(value);
  if (!isValid(parsed)) {
    return null;
  }

  return {
    year: String(parsed.getFullYear()),
    monthIndex: parsed.getMonth(),
  };
};

const roundMoney = (value: number) => Number(value.toFixed(2));

const matchesCategoryScope = (
  row: ExpenseRow,
  year: string,
  monthIndex?: number | null
) => {
  const parsed = parseYearMonth(row.date);
  if (!parsed || parsed.year !== year) {
    return false;
  }

  if (typeof monthIndex === "number" && parsed.monthIndex !== monthIndex) {
    return false;
  }

  return true;
};

export const getCategoryBreakdownData = (
  rows: ExpenseRow[],
  year: string,
  monthIndex?: number | null
): CategoryBreakdownData => {
  const categoryTotals = new Map<string, { total: number; count: number }>();

  for (const row of rows) {
    if (!matchesCategoryScope(row, year, monthIndex)) {
      continue;
    }

    const categoryTotal = categoryTotals.get(row.category);
    if (categoryTotal) {
      categoryTotal.total += row.amount;
      categoryTotal.count += 1;
      continue;
    }

    categoryTotals.set(row.category, {
      total: row.amount,
      count: 1,
    });
  }

  const totalSpend = Array.from(categoryTotals.values()).reduce(
    (sum, value) => sum + value.total,
    0
  );
  const totalTransactions = Array.from(categoryTotals.values()).reduce(
    (sum, value) => sum + value.count,
    0
  );
  const categoryData: CategoryExpenseDatum[] = Array.from(
    categoryTotals.entries()
  )
    .map(([category, value]) => ({
      category,
      total: roundMoney(value.total),
      count: value.count,
      average: roundMoney(value.count ? value.total / value.count : 0),
      share: totalSpend ? value.total / totalSpend : 0,
    }))
    .sort((a, b) => b.total - a.total);

  return {
    categoryData,
    totalSpend: roundMoney(totalSpend),
    totalTransactions,
    categoriesWithSpend: categoryData.length,
    topCategory: categoryData[0] ?? null,
    averageTransaction: roundMoney(
      totalTransactions ? totalSpend / totalTransactions : 0
    ),
  };
};

export const getCategoryItemBreakdownData = (
  rows: ExpenseRow[],
  year: string,
  category: string,
  monthIndex?: number | null
): CategoryItemDatum[] => {
  return rows
    .filter(
      (row) =>
        row.category === category && matchesCategoryScope(row, year, monthIndex)
    )
    .map((row) => ({
      date: row.date,
      name: row.name,
      amount: roundMoney(row.amount),
      description: row.description,
    }))
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) ||
        b.amount - a.amount ||
        a.name.localeCompare(b.name)
    );
};

const getQuantile = (sortedValues: number[], quantile: number) => {
  if (sortedValues.length === 0) {
    return 0;
  }

  if (sortedValues.length === 1) {
    return sortedValues[0] ?? 0;
  }

  const index = (sortedValues.length - 1) * quantile;
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);
  const lowerValue = sortedValues[lowerIndex] ?? 0;
  const upperValue = sortedValues[upperIndex] ?? lowerValue;

  if (lowerIndex === upperIndex) {
    return lowerValue;
  }

  return lowerValue + (upperValue - lowerValue) * (index - lowerIndex);
};

export const getHighlightedCategoryItemData = (
  itemData: GroupedCategoryItemDatum[]
): HighlightedCategoryItemDatum[] => {
  if (itemData.length === 0) {
    return [];
  }

  const sortedAmounts = itemData
    .map((item) => item.amount)
    .sort((a, b) => a - b);
  const median = getQuantile(sortedAmounts, 0.5);
  const highestAmount = sortedAmounts[sortedAmounts.length - 1] ?? 0;

  if (itemData.length < 6) {
    const shouldHighlightLargest = highestAmount >= median * 1.75;

    return itemData.map((item) => ({
      ...item,
      highlightLevel:
        shouldHighlightLargest && item.amount === highestAmount
          ? "very-high"
          : "normal",
    }));
  }

  const highThreshold = Math.max(
    getQuantile(sortedAmounts, 0.75),
    median * 1.3
  );
  const veryHighThreshold = Math.max(
    getQuantile(sortedAmounts, 0.9),
    median * 1.75
  );

  return itemData.map((item) => ({
    ...item,
    highlightLevel:
      item.amount >= veryHighThreshold
        ? "very-high"
        : item.amount >= highThreshold
          ? "high"
          : "normal",
  }));
};

export const getGroupedCategoryItemData = (
  itemData: CategoryItemDatum[],
  grouping: CategoryItemGrouping
): GroupedCategoryItemDatum[] => {
  if (grouping === "day") {
    const dailyGroups = new Map<string, CategoryItemDatum[]>();

    for (const item of itemData) {
      const existing = dailyGroups.get(item.date);
      if (existing) {
        existing.push(item);
      } else {
        dailyGroups.set(item.date, [item]);
      }
    }

    return Array.from(dailyGroups.entries())
      .map(([date, items]) => buildGroupedCategoryItem(date, date, items, grouping))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  const groupedItems = new Map<string, CategoryItemDatum[]>();

  for (const item of itemData) {
    const parsedDate = parseISO(item.date);
    if (!isValid(parsedDate)) {
      continue;
    }

    if (grouping === "week") {
      const weekStart = startOfWeek(parsedDate, { weekStartsOn: 1 });
      const weekKey = format(weekStart, "yyyy-MM-dd");
      const existing = groupedItems.get(weekKey);
      if (existing) {
        existing.push(item);
      } else {
        groupedItems.set(weekKey, [item]);
      }
      continue;
    }

    const monthKey = format(parsedDate, "yyyy-MM");
    const existing = groupedItems.get(monthKey);
    if (existing) {
      existing.push(item);
    } else {
      groupedItems.set(monthKey, [item]);
    }
  }

  return Array.from(groupedItems.entries())
    .map(([bucketKey, items]) =>
      buildGroupedCategoryItem(
        bucketKey,
        grouping === "month" ? `${bucketKey}-01` : bucketKey,
        items,
        grouping
      )
    )
    .sort((a, b) => a.date.localeCompare(b.date));
};

const buildGroupedCategoryItem = (
  bucketKey: string,
  date: string,
  items: CategoryItemDatum[],
  grouping: CategoryItemGrouping
): GroupedCategoryItemDatum => {
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const largestItem = items.reduce<CategoryItemDatum | null>((largest, item) => {
    if (!largest || item.amount > largest.amount) {
      return item;
    }

    return largest;
  }, null);

  return {
    bucketKey,
    label: getGroupedCategoryLabel(bucketKey, grouping),
    date,
    amount: roundMoney(totalAmount),
    count: items.length,
    name:
      items.length === 1
        ? (items[0]?.name ?? "")
        : `${items.length} purchases in ${getGroupingNoun(grouping)}`,
    description:
      items.length === 1
        ? (items[0]?.description ?? "")
        : largestItem
          ? `Largest purchase: ${largestItem.name}`
          : "",
    items,
  };
};

const getGroupedCategoryLabel = (
  bucketKey: string,
  grouping: CategoryItemGrouping
) => {
  if (grouping === "day") {
    return bucketKey;
  }

  if (grouping === "week") {
    const parsedDate = parseISO(bucketKey);
    if (!isValid(parsedDate)) {
      return bucketKey;
    }

    const weekEnd = endOfWeek(parsedDate, { weekStartsOn: 1 });
    return `${format(parsedDate, "MMM d")} - ${format(weekEnd, "MMM d")}`;
  }

  const parsedMonth = parseISO(`${bucketKey}-01`);
  if (!isValid(parsedMonth)) {
    return bucketKey;
  }

  return format(parsedMonth, "MMM yyyy");
};

const getGroupingNoun = (grouping: CategoryItemGrouping) => {
  switch (grouping) {
    case "week":
      return "week";
    case "month":
      return "month";
    default:
      return "day";
  }
};

export const getDefaultCategorySelection = (
  categoryData: CategoryExpenseDatum[]
) => {
  return (
    categoryData.find((entry) => entry.category === "Food")?.category ??
    categoryData[0]?.category ??
    null
  );
};

export const getExpenseDashboardData = (
  rows: ExpenseRow[],
  year: string
): ExpenseDashboardData => {
  const monthlyTotals = Array.from({ length: 12 }, () => 0);
  const monthlyCounts = Array.from({ length: 12 }, () => 0);

  for (const row of rows) {
    const parsed = parseYearMonth(row.date);
    if (!parsed || parsed.year !== year) {
      continue;
    }

    monthlyTotals[parsed.monthIndex] += row.amount;
    monthlyCounts[parsed.monthIndex] += 1;
  }

  const totalSpend = monthlyTotals.reduce((sum, value) => sum + value, 0);
  const totalTransactions = monthlyCounts.reduce(
    (sum, value) => sum + value,
    0
  );
  const monthsWithSpend = monthlyTotals.filter((value) => value > 0).length;
  const averageMonthlySpend = monthsWithSpend
    ? totalSpend / monthsWithSpend
    : 0;
  const averageTransaction = totalTransactions
    ? totalSpend / totalTransactions
    : 0;

  const monthlyData: MonthlyExpenseDatum[] = monthlyTotals.map(
    (total, monthIndex) => {
      const count = monthlyCounts[monthIndex];
      const average = count ? total / count : 0;

      return {
        month: MONTH_LABELS[monthIndex],
        monthIndex,
        total: roundMoney(total),
        count,
        average: roundMoney(average),
        share: totalSpend ? total / totalSpend : 0,
      };
    }
  );

  const activeMonths = monthlyData.filter((month) => month.total > 0);
  const peakMonth = activeMonths.length
    ? activeMonths.reduce((highest, month) =>
        month.total > highest.total ? month : highest
      )
    : null;
  const categoryBreakdownData = getCategoryBreakdownData(rows, year);

  return {
    monthlyData,
    categoryData: categoryBreakdownData.categoryData,
    totalSpend: roundMoney(totalSpend),
    totalTransactions,
    monthsWithSpend,
    categoriesWithSpend: categoryBreakdownData.categoriesWithSpend,
    averageMonthlySpend: roundMoney(averageMonthlySpend),
    averageTransaction: roundMoney(averageTransaction),
    peakMonth,
    topCategory: categoryBreakdownData.topCategory,
  };
};
