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
  TanStackFormSelectField,
  TanStackFormTextField,
  type SelectOption,
} from "@/components/form";
import {
  addMobileAppSetting,
  updateMobileAppSetting,
} from "./mobile-app-settings-actions";
import {
  createMobileAppSettingsFormSchema,
  type MobileAppSettingsFormValues,
} from "./mobile-app-settings-form-schema";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";
import { Spinner } from "@/components/ui/spinner";
import {
  MobileAppPlatform,
  MobileAppSetting,
} from "@/repositories/mobile-app-settings";

type Props = {
  setting?: MobileAppSetting;
  defaultPlatform?: MobileAppPlatform;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function getDefaultValues(
  setting?: MobileAppSetting,
  defaultPlatform?: MobileAppPlatform,
): MobileAppSettingsFormValues {
  return {
    platform: setting?.platform ?? defaultPlatform ?? "ios",
    minimumVersion: setting?.minimumVersion ?? "",
    recommendedVersion: setting?.recommendedVersion ?? "",
    latestVersion: setting?.latestVersion ?? "",
    minimumBuildNumber: setting?.minimumBuildNumber?.toString() ?? "",
    recommendedBuildNumber: setting?.recommendedBuildNumber?.toString() ?? "",
    storeUrl: setting?.storeUrl ?? "",
    updateMessage: setting?.updateMessage ?? "",
    isMaintenanceModeEnabled: setting?.isMaintenanceModeEnabled ?? false,
    maintenanceMessage: setting?.maintenanceMessage ?? "",
  };
}

export function MobileAppSettingsFormSheet({
  setting,
  defaultPlatform,
  open,
  onOpenChange,
}: Props) {
  const t = useTranslations();
  const router = useRouter();
  const isEditing = setting != null;
  const platformLocked = isEditing || defaultPlatform != null;

  const platformOptions: SelectOption[] = [
    { value: "ios", label: t("platformIos") },
    { value: "android", label: t("platformAndroid") },
  ];

  const form = useForm({
    defaultValues: getDefaultValues(setting, defaultPlatform),
    validators: {
      onSubmit: createMobileAppSettingsFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      const result = isEditing
        ? await updateMobileAppSetting(
            String(setting.id),
            value as MobileAppSettingsFormValues,
          )
        : await addMobileAppSetting(value as MobileAppSettingsFormValues);

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
      const defaults = getDefaultValues(setting, defaultPlatform);
      form.reset();
      Object.entries(defaults).forEach(([key, value]) => {
        form.setFieldValue(
          key as keyof MobileAppSettingsFormValues,
          value,
        );
      });
    }
  }, [open, setting, defaultPlatform, form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {isEditing
              ? t("editMobileAppSetting")
              : t("configureMobileAppSetting")}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? t("editMobileAppSettingDescription")
              : t("configureMobileAppSettingDescription")}
          </SheetDescription>
        </SheetHeader>
        <form
          id="mobile-app-settings-form"
          className="px-4"
          onSubmit={handleSubmit}
        >
          <FieldGroup>
            <TanStackFormSelectField
              form={form}
              name="platform"
              label={t("platform")}
              placeholder={t("selectPlatform")}
              options={platformOptions}
              disabled={platformLocked}
            />
            <TanStackFormTextField
              form={form}
              name="minimumVersion"
              label={t("minimumVersion")}
              placeholder="1.0.0"
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="recommendedVersion"
              label={t("recommendedVersion")}
              placeholder="1.1.0"
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="latestVersion"
              label={t("latestVersion")}
              placeholder="1.2.0"
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="minimumBuildNumber"
              label={t("minimumBuildNumber")}
              placeholder="40"
              type="number"
              min={1}
            />
            <TanStackFormTextField
              form={form}
              name="recommendedBuildNumber"
              label={t("recommendedBuildNumber")}
              placeholder="45"
              type="number"
              min={1}
            />
            <TanStackFormTextField
              form={form}
              name="storeUrl"
              label={t("storeUrl")}
              placeholder="https://apps.apple.com/app/example"
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="updateMessage"
              label={t("updateMessage")}
              placeholder={t("updateMessagePlaceholder")}
              autoComplete="off"
            />
            <TanStackFormCheckboxField
              form={form}
              name="isMaintenanceModeEnabled"
              label={t("maintenanceModeEnabled")}
            />
            <TanStackFormTextField
              form={form}
              name="maintenanceMessage"
              label={t("maintenanceMessage")}
              placeholder={t("maintenanceMessagePlaceholder")}
              autoComplete="off"
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
                  form="mobile-app-settings-form"
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
