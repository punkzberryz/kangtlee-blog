"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatPrice } from "@/lib/format/format-price";
import type { MonthlyExpenseDatum } from "../_lib/expense-aggregations";

type MonthlySpendingChartProps = {
  data: MonthlyExpenseDatum[];
};

const formatCompactCurrency = (value: number) =>
  formatPrice(value, {
    style: "currency",
    currency: "THB",
    notation: "compact",
    maximumFractionDigits: 1,
  });

const formatCurrency = (value: number) =>
  formatPrice(value, {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });

export const MonthlySpendingChart = ({ data }: MonthlySpendingChartProps) => {
  return (
    <ChartContainer
      config={{
        total: {
          label: "Spending",
          color: "#0f766e",
        },
      }}
      className="h-[320px] w-full"
    >
      <BarChart data={data} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="monthly-expense-bars" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="rgba(148, 163, 184, 0.3)"
          strokeDasharray="4 4"
        />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          className="text-xs text-slate-500"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(value) => formatCompactCurrency(Number(value))}
          className="text-xs text-slate-500"
        />
        <ChartTooltip
          cursor={{ fill: "rgba(15, 23, 42, 0.06)" }}
          content={
            <ChartTooltipContent
              formatter={(value) => formatCurrency(Number(value))}
            />
          }
        />
        <Bar
          dataKey="total"
          name="Spending"
          fill="url(#monthly-expense-bars)"
          radius={[10, 10, 4, 4]}
        />
      </BarChart>
    </ChartContainer>
  );
};
