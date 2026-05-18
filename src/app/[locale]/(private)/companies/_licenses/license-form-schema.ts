import * as z from "zod";

export function createLicenseFormSchema(t: (key: string) => string) {
  return z.object({
    seatsLimit: z.string().min(1, t("fieldRequired")),
    startDate: z.string().min(1, t("fieldRequired")),
    expirationDate: z.string().min(1, t("fieldRequired")),
    moduleId: z.string().min(1, t("fieldRequired")),
  });
}

export type LicenseFormValues = z.infer<
  ReturnType<typeof createLicenseFormSchema>
>;
