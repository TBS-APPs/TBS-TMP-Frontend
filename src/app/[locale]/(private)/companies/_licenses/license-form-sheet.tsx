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
  TanStackFormSelectField,
  TanStackFormTextField,
  type SelectOption,
} from "@/components/form";
import { addLicense, updateLicense } from "./license-actions";
import { createLicenseFormSchema, type LicenseFormValues } from "./license-form-schema";
import { toDatetimeLocal } from "./license-datetime";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";
import { Spinner } from "@/components/ui/spinner";
import { License } from "@/repositories/license/types";

type Props = {
  companyId: string;
  moduleOptions: SelectOption[];
  license?: License;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function LicenseFormSheet({
  companyId,
  moduleOptions,
  license,
  open,
  onOpenChange,
}: Props) {
  const t = useTranslations();
  const router = useRouter();
  const isEditing = license != null;

  const form = useForm({
    defaultValues: {
      seatsLimit: license?.seatsLimit?.toString() ?? "",
      startDate: toDatetimeLocal(license?.startDate),
      expirationDate: toDatetimeLocal(license?.expirationDate),
      moduleId: license?.module?.id?.toString() ?? "",
    },
    validators: {
      onSubmit: createLicenseFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      const result = isEditing
        ? await updateLicense(
            companyId,
            String(license.id),
            value as LicenseFormValues,
          )
        : await addLicense(companyId, value as LicenseFormValues);

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
      form.reset();
      form.setFieldValue("seatsLimit", license?.seatsLimit?.toString() ?? "");
      form.setFieldValue("startDate", toDatetimeLocal(license?.startDate));
      form.setFieldValue(
        "expirationDate",
        toDatetimeLocal(license?.expirationDate),
      );
      form.setFieldValue("moduleId", license?.module?.id?.toString() ?? "");
    }
  }, [open, license, form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? t("editLicense") : t("addLicense")}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? t("editLicenseDescription")
              : t("addLicenseDescription")}
          </SheetDescription>
        </SheetHeader>
        <form id="license-form" className="px-4" onSubmit={handleSubmit}>
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="seatsLimit"
              label={t("licenseSeatsLimit")}
              placeholder={t("licenseSeatsLimit")}
              type="number"
              min={1}
            />
            <TanStackFormTextField
              form={form}
              name="startDate"
              label={t("licenseStartDate")}
              type="datetime-local"
            />
            <TanStackFormTextField
              form={form}
              name="expirationDate"
              label={t("licenseExpirationDate")}
              type="datetime-local"
            />
            <TanStackFormSelectField
              form={form}
              name="moduleId"
              label={t("moduleName")}
              placeholder={t("selectModule")}
              options={moduleOptions}
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
                <Button type="submit" form="license-form" disabled={isSubmitting}>
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
