"use client";

import { Cell, Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { formatPrice } from "@/lib/format/format-price";
import type { CategoryExpenseDatum } from "../_lib/expense-aggregations";

type CategoryBreakdownChartProps = {
  data: CategoryExpenseDatum[];
};

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

const formatCurrency = (value: number) =>
  formatPrice(value, {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  });

const chartColors = [
  "#0f766e",
  "#2563eb",
  "#f59e0b",
  "#e11d48",
  "#7c3aed",
  "#16a34a",
  "#ea580c",
  "#0891b2",
  "#4f46e5",
  "#be123c",
  "#475569",
];

export const CategoryBreakdownChart = ({ data }: CategoryBreakdownChartProps) => {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_13rem]">
      <ChartContainer
        config={{
          total: {
            label: "Spending",
            color: "#0f766e",
          },
        }}
        className="h-[320px] w-full"
      >
        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <ChartTooltip
            content={({ active, payload }) => {
              const entry = payload?.[0]?.payload as
                | CategoryExpenseDatum
                | undefined;

              if (!active || !entry) {
                return null;
              }

              return (
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 shadow-sm">
                  <p className="font-medium text-slate-950">{entry.category}</p>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <span>Spending</span>
                      <span className="font-medium text-slate-950">
                        {formatCurrency(entry.total)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Transactions</span>
                      <span className="font-medium text-slate-950">
                        {entry.count}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Share</span>
                      <span className="font-medium text-slate-950">
                        {percentFormatter.format(entry.share)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            innerRadius="58%"
            outerRadius="86%"
            paddingAngle={2}
            stroke="#ffffff"
            strokeWidth={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.category}
                fill={chartColors[index % chartColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
        {data.map((entry, index) => (
          <div
            key={entry.category}
            className="flex items-start justify-between gap-3 rounded-md bg-white p-2 shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: chartColors[index % chartColors.length],
                }}
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-950">
                  {entry.category}
                </p>
                <p className="text-xs text-slate-500">
                  {percentFormatter.format(entry.share)}
                </p>
              </div>
            </div>
            <div className="shrink-0 text-right text-xs font-medium text-slate-700">
              {formatCurrency(entry.total)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
