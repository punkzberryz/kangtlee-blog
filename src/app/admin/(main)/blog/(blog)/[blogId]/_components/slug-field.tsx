"use client";

import { UseFormReturn } from "react-hook-form";
import { PostSchema } from "../../_components/post-schema";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SlugFieldProps {
  form: UseFormReturn<PostSchema>;
}
export const SlugField = ({ form }: SlugFieldProps) => {
  const title = form.watch("title");

  return (
    <FormField
      control={form.control}
      name="slug"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Link บทความ</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
