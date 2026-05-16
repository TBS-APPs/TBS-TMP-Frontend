"use client";

import { useTranslations } from "next-intl";
import { createAddModuleFormSchema } from "./add-module-form-schema";
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
import { addModule } from "./actions";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";
import { routes } from "@/core/constants/routes";

type AddModuleFormValues = {
  name: string;
};

export function AddModuleForm() {
  const t = useTranslations();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: {
      onSubmit: createAddModuleFormSchema(t),
    },
    onSubmit: async ({ value }) => {
      const result = await addModule(value as AddModuleFormValues);
      if (result.success) {
        router.push(routes.modules.all);
        toast.success(result.message);
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
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{t("addModule")}</CardTitle>
        <CardDescription>{t("addModuleDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="add-module-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="name"
              label={t("moduleName")}
              placeholder={t("moduleName")}
              autoComplete="off"
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            {t("reset")}
          </Button>
          <Button type="submit" form="add-module-form">
            {t("submit")}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
