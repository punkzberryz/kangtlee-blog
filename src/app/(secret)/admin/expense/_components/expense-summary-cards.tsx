import { CalendarDays, ChartNoAxesColumn, ReceiptText, Tags } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format/format-price";
import type { ExpenseDashboardData } from "../_lib/expense-aggregations";

type ExpenseSummaryCardsProps = {
  data: ExpenseDashboardData;
};

const formatCurrency = (value: number) =>
  formatPrice(value, {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });

export const ExpenseSummaryCards = ({ data }: ExpenseSummaryCardsProps) => {
  const cards = [
    {
      title: "Total spending",
      value: formatCurrency(data.totalSpend),
      description: `${data.totalTransactions.toLocaleString()} transactions`,
      icon: ChartNoAxesColumn,
    },
    {
      title: "Average transaction",
      value: formatCurrency(data.averageTransaction),
      description: `${data.monthsWithSpend} active months`,
      icon: ReceiptText,
    },
    {
      title: "Peak month",
      value: data.peakMonth ? data.peakMonth.month : "-",
      description: data.peakMonth
        ? formatCurrency(data.peakMonth.total)
        : "No spending yet",
      icon: CalendarDays,
    },
    {
      title: "Top category",
      value: data.topCategory ? data.topCategory.category : "-",
      description: data.topCategory
        ? formatCurrency(data.topCategory.total)
        : "No category yet",
      icon: Tags,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {card.title}
              </CardTitle>
              <Icon className="size-4 text-slate-400" />
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="truncate text-2xl font-semibold text-slate-950">
                {card.value}
              </div>
              <p className="mt-1 text-sm text-slate-500">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
