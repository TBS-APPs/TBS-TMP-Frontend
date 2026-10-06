"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "@tanstack/react-form";
import type { DeepKeys, DeepValue } from "@tanstack/form-core";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TanStackFormTextField } from "@/components/form";
import {
  addTranslationKey,
  updateTranslationKey,
} from "./translation-actions";
import {
  createTranslationFormSchema,
  stringifyMetadata,
  type TranslationFormValues,
} from "./translation-form-schema";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";
import { Spinner } from "@/components/ui/spinner";
import { TranslationRow } from "@/repositories/mobile-app-translations";
import type { AnyReactFormApi } from "@/components/form/tanstack-form-text-field";

type Props = {
  row?: TranslationRow;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function getDefaultValues(row?: TranslationRow): TranslationFormValues {
  return {
    key: row?.key ?? "",
    en: row?.en ?? "",
    ar: row?.ar ?? "",
    description: row?.description ?? "",
    metadataJson: stringifyMetadata(row?.metadata),
  };
}

function TanStackFormTextareaField<
  TFormData,
  TName extends DeepKeys<TFormData>,
>({
  form,
  name,
  label,
  placeholder,
  rows = 6,
  disabled,
  dir,
}: {
  form: AnyReactFormApi<TFormData>;
  name: TName;
  label: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  dir?: "ltr" | "rtl" | "auto";
}) {
  const { Field: FormField } = form;

  return (
    <FormField name={name}>
      {(field) => {
        const isInvalid =
          field.state.meta.isTouched && !field.state.meta.isValid;
        return (
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <textarea
              id={field.name}
              name={field.name}
              rows={rows}
              disabled={disabled}
              dir={dir}
              placeholder={placeholder}
              aria-invalid={isInvalid}
              className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
              value={
                (field.state.value as DeepValue<TFormData, TName> & string) ??
                ""
              }
              onBlur={field.handleBlur}
              onChange={(e) =>
                field.handleChange(
                  e.target.value as DeepValue<TFormData, TName>,
                )
              }
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        );
      }}
    </FormField>
  );
}

export function TranslationFormSheet({ row, open, onOpenChange }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const isEditing = row != null;

  const form = useForm({
    defaultValues: getDefaultValues(row),
    validators: {
      onSubmit: createTranslationFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      const result = isEditing
        ? await updateTranslationKey(
            String(row.keyId),
            value as TranslationFormValues,
          )
        : await addTranslationKey(value as TranslationFormValues);

      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    },
  });

  useEffect(() => {
    if (open) {
      const defaults = getDefaultValues(row);
      form.reset();
      Object.entries(defaults).forEach(([key, value]) => {
        form.setFieldValue(key as keyof TranslationFormValues, value);
      });
    }
  }, [open, row, form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? t("editTranslationKey") : t("addTranslationKey")}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? t("editTranslationKeyDescription")
              : t("addTranslationKeyDescription")}
          </SheetDescription>
        </SheetHeader>
        <form
          id="mobile-app-translation-form"
          className="px-4"
          onSubmit={handleSubmit}
        >
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="key"
              label={t("translationKey")}
              placeholder="aboutUs"
              autoComplete="off"
              disabled={isEditing}
              dir="ltr"
            />
            <TanStackFormTextareaField
              form={form}
              name="en"
              label={t("englishValue")}
              placeholder={t("englishValue")}
              rows={3}
              dir="ltr"
            />
            <TanStackFormTextareaField
              form={form}
              name="ar"
              label={t("arabicValue")}
              placeholder={t("arabicValue")}
              rows={3}
              dir="rtl"
            />
            <TanStackFormTextField
              form={form}
              name="description"
              label={t("translationKeyDescription")}
              autoComplete="off"
            />
            <TanStackFormTextareaField
              form={form}
              name="metadataJson"
              label={t("translationMetadata")}
              placeholder={t.raw("translationMetadataPlaceholder")}
              rows={8}
              dir="ltr"
            />
          </FieldGroup>
        </form>
        <SheetFooter>
          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Field orientation="horizontal">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  form="mobile-app-translation-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner />
                  ) : isEditing ? (
                    t("save")
                  ) : (
                    t("submit")
                  )}
                </Button>
              </Field>
            )}
          </form.Subscribe>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
