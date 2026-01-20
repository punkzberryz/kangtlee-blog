"use client";

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
import { FormField, FormItem } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldTip } from "./field-tip";

interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

export const CustomRadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  options,
  fieldTipChildren,
  required,
  className,
}: {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  options: RadioOption[];
  required?: boolean;
  fieldTipChildren?: React.ReactNode;
  className?: string;
}) => {
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
                  {fieldTipChildren && <FieldTip>{fieldTipChildren}</FieldTip>}
                </div>

                <RadioGroup
                  required={required}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {options.map((option) => (
                    <FieldLabel key={option.value} htmlFor={option.value}>
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>{option.label}</FieldTitle>
                          {option.description ? (
                            <FieldDescription>
                              {option.description}
                            </FieldDescription>
                          ) : null}
                        </FieldContent>
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </FieldSet>
            </FieldGroup>
          </div>
        </FormItem>
      )}
    />
  );
};
