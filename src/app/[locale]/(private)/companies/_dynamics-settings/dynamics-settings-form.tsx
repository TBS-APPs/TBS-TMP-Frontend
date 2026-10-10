"use client";

import { useTranslations } from "next-intl";
import {
  createDynamicsSettingsFormSchema,
} from "./dynamics-settings-form-schema";
import { useForm } from "@tanstack/react-form";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TanStackFormTextField } from "@/components/form";
import { upsertDynamicsSettings } from "./dynamics-settings-actions";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";
import { Spinner } from "@/components/ui/spinner";
import { DynamicsSettings } from "@/repositories/dynamics-settings/types";
import type { DynamicsSettingsFormValues } from "./dynamics-settings-form-schema";

type Props = {
  companyId: string;
  dynamicsSettings?: DynamicsSettings;
};

export function DynamicsSettingsForm({
  companyId,
  dynamicsSettings,
}: Props) {
  const t = useTranslations();
  const router = useRouter();
  const hasExisting = dynamicsSettings?.id != null;

  const form = useForm({
    defaultValues: {
      baseUrl: dynamicsSettings?.baseUrl ?? "",
      tokenUrl: dynamicsSettings?.tokenUrl ?? "",
      clientId: dynamicsSettings?.clientId ?? "",
      clientSecret: dynamicsSettings?.clientSecret ?? "",
      tenantId: dynamicsSettings?.tenantId ?? "",
      resource: dynamicsSettings?.resource ?? "",
    },
    validators: {
      onSubmit: createDynamicsSettingsFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      const result = await upsertDynamicsSettings(
        companyId,
        value as DynamicsSettingsFormValues,
      );
      if (result.success) {
        toast.success(result.message);
        // router.refresh();
      } else {
        toast.error(result.message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>
          {hasExisting ? t("editDynamicsSettings") : t("addDynamicsSettings")}
        </CardTitle>
        <CardDescription>
          {hasExisting
            ? t("editDynamicsSettingsDescription")
            : t("addDynamicsSettingsDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="dynamics-settings-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="baseUrl"
              label={t("dynamicsBaseUrl")}
              placeholder={t("dynamicsBaseUrl")}
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="tokenUrl"
              label={t("dynamicsTokenUrl")}
              placeholder={t("dynamicsTokenUrl")}
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="clientId"
              label={t("dynamicsClientId")}
              placeholder={t("dynamicsClientId")}
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="clientSecret"
              label={t("dynamicsClientSecret")}
              placeholder={t("dynamicsClientSecret")}
              type="password"
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="tenantId"
              label={t("dynamicsTenantId")}
              placeholder={t("dynamicsTenantId")}
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="resource"
              label={t("dynamicsResource")}
              placeholder={t("dynamicsResource")}
              autoComplete="off"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={isSubmitting}
              >
                {t("reset")}
              </Button>
              <Button
                type="submit"
                form="dynamics-settings-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner />
                ) : hasExisting ? (
                  t("save")
                ) : (
                  t("submit")
                )}
              </Button>
            </Field>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  );
}
