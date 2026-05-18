"use client";

import type { DeepKeys, DeepValue } from "@tanstack/form-core";
import type { ReactNode } from "react";
import {
  Field as UiField,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AnyReactFormApi } from "./tanstack-form-text-field";

export type SelectOption = {
  value: string;
  label: string;
};

export type TanStackFormSelectFieldProps<
  TFormData,
  TName extends DeepKeys<TFormData>,
> = {
  form: AnyReactFormApi<TFormData>;
  name: TName;
  label: ReactNode;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
};

export function TanStackFormSelectField<
  TFormData,
  TName extends DeepKeys<TFormData>,
>({
  form,
  name,
  label,
  options,
  placeholder,
  disabled,
}: TanStackFormSelectFieldProps<TFormData, TName>) {
  const { Field } = form;

  return (
    <Field name={name}>
      {(field) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        const value = String(field.state.value ?? "");
        return (
          <UiField data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Select
              value={value}
              onValueChange={(next) =>
                field.handleChange(next as DeepValue<TFormData, TName>)
              }
              disabled={disabled}
            >
              <SelectTrigger
                id={field.name}
                className="w-full"
                aria-invalid={isInvalid}
                onBlur={field.handleBlur}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </UiField>
        );
      }}
    </Field>
  );
}
