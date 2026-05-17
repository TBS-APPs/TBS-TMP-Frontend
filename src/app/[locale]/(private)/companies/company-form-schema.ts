import * as z from "zod";

export function createCompanyFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(3, t("companyNameMinLength")),
    alias: z.string().min(2, t("companyAliasMinLength")),
  });
}

export type CompanyFormValues = z.infer<
  ReturnType<typeof createCompanyFormSchema>
>;
