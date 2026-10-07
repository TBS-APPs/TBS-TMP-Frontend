"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "@tanstack/react-form";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  TanStackFormCheckboxField,
  TanStackFormTextField,
} from "@/components/form";
import {
  addThemePalette,
  updateThemePalette,
} from "./mobile-app-themes-actions";
import {
  createMobileAppThemesFormSchema,
  type MobileAppThemesFormValues,
} from "./mobile-app-themes-form-schema";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";
import { Spinner } from "@/components/ui/spinner";
import { MobileAppThemePalette } from "@/repositories/mobile-app-themes";

type Props = {
  palette?: MobileAppThemePalette;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function getDefaultValues(
  palette?: MobileAppThemePalette,
): MobileAppThemesFormValues {
  return {
    code: palette?.code ?? "",
    name: palette?.name ?? "",
    isDefault: palette?.isDefault ?? false,
    isActive: palette?.isActive ?? true,
    sortOrder: palette?.sortOrder?.toString() ?? "0",
    primary: palette?.primary ?? "",
    secondary: palette?.secondary ?? "",
    tertiary: palette?.tertiary ?? "",
  };
}

function ColorPreview({ value }: { value: string }) {
  const isValid = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value);
  return (
    <span
      aria-hidden
      className="mb-0.5 inline-block size-6 shrink-0 self-end rounded border border-border"
      style={{ backgroundColor: isValid ? value : "transparent" }}
    />
  );
}

export function MobileAppThemesFormSheet({
  palette,
  open,
  onOpenChange,
}: Props) {
  const t = useTranslations();
  const router = useRouter();
  const isEditing = palette != null;

  const form = useForm({
    defaultValues: getDefaultValues(palette),
    validators: {
      onSubmit: createMobileAppThemesFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      const result = isEditing
        ? await updateThemePalette(
            String(palette.id),
            value as MobileAppThemesFormValues,
          )
        : await addThemePalette(value as MobileAppThemesFormValues);

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
      const defaults = getDefaultValues(palette);
      form.reset();
      Object.entries(defaults).forEach(([key, value]) => {
        form.setFieldValue(key as keyof MobileAppThemesFormValues, value);
      });
    }
  }, [open, palette, form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? t("editThemePalette") : t("addThemePalette")}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? t("editThemePaletteDescription")
              : t("addThemePaletteDescription")}
          </SheetDescription>
        </SheetHeader>
        <form
          id="mobile-app-themes-form"
          className="px-4"
          onSubmit={handleSubmit}
        >
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="code"
              label={t("themeCode")}
              placeholder={t("themeCodePlaceholder")}
              autoComplete="off"
              disabled={isEditing}
            />
            <TanStackFormTextField
              form={form}
              name="name"
              label={t("themeName")}
              placeholder={t("themeNamePlaceholder")}
              autoComplete="off"
            />
            <TanStackFormCheckboxField
              form={form}
              name="isDefault"
              label={t("themeIsDefault")}
            />
            <TanStackFormCheckboxField
              form={form}
              name="isActive"
              label={t("themeIsActive")}
            />
            <TanStackFormTextField
              form={form}
              name="sortOrder"
              label={t("themeSortOrder")}
              placeholder="0"
              type="number"
              min={0}
            />
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <TanStackFormTextField
                  form={form}
                  name="primary"
                  label={t("themePrimary")}
                  placeholder="#556B2F"
                  autoComplete="off"
                />
              </div>
              <form.Subscribe selector={(state) => state.values.primary}>
                {(primary) => <ColorPreview value={primary} />}
              </form.Subscribe>
            </div>
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <TanStackFormTextField
                  form={form}
                  name="secondary"
                  label={t("themeSecondary")}
                  placeholder="#eba20e"
                  autoComplete="off"
                />
              </div>
              <form.Subscribe selector={(state) => state.values.secondary}>
                {(secondary) => <ColorPreview value={secondary} />}
              </form.Subscribe>
            </div>
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <TanStackFormTextField
                  form={form}
                  name="tertiary"
                  label={t("themeTertiary")}
                  placeholder="#7BC3FA"
                  autoComplete="off"
                />
              </div>
              <form.Subscribe selector={(state) => state.values.tertiary}>
                {(tertiary) => <ColorPreview value={tertiary} />}
              </form.Subscribe>
            </div>
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
                  form="mobile-app-themes-form"
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
