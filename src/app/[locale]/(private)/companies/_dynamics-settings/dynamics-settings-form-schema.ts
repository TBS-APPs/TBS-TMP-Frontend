import * as z from "zod";

export function createDynamicsSettingsFormSchema(t: (key: string) => string) {
  return z.object({
    baseUrl: z.string().min(1, t("fieldRequired")),
    tokenUrl: z.string().min(1, t("fieldRequired")),
    clientId: z.string().min(1, t("fieldRequired")),
    clientSecret: z.string().min(1, t("fieldRequired")),
    tenantId: z.string().min(1, t("fieldRequired")),
    resource: z.string().min(1, t("fieldRequired")),
  });
}

export type DynamicsSettingsFormValues = z.infer<
  ReturnType<typeof createDynamicsSettingsFormSchema>
>;
