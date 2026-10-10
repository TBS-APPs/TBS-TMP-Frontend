"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  createModuleFormSchema,
  type ModuleFormValues,
} from "./module-form-schema";
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
import { addModule, updateModule } from "./actions";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";
import { routes } from "@/core/constants/routes";
import { Spinner } from "@/components/ui/spinner";
import { Module } from "@/repositories/module";
import { TrashIcon } from "lucide-react";
import { DeleteModuleDialog } from "./all/components/delete-alert";
import { translationsToNameFields } from "@/core/utils/entity-translation";

type Props = {
  module?: Module;
};

export function ModuleForm({ module }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const idEditing = module != null && module != undefined;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const nameFields = translationsToNameFields(module?.translations);
  const form = useForm({
    defaultValues: {
      nameEn: nameFields.nameEn,
      nameAr: nameFields.nameAr,
    },
    validators: {
      onSubmit: createModuleFormSchema(t),
    },

    onSubmit: async ({ value }) => {
      const result = idEditing
        ? await updateModule(
            module?.id?.toString() ?? "",
            value as ModuleFormValues,
          )
        : await addModule(value as ModuleFormValues);
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
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>{idEditing ? t("editModule") : t("addModule")}</CardTitle>
          <CardDescription>
            {idEditing ? t("editModuleDescription") : t("addModuleDescription")}
          </CardDescription>
        </div>
        {idEditing && module?.id != null && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
              aria-label={t("delete")}
              onClick={() => setDeleteOpen(true)}
            >
              <TrashIcon className="size-4" />
            </Button>
            <DeleteModuleDialog
              id={String(module.id)}
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
              onDeleted={() => {
                router.push(routes.modules.all);
                toast.success(t("moduleDeletedSuccessfully"));
              }}
            />
          </>
        )}
      </CardHeader>
      <CardContent>
        <form id="add-module-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="nameEn"
              label={t("nameEn")}
              placeholder={t("nameEn")}
              autoComplete="off"
            />
            <TanStackFormTextField
              form={form}
              name="nameAr"
              label={t("nameAr")}
              placeholder={t("nameAr")}
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
                form="add-module-form"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner /> : idEditing ? t("save") : t("submit")}
              </Button>
            </Field>
          )}
        </form.Subscribe>
      </CardFooter>
    </Card>
  );
}
