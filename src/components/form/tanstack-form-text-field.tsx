"use client";

import type { DeepKeys, DeepValue } from "@tanstack/form-core";
import type { ReactFormExtendedApi } from "@tanstack/react-form";
import type { ComponentProps, ReactNode } from "react";
import {
  Field as UiField,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

/**
 * Matches any `useForm()` return type so callers don’t fight validator generics.
 */
export type AnyReactFormApi<TFormData> = ReactFormExtendedApi<
  TFormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- widened to accept real form instances with validators
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;

export type TanStackFormTextFieldProps<
  TFormData,
  TName extends DeepKeys<TFormData>,
> = {
  form: AnyReactFormApi<TFormData>;
  name: TName;
  label: ReactNode;
  placeholder?: string;
} & Omit<
  ComponentProps<typeof Input>,
  | "form"
  | "id"
  | "name"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onBlur"
  | "aria-invalid"
>;

export function TanStackFormTextField<
  TFormData,
  TName extends DeepKeys<TFormData>,
>({
  form,
  name,
  label,
  placeholder,
  ...inputProps
}: TanStackFormTextFieldProps<TFormData, TName>) {
  const { Field } = form;

  return (
    <Field name={name}>
      {(field) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <UiField data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
              {...inputProps}
              id={field.name}
              name={field.name}
              value={field.state.value as DeepValue<TFormData, TName> & string}
              onBlur={field.handleBlur}
              onChange={(e) =>
                field.handleChange(
                  e.target.value as DeepValue<TFormData, TName>,
                )
              }
              aria-invalid={isInvalid}
              placeholder={placeholder}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </UiField>
        );
      }}
    </Field>
  );
}
