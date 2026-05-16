import * as z from "zod";

export function createModuleFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(3, t("nameMinLength")),
  });
}

export type ModuleFormValues = z.infer<
  ReturnType<typeof createModuleFormSchema>
>;
