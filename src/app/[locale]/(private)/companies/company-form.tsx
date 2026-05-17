"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createCompanyFormSchema, type CompanyFormValues } from "./company-form-schema";
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
import { addCompany, updateCompany } from "./actions";
import { toast } from "sonner";
import { useRouter } from "@/core/i18n/navigation";
import { routes } from "@/core/constants/routes";
import { Spinner } from "@/components/ui/spinner";
import { Company } from "@/repositories/company";
import { TrashIcon } from "lucide-react";
import { DeleteCompanyDialog } from "./all/components/delete-alert";

type Props = {
  company?: Company;
};

export function CompanyForm({ company }: Props) {
  const t = useTranslations();
  const router = useRouter();
  const isEditing = company != null && company !== undefined;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: company?.name ?? "",
      alias: company?.alias ?? "",
    },
    validators: {
      onSubmit: createCompanyFormSchema(t),
    },

    onSubmit: async ({ value }) => {
      const result = isEditing
        ? await updateCompany(company?.id?.toString() ?? "", value as CompanyFormValues)
        : await addCompany(value as CompanyFormValues);
      if (result.success) {
        router.push(routes.companies.all);
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
          <CardTitle>
            {isEditing ? t("editCompany") : t("addCompany")}
          </CardTitle>
          <CardDescription>
            {isEditing
              ? t("editCompanyDescription")
              : t("addCompanyDescription")}
          </CardDescription>
        </div>
        {isEditing && company?.id != null && (
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
            <DeleteCompanyDialog
              id={String(company.id)}
              open={deleteOpen}
              onOpenChange={setDeleteOpen}
              onDeleted={() => {
                router.push(routes.companies.all);
                toast.success(t("companyDeletedSuccessfully"));
              }}
            />
          </>
        )}
      </CardHeader>
      <CardContent>
        <form id="company-form" onSubmit={handleSubmit}>
          <FieldGroup>
            <TanStackFormTextField
              form={form}
              name="name"
              label={t("companyName")}
              placeholder={t("companyName")}
              autoComplete="organization"
            />
            <TanStackFormTextField
              form={form}
              name="alias"
              label={t("companyAlias")}
              placeholder={t("companyAlias")}
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
                form="company-form"
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
      </CardFooter>
    </Card>
  );
}
