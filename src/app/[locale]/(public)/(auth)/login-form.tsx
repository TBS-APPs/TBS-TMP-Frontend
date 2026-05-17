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
import { loginAction } from "./actions";
import { createLoginFormSchema, type LoginFormValues } from "./login-schema";
import { getLocale } from "next-intl/server";

export function LoginForm() {
  const locale = useLocale();
  const t = useTranslations();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies LoginFormValues,
    validators: {
      onSubmit: createLoginFormSchema(t),
    },

    onSubmit: async ({ value }) => {
      const result = await loginAction(value as LoginFormValues);
      if (result.success) {
        redirect({ href: routes.home, locale: locale }, "replace");
        toast.success(result.message ?? t("loginSucceeded"));
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
        <CardTitle>{t("loginTitle")}</CardTitle>
        <CardDescription>{t("loginDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              type="email"
              autoComplete="username"
              inputMode="email"
            />
            <TanStackFormTextField
              form={form}
              name="password"
              label={t("password")}
              placeholder={t("passwordPlaceholder")}
              type="password"
              autoComplete="current-password"
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
              <Button type="submit" form="login-form" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : t("loginSubmit")}
              </Button>
            </Field>
          )}
        </form.Subscribe>
        <p className="text-muted-foreground text-center text-sm">
          {t("noAccount")}{" "}
          <Link
            href={routes.auth.register}
            className="font-medium underline-offset-4 hover:underline"
          >
            {t("createAccount")}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
