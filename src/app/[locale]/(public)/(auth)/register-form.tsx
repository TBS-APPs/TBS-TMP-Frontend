"use client";

import { useForm } from "@tanstack/react-form";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import { TanStackFormTextField } from "@/components/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { routes } from "@/core/constants/routes";
import { Link, redirect } from "@/core/i18n/navigation";
import { registerAction } from "./actions";
import {
  createRegisterFormSchema,
  type RegisterFormValues,
} from "./register-schema";

export function RegisterForm() {
  const locale = useLocale();
  const t = useTranslations();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } satisfies RegisterFormValues,
    validators: {
      onSubmit: createRegisterFormSchema(t),
    },

    onSubmit: async ({ value }) => {
      const result = await registerAction(value as RegisterFormValues);
      if (result.success) {
        redirect({ href: routes.home, locale: locale }, "replace");
        toast.success(result.message ?? t("registerSucceeded"));
      } else {
        toast.error(result.message ?? t("somethingWrongTryAgain"));
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="flex flex-col gap-1.5">
        <CardTitle>{t("registerTitle")}</CardTitle>
        <CardDescription>{t("registerDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="name"
              label={t("name")}
              placeholder={t("registerFullNamePlaceholder")}
              type="text"
              autoComplete="name"
            />
            <TanStackFormTextField
              form={form}
              name="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              type="email"
              autoComplete="email"
              inputMode="email"
            />
            <TanStackFormTextField
              form={form}
              name="password"
              label={t("password")}
              placeholder={t("passwordPlaceholder")}
              type="password"
              autoComplete="new-password"
            />
            <TanStackFormTextField
              form={form}
              name="confirmPassword"
              label={t("confirmPassword")}
              placeholder={t("confirmPasswordPlaceholder")}
              type="password"
              autoComplete="new-password"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
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
                form="register-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : t("registerSubmit")}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <p className="text-muted-foreground text-center text-sm">
          {t("haveAccount")}{" "}
          <Link
            href={routes.auth.login}
            className="font-medium underline-offset-4 hover:underline"
          >
            {t("signIn")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
