"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type YearSelectorProps = {
  years: string[];
  selectedYear: string;
};

export const YearSelector = ({ years, selectedYear }: YearSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (years.length === 0) {
    return null;
  }

  return (
    <Select
      value={selectedYear}
      disabled={isPending}
      onValueChange={(year) => {
        const params = new URLSearchParams(searchParams);
        params.set("year", year);

        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      }}
    >
      <SelectTrigger className="h-10 w-[130px] border-slate-200 bg-white text-slate-950">
        <SelectValue placeholder="Year" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
