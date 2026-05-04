"use client";

import * as React from "react";
import { Legend, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = {
  [key: string]: {
    label?: string;
    color?: string;
  };
};

type ChartContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  config: ChartConfig;
};

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const reactId = React.useId().replace(/:/g, "");
    const chartId = id ?? `chart-${reactId}`;
    const style = Object.entries(config).reduce<
      React.CSSProperties & Record<string, string>
    >(
      (acc, [key, item]) => {
        if (item.color) {
          acc[`--color-${key}`] = item.color;
        }

        return acc;
      },
      {}
    );

    return (
      <div
        ref={ref}
        data-chart={chartId}
        className={cn("flex w-full flex-col", className)}
        style={style}
        {...props}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          initialDimension={{ width: 800, height: 320 }}
        >
          {children}
        </ResponsiveContainer>
      </div>
    );
  }
);
ChartContainer.displayName = "ChartContainer";

const ChartTooltip = Tooltip;

type ChartTooltipPayload = {
  value?: number | string;
  name?: string | number;
  dataKey?: string | number;
  color?: string;
};

type ChartTooltipContentProps = {
  active?: boolean;
  payload?: ChartTooltipPayload[];
  label?: React.ReactNode;
  indicator?: "dot" | "line";
  labelKey?: string;
  formatter?: (value: number, name: string) => React.ReactNode;
  className?: string;
};

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipContentProps
>(
  (
    {
      active,
      payload,
      label,
      indicator = "dot",
      labelKey,
      formatter,
      className,
    },
    ref
  ) => {
    if (!active || !payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md border border-slate-200 bg-white p-2 text-xs text-slate-700 shadow-sm",
          className
        )}
      >
        <div className="mb-1 font-medium text-slate-900">
          {labelKey ?? label}
        </div>
        <div className="space-y-1">
          {payload.map((entry) => {
            const value = Number(entry.value ?? 0);
            const name = entry.name ?? entry.dataKey ?? "";
            return (
              <div key={String(name)} className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-block size-2 rounded-full",
                    indicator === "line" && "h-0.5 w-3 rounded-none"
                  )}
                  style={{ backgroundColor: entry.color }}
                />
                <span className="flex-1 text-slate-600">{String(name)}</span>
                <span className="font-medium text-slate-900">
                  {formatter ? formatter(value, String(name)) : value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = Legend;

type ChartLegendPayload = {
  dataKey?: string | number;
  value?: string | number;
  color?: string;
};

type ChartLegendContentProps = {
  payload?: ChartLegendPayload[];
  config?: ChartConfig;
  className?: string;
};

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  ChartLegendContentProps
>(({ payload, config, className }, ref) => {
  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn("flex flex-wrap items-center gap-3 text-xs", className)}
    >
      {payload.map((entry) => {
        const key = String(entry.dataKey ?? entry.value ?? "");
        const label = config?.[key]?.label ?? entry.value ?? key;
        return (
          <div key={key} className="flex items-center gap-2 text-slate-600">
            <span
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};
