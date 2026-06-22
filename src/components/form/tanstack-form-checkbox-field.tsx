"use client";

import type { DeepKeys, DeepValue } from "@tanstack/form-core";
import type { ReactNode } from "react";
import {
  Field as UiField,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import type { AnyReactFormApi } from "./tanstack-form-text-field";

export type TanStackFormCheckboxFieldProps<
  TFormData,
  TName extends DeepKeys<TFormData>,
> = {
  form: AnyReactFormApi<TFormData>;
  name: TName;
  label: ReactNode;
  description?: ReactNode;
};

export function TanStackFormCheckboxField<
  TFormData,
  TName extends DeepKeys<TFormData>,
>({
  form,
  name,
  label,
  description,
}: TanStackFormCheckboxFieldProps<TFormData, TName>) {
  const { Field } = form;

  return (
    <Field name={name}>
      {(field) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        const checked = Boolean(field.state.value);

        return (
          <UiField data-invalid={isInvalid} orientation="horizontal">
            <Checkbox
              id={field.name}
              checked={checked}
              onCheckedChange={(value) =>
                field.handleChange(Boolean(value) as DeepValue<TFormData, TName>)
              }
              onBlur={field.handleBlur}
              aria-invalid={isInvalid}
            />
            <div className="grid gap-1.5 leading-none">
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
              {description ? (
                <p className="text-muted-foreground text-sm">{description}</p>
              ) : null}
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </div>
          </UiField>
        );
      }}
    </Field>
  );
}
