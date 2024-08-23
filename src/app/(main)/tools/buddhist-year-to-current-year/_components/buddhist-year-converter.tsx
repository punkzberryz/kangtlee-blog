"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
const year = z.string().min(1, { message: "โปรดระบุปี" }).regex(/^\d+$/);
const yearSchema = z.object({
  bYear: year,
  cYear: year,
});
type YearSchema = z.infer<typeof yearSchema>;
export const BuddhistYearToCurrentYearConverter = () => {
  const form = useForm<YearSchema>({
    resolver: zodResolver(yearSchema),
    defaultValues: {
      bYear: (new Date().getFullYear() + 543).toString(),
      cYear: (new Date().getFullYear() + 0).toString(),
    },
  });
  return (
    <Form {...form}>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="bYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ปี พ.ศ.</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    form.clearErrors(["cYear", "bYear"]);
                    const value = e.target.value;
                    field.onChange(value);
                    const parse = year.safeParse(value);
                    if (!parse.success) {
                      form.setError("bYear", {
                        message: "โปรดระบุ พ.ศ. ปีเป็นตัวเลข",
                      });
                      return;
                    }
                    form.setValue("cYear", (parseInt(value) - 543).toString());
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ปี ค.ศ.</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  onChange={(e) => {
                    form.clearErrors(["cYear", "bYear"]);
                    const value = e.target.value;
                    field.onChange(value);
                    const parse = year.safeParse(value);
                    if (!parse.success) {
                      form.setError("cYear", {
                        message: "โปรดระบุ ค.ศ. ปีเป็นตัวเลข",
                      });
                      return;
                    }
                    form.setValue("bYear", (parseInt(value) + 543).toString());
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
