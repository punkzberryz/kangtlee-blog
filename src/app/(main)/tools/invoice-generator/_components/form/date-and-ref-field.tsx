"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { InvoiceFormSchema } from "./invoice-schema";
import { formatDateToThaiDate } from "@/lib/format/format-date";
import { CalendarUi } from "@/components/calendar-ui";

export const DateAndRefField = ({
  form,
}: {
  form: UseFormReturn<InvoiceFormSchema>;
}) => {
  return (
    <div className="relative flex h-fit flex-col -space-y-3 rounded-md bg-blue-50">
      <FormField
        control={form.control}
        name="refId"
        render={({ field }) => (
          <FormItem className="relative space-y-0">
            <FormLabel className="absolute left-2.5 top-1.5 text-lg font-normal">
              เลขที่
            </FormLabel>
            <FormControl>
              <Input
                placeholder="INV-2024-0101"
                {...field}
                variant="naked"
                className="pl-16 text-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem className="group/date relative space-y-0">
            <FormLabel className="absolute left-2.5 top-1.5 text-lg font-normal">
              วันที่
            </FormLabel>
            <FormControl>
              <Input
                placeholder="2024-01-01"
                {...field}
                variant="naked"
                className="pl-16 text-lg"
              />
            </FormControl>
            <div className="absolute right-0 top-1.5 opacity-0 transition group-hover/date:opacity-100">
              <CalendarPopover
                onSelect={(d) => form.setValue("date", formatDateToThaiDate(d))}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="quoteId"
        render={({ field }) => (
          <FormItem className="relative space-y-0">
            <FormLabel className="absolute left-2.5 top-1.5 text-lg font-normal">
              อ้างอิง
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Q-2024-0101"
                {...field}
                variant="naked"
                className="pl-16 text-lg"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

const CalendarPopover = ({ onSelect }: { onSelect: (date: Date) => void }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" className="h-fit w-fit p-1">
          <CalendarIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarUi
          date={date}
          setDate={(d) => {
            setDate(d);
            if (d) onSelect(d);
            setIsOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
