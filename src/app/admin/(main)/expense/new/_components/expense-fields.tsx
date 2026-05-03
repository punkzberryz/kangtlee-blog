"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import type * as React from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ExpenseInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

type ExpenseTextAreaFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface ExpenseRadioOption {
  label: string;
  value: string;
  description?: string;
}

type ExpenseRadioGroupFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  options: ExpenseRadioOption[];
  required?: boolean;
  className?: string;
};

export const ExpenseInputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  required,
  ...inputProps
}: ExpenseInputFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ExpenseInputGroup className="p-2">
              <ExpenseInputGroupInput
                {...field}
                {...inputProps}
                required={required}
              />
              <ExpenseInputGroupAddon align="block-start">
                <FormLabel>{label}</FormLabel>
              </ExpenseInputGroupAddon>
            </ExpenseInputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ExpenseTextAreaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  required,
  ...textareaProps
}: ExpenseTextAreaFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <ExpenseInputGroup className="p-2">
              <ExpenseInputGroupTextarea
                {...field}
                {...textareaProps}
                required={required}
                className={cn("min-h-[100px]", textareaProps.className)}
              />
              <ExpenseInputGroupAddon align="block-start">
                <FormLabel>{label}</FormLabel>
              </ExpenseInputGroupAddon>
            </ExpenseInputGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ExpenseRadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  options,
  required,
  className,
}: ExpenseRadioGroupFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="w-full max-w-md">
            <FieldGroup>
              <FieldSet>
                <div className="flex items-end space-x-2 pb-1">
                  <FieldLabel>
                    {label}
                    {required && (
                      <span className="pl-1 text-xs font-semibold text-destructive">
                        *
                      </span>
                    )}
                  </FieldLabel>
                </div>

                <ExpenseRadioGroup
                  required={required}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {options.map((option) => (
                    <label
                      key={option.value}
                      htmlFor={option.value}
                      className="flex w-full cursor-pointer rounded-md border border-input transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5 dark:has-[[data-state=checked]]:bg-primary/10"
                    >
                      <Field
                        orientation="horizontal"
                        className="min-h-[52px] p-4"
                      >
                        <FieldContent>
                          <FieldTitle>{option.label}</FieldTitle>
                          {option.description ? (
                            <FieldDescription>
                              {option.description}
                            </FieldDescription>
                          ) : null}
                        </FieldContent>
                        <ExpenseRadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                      </Field>
                    </label>
                  ))}
                </ExpenseRadioGroup>
              </FieldSet>
            </FieldGroup>
          </div>
        </FormItem>
      )}
    />
  );
};

const ExpenseInputGroup = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input relative flex h-9 min-w-0 w-full items-center rounded-md border shadow-sm outline-none transition-[color,box-shadow] dark:bg-input/30",
        "has-[>textarea]:h-auto",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
        "has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
};

const ExpenseInputGroupAddon = ({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & {
  align?: "inline-start" | "block-start";
}) => {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none",
        align === "block-start" &&
          "order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
        className,
      )}
      onClick={(event) => {
        event.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
};

const ExpenseInputGroupInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-9 min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 py-1 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
};

const ExpenseInputGroupTextarea = ({
  className,
  ...props
}: React.ComponentProps<"textarea">) => {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
};

const ExpenseRadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
};

const ExpenseRadioGroupItem = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive aspect-square size-4 shrink-0 rounded-full border shadow-sm outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};
